"use client";

import Link from "next/link";
// import apiClient from "@/libs/api";
import config from "@/config";

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckoutSmall = ({
  priceId,
}: {
  priceId: string;
}) => {
  // const handlePayment = async () => {
  //   try {
  //     const { url }: { url: string } = await apiClient.post(
  //       "/stripe/create-checkout",
  //       {
  //         priceId,
  //         successUrl: window.location.href,
  //         cancelUrl: window.location.href,
  //         mode,
  //       }
  //     );

  //     window.location.href = url;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // return (
  //   <button
  //     className="btn btn-primary btn-wide"
  //     onClick={() => handlePayment()}
  //   >
  //     Get {config?.appName}
  //   </button>
  // );

  return (
    <Link href="/#pricing" passHref>
      <button className="btn btn-primary btn-wide">
        Get {config?.appName}
      </button>
    </Link>
  );
};

export default ButtonCheckoutSmall;
