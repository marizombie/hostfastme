import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { findCheckoutSession } from "@/libs/stripe";
import connectMongo from "@/libs/mongoose";
import configFile from "@/config";
import User from "@/models/User";
import { sendEmail } from "../../utils/sendEmail";
import { addCollaborator } from "../../utils/addCollaborator";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",  // TODO: update this when Stripe updates their API
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// This is where we receive Stripe webhook events
// It used to update the user data, send emails, etc...
// By default, it'll store the user in the database
// See more: https://shipfa.st/docs/features/payments
export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.text();

  const signature = headers().get("stripe-signature");

  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) break;
        
        const gitUsername = session?.custom_fields[0]?.text.value;
        console.log(gitUsername);

        const isExtended = priceId === 
        (
          process.env.NODE_ENV === "development" 
          ? process.env.EXT_DEV_PRICE_ID
          : process.env.EXT_PROD_PRICE_ID
        )
        
        const repoLink = isExtended 
        ? process.env.EXTENDED_PRODUCT_LINK 
        : process.env.PRODUCT_LINK;

        const customer = (await stripe.customers.retrieve(
          customerId as string
        )) as Stripe.Customer;

        let user;

        // Get or create the user. userId is normally pass in the checkout session (clientReferenceID) to identify the user when we get the webhook event
        if (userId) {
          user = await User.findById(userId);
        } else if (customer.email) {
          user = await User.findOne({ email: customer.email });

          if (!user) {
            user = await User.create({
              email: customer.email,
              name: customer.name,
            });

            await user.save();
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        user.priceId = priceId;
        user.customerId = customerId;
        user.hasAccess = true;
        await user.save();
        
        const customerEmail = session.customer_details?.email;
        
        await addCollaborator(gitUsername, repoLink);

        const subject = "Welcome to HostFast.me: your guide to effortless cloud hosting setup awaits! 🚀";
        const html_body = getWelcomeEmailHtml(process.env.PRODUCT_LINK);
        await sendEmail(customerEmail, subject, html_body);
        
        // Extra: send email with user link, product page, etc...
        // try {
        //   await sendEmail(...);
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
        break;
      }

      case "customer.subscription.updated": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance
        break;
      }

      case "customer.subscription.deleted": {
        // The customer subscription stopped
        // ❌ Revoke access to the product
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );
        const user = await User.findOne({ customerId: subscription.customer });

        // Revoke access to your product
        user.hasAccess = false;
        await user.save();

        break;
      }

      case "invoice.paid": {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product

        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;

        const priceId = stripeObject.lines.data[0].price.id;
        const customerId = stripeObject.customer;

        const user = await User.findOne({ customerId });

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        if (user.priceId !== priceId) break;

        // Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        user.hasAccess = true;
        await user.save();

        break;
      }

      case "invoice.payment_failed":
        // A payment failed (for instance the customer does not have a valid payment method)
        // ❌ Revoke access to the product
        // ⏳ OR wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

        break;

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: ", e.message);
  }

  return NextResponse.json({});
}

function getWelcomeEmailHtml(guideLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Welcome to HostFast.me!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .header h1 {
            color: #0073e6;
          }
          .content {
            padding: 20px 0;
          }
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #0073e6;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
          }
          .cta-button:hover {
            background-color: #005bb5;
          }
          .footer {
            padding-top: 20px;
            font-size: 12px;
            color: #888888;
            text-align: center;
            border-top: 1px solid #e0e0e0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to HostFast.me!</h1>
            <p>Your cloud hosting setup just got a whole lot easier.</p>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>
              Thank you for purchasing our <strong>Cloud Hosting Setup Guide</strong>! Thrilled to have you on this journey to make cloud hosting setup a breeze.
            </p>
            <p>
              This guide will take you step-by-step through setting up hosting on popular cloud platforms, offering tips, shortcuts, and best practices tailored just for you. Our goal? To get you up and running quickly and smoothly, without any of the headaches while saving you money.
            </p>
            <p>Ready to dive in? Click below to access your guide and start your setup:</p>
            <a href="${guideLink}" class="cta-button">Access your guide</a>
            <p>
              If you have any questions or feedback, don't hesitate to reach out at 
              <a href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a>.
            </p>
            <p>Happy hosting!</p>
            <p>Best regards,<br />The HostFast.me Owner</p>
          </div>
          <div class="footer">
            <p>
              You received this email because you recently purchased a product from HostFast.me.
              <br />
              HostFast.me, helping developers to host websites efficiently
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
