import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "HostFastMe",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "HostFastMe is your key to time and money efficient server setup",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "hostfast.me",
  // crisp: {
  //   // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
  //   id: "",
  //   // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
  //   onlyShowOnRoutes: ["/"],
  // },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.BASIC_DEV_PRICE_ID
            : process.env.BASIC_PROD_PRICE_ID,
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: process.env.BASIC_PRODUCT_NAME,
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: process.env.BASIC_DESCRIPTION,
        // The price you want to display, the one user will be charged on Stripe.
        price: Number(process.env.BASIC_PRICE),
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: Number(process.env.BASIC_ANCHOR),
        features: [
          { name: "AWS/GCP server setup guide" },
          { name: "Renting machine" },
          { name: "Setting it up for work" },
          { name: "Deployment configuration" },
          { name: "Launching webserver" },
          { name: "Attaching domain" },          
          { name: "Setting up free SSL certificate" },
          { name: "Securing connection" },
          { name: "BONUS: Cheapest domain & business email tips" },
          { name: "BONUS: Terminal tips" },
          { name: "Yours forever" },
        ],
      },
      {
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.EXT_DEV_PRICE_ID
            : process.env.EXT_PROD_PRICE_ID,
        name: process.env.EXT_PRODUCT_NAME,
        description: process.env.EXT_DESCRIPTION,
        price: Number(process.env.EXT_PRICE),
        priceAnchor: Number(process.env.EXT_ANCHOR),
        features: [
          {
            name: "All in Basic +",
          },
          // { name: "Automation to save more time" },
          { name: "BONUS: Reliability tips" },
          { name: "BONUS: Additional security tips" },
          { name: "BONUS: Automating SSL certificate updates" },
          { name: "BONUS: ULTIMATE FREE notifications setup" },
          // { name: "Chat with other makers" },
          { name: "Future updates" },
        ],
      },
    ],
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `HostFast <noreply@hostfast.me>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Maryna from HostFast <maryna@hostfast.me>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: process.env.SUPPORT_EMAIL,
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "it.with.mari@gmail.com",
  },
  // aws: {
  //   // If you use AWS S3/Cloudfront, put values in here
  //   bucket: "bucket-name",
  //   bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
  //   cdn: "https://cdn-id.cloudfront.net/",
  // },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: '#1ABC9C',//themes["dark"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
