"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import toast from "react-hot-toast";
// import { usePlausible } from 'next-plausible'

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({
  priceId,
  mode = "payment",
}: {
  priceId: string;
  mode?: "payment" | "subscription";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const plausible = usePlausible();

  const handlePayment = async () => {
    setIsLoading(true);
    // plausible('CheckoutClick');
    localStorage.setItem('clientId', Math.random().toString(36).substring(7))
    const payload = {
      priceId,
      successUrl: `${window.location.href}?clientId=${localStorage.getItem('clientId')}`, //`${window.location.href}?status=success`,
      cancelUrl:  `${window.location.href}?clientId=${localStorage.getItem('clientId')}`, //`${window.location.href}?status=canceled`,
      // couponId: coupon,
      mode,
    };

    try {
      const { url, couponId }: { url: string, couponId: string } = 
      await apiClient.post(
        "/stripe/create-checkout",
        payload
      );

      window.location.href = url;

      if (couponId) {
        toast.success(`Coupon applied successfully`);
      } else {
        toast.error("No valid coupon applied, proceeding without discount");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to start transaction, please try again");
    }

    setIsLoading(false);
  };
  
  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   console.log('running check success or cancel');
  //   // const query = new URLSearchParams(window.location.search); //query.get('success')
  //   const currentQuery = window.location.search;
  //   if (currentQuery.includes('success')) {
  //     console.log('Order placed! You will receive an email confirmation.');
  //     toast.success('Order placed! You will receive an email confirmation.');
  //   }

  //   if (currentQuery.includes('canceled')) {
  //     console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  //     toast.error('Order canceled -- continue to shop around and checkout when you’re ready.');
  //   }
  //   // redirect home after this to remove params? 
  //   // import { redirect } from 'next/navigation'
  //   redirect('/');
  // }, []);

  return (
    <button
      className="btn btn-primary btn-block group"
      data-umami-event="Checkout click"
      onClick={() => handlePayment()}
    >
      {/* {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      )  }*/

      // : (
      //   // <svg
      //   //   className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200"
      //   //   viewBox="0 0 375 509"
      //   //   fill="none"
      //   //   xmlns="http://www.w3.org/2000/svg"
      //   // >
      //   //   <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" />
      //   // </svg>
      //   <svg 
      //       xmlns="http://www.w3.org/2000/svg"
      //       width="400"
      //       height="400"
      //       viewBox="0 0 375 509"
      //       fill="none"
      //       stroke="#ffffff"
      //       strokeWidth="2.3"
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //       className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200"
      //       fillOpacity="0">
      //       <circle
      //          cx="12"
      //          cy="12"
      //          r="3"/>
      //       <path
      //          d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"/>
      //       <path
      //          d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"/>
      //       <path
      //          d="M6 6h.01"/>
      //       <path
      //          d="M6 18h.01"/>
      //       <path
      //          d="m15.7 13.4-.9-.3"/>
      //       <path
      //          d="m9.2 10.9-.9-.3"/>
      //       <path
      //          d="m10.6 15.7.3-.9"/>
      //       <path
      //          d="m13.6 15.7-.4-1"/>
      //       <path
      //          d="m10.8 9.3-.4-1"/>
      //       <path
      //          d="m8.3 13.6 1-.4"/>
      //       <path
      //          d="m14.7 10.8 1-.4"/>
      //       <path
      //          d="m13.4 8.3-.3.9"/>
      //     </svg>
      // )
      }
      Get {config?.appName}
    </button>
  );
};

export default ButtonCheckout;
