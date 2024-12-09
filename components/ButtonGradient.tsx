"use client";

import React from "react";
// import { useState } from "react";
// import apiClient from "@/libs/api";
// import config from "@/config";
// import toast from "react-hot-toast";
// import { usePlausible } from 'next-plausible'
import Link from "next/link";

const ButtonGradient = ({
  title = "Gradient Button"
}: {
  title?: string;
}) => {
  // const plausible = usePlausible();
  // const mode = "payment";
  // const handlePayment = async () => {
  //   plausible('TryForFreeClick');

    // LATER WHEN HAVE PAID CUSTOMERS, PUT LEAD MAGNET (TRIAL LINK) HERE
    // AND DROP LINK AROUND BUTTON
    // const zeroPriceId = config.stripe.zeroPriceId;

    // const payload = {
    //   zeroPriceId,
    //   successUrl: window.location.href,
    //   cancelUrl: window.location.href,
    //   mode,
    // };
    // console.log("Payload:", payload);

    // try {
    //   const { url, couponId }: { url: string, couponId: string } = 
    //   await apiClient.post(
    //     "/stripe/create-checkout",
    //     payload
    //   );

    //   window.location.href = url;

    //   if (couponId) {
    //     toast.success(`Coupon applied successfully`);
    //   } else {
    //     toast.error("No valid coupon applied, proceeding without discount");
    //   }
    // } catch (e) {
    //   console.error(e);
    //   toast.error("Failed to start transaction, please try again");
    // }
    //
    // for button:  onClick={() => handlePayment()}
  // };
  
  return (    
    <Link href="/#pricing" passHref>
      <button className="btn btn-gradient animate-shimmer"> 
        {title}
      </button>
    </Link>
  );
};

export default ButtonGradient;
