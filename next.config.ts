import { withPlausibleProxy } from 'next-plausible';
import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
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
}
 
export default withPlausibleProxy()(nextConfig);

