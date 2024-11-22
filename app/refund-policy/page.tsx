import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";


export const metadata = getSEOTags({
  title: `Refund Policy | ${config.appName}`,
  canonicalUrlRelative: "/refund-policy",
});

const RefundPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Refund Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: 22nd November, 2024

Welcome to HostFastMe! Please read this policy carefully before purchasing any product or service from our website: https://hostfast.me.

1. No Returns, No Refunds Policy

At HostFastMe, we provide digital guides designed to help developers set up their servers quickly and affordably. By purchasing our products, you acknowledge and agree to the following terms:

2. Non-Refundable Digital Products

All products and services offered by HostFastMe are digital in nature.
Due to the instant and irrevocable delivery of digital content, we do not offer returns, exchanges, or refunds under any circumstances.

3. Lifetime Access

Upon purchase, you gain lifetime access to the content of your selected product(s).
Once purchased, the product remains available to you indefinitely, even if you lose access to HostFastMe's platform.

4. Ownership and Use of Digital Content

The guides and materials you purchase are for your personal use only.
Since digital products cannot be "returned" in the traditional sense, and users retain permanent access to the knowledge and data, all sales are final.

5. Contact Information

If you have any questions or issues accessing your purchased content, please contact us at:
Email: maryna@hostfast.me

By proceeding with a purchase, you confirm your understanding and acceptance of this No Returns, No Refunds Policy.

Thank you for choosing HostFastMe for your developer needs!`}
        </pre>
      </div>
    </main>
  );
};

export default RefundPolicy;
