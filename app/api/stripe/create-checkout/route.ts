import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { createCheckout } from "@/libs/stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { emitMessage } from "@/libs/socketServer";

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card

async function tryCheckout({
  priceId,
  mode,
  successUrl,
  cancelUrl,
  clientReferenceId,
  user,
  couponId,
}: {
  priceId: string;
  mode: "payment" | "subscription";
  successUrl: string;
  cancelUrl: string;
  clientReferenceId?: string;
  user?: any;
  couponId?: string;
}) {
  
  const fallbackCouponId = process.env.NODE_ENV === "development"
  ? process.env.FALLBACK_PROMO_DEV
  : process.env.FALLBACK_PROMO_PROD;

  let appliedCouponId = couponId ? couponId : fallbackCouponId;

  try {
    // Try with the provided coupon
    const sessionUrl = await createCheckout({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      clientReferenceId,
      user,
      couponId: appliedCouponId,
    });
    return { url: sessionUrl, couponId: appliedCouponId };
  } catch (e) {
    console.warn(`Failed to apply coupon: ${appliedCouponId}, error: ${e.message}`);

    // Retry with fallback coupon if available
    if (fallbackCouponId && appliedCouponId !== fallbackCouponId) {
      console.log('retrying with fallback coupon');
      return tryCheckout({
        priceId,
        mode,
        successUrl,
        cancelUrl,
        clientReferenceId,
        user,
        couponId: fallbackCouponId,
      });
    }

    // If all coupons fail, create session without coupons
    const sessionUrl = await createCheckout({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      clientReferenceId,
      user,
    });
    return { url: sessionUrl, couponId: null };
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  } else if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json(
      { error: "Success and cancel URLs are required" },
      { status: 400 }
    );
  } else if (!body.mode) {
    return NextResponse.json(
      {
        error:
          "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
      },
      { status: 400 }
    );
  }

  // emitNotification({
  //   status: "success",
  //   message: "Email sent successfully",
  // });

  // emitNotification({
  //   status: "error",
  //   message: "Boo",
  // });

  // emitNotification({
  //   status: "success",
  //   message: "blabla",
  // });  

  try {
    emitMessage("looking for session");
    const session = await getServerSession(authOptions);

    await connectMongo();

    const user = await User.findById(session?.user?.id);

    const { priceId, mode, successUrl, cancelUrl } = body;

    const couponId = process.env.NODE_ENV === "development"
    ? process.env.DEFAULT_PROMO_DEV
    : process.env.DEFAULT_PROMO_PROD;

    const response = await tryCheckout({
      priceId, 
      mode, 
      successUrl, 
      cancelUrl, 
      clientReferenceId: user?._id?.toString(), 
      user: user, 
      couponId: couponId 
    });

    // const stripeSessionURL = await createCheckout({
    //   priceId,
    //   mode,
    //   successUrl,
    //   cancelUrl,
    //   // If user is logged in, it will pass the user ID to the Stripe Session so it can be retrieved in the webhook later
    //   clientReferenceId: user?._id?.toString(),
    //   // If user is logged in, this will automatically prefill Checkout data like email and/or credit card for faster checkout
    //   user,
    //   // If you send coupons from the frontend, you can pass it here body.couponId
    //   couponId: couponId,
    // });

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
