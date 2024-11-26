/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ],
  },
  // env: {
  //   PRODUCT_LINK: process.env.PRODUCT_LINK,
  //   EXTENDED_PRODUCT_LINK: process.env.EXTENDED_PRODUCT_LINK,
  //   GITHUB_COLLAB_TOKEN: process.env.GITHUB_COLLAB_TOKEN,
  //   BASIC_PROD_PRICE_ID: process.env.BASIC_PROD_PRICE_ID,
  //   BASIC_DEV_PRICE_ID: process.env.BASIC_DEV_PRICE_ID,
  //   EXT_PROD_PRICE_ID: process.env.EXT_PROD_PRICE_ID,
  //   EXT_DEV_PRICE_ID: process.env.EXT_DEV_PRICE_ID,
  //   DEFAULT_PROMO_PROD: process.env.DEFAULT_PROMO_PROD,
  //   SMTP_USER: process.env.SMTP_USER,
  //   SMTP_PASS: process.env.SMTP_PASS,
  //   SMTP_PORT: process.env.SMTP_PORT,
  //   STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  //   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  //   STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  //   MONGODB_URI: process.env.MONGODB_URI,
  // },
};

module.exports = nextConfig;
