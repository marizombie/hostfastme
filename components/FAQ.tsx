"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";
import config from "@/config";

// <FAQ> component is a list of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What do I get exactly?",
    answer: <div className="space-y-2 leading-relaxed">
      Detailed text+code+image instruction on how to make your project up and running using AWS or GCP.
      <br/>It includes every tiny step you&apos;ll need to make, so even if you are unfamiliar with the cloud it won&apos;t be a problem.
      <br/>After setting up a machine we&apos;ll move to the webserver, DNS settings and more.
      <br/>We&apos;ll say goodbyes only when you go online. <br/><br/>
      <b>There are bonuses too:</b> I&apos;ll give you cheapest domain & business email how-to, terminal tips; in the Extended guide you&apos;ll also get predictable 
      payment setup help, more tips on security and reliability, an instruction on how to set up notifications come to your Telegram, plus how to automate SSL certificate updates!
    </div>,
  },
  {
    question: "Why should I buy it?",
    answer: <div className="space-y-2 leading-relaxed">
      1. It simplifies things for those who want to try launching website using AWS or GCP!<br/>
      2. Lots of hosting platforms are taking money for being a proxy between you and the cloud machines. 
      Why pay more, when you can do it yourself?
      <br/>3. Most of proxy platforms run only static websites and serverless backend. Got another idea? 
      Why not build it and host yourself!
    </div>,
  },
  {
    question: "Are there extra payments?",
    answer: <div className="space-y-2 leading-relaxed">
      No, you don&apos;t have to pay anything extra: GCP is free for 3 months and AWS for 1 year. 
      And later they&apos;ll cost less then using a proxy hosting provider.
      <br/>In fact, I&apos;ll even help you save on buying domain and business email — 
      together they can cost you under 10$ per year!
    </div>,
  },
  {
    question: "Who is this for?",
    answer: <div className="space-y-2 leading-relaxed">
      For makers who want full control over their project. <br/>
      For devs, who are interested in DevOps and want to start fast.<br/>
      For those, who can code and follow coding instructions. 
      For those who want to save time and $ launching their website.
    </div>,
  },
  {
    question: "What do I need to start?",
    answer: (
      <p>
        A project (frontend, backend) of your future website.
        <br/> <i>A desire to make your thing work would be good too!</i> 😉
      </p>
    ),
  },
  {
    question: "I have no project, what do I do?",
    answer: (
      <p>
        At the moment {config.appName} contains only a guide for makers who already have a project to host.
        So you better start building! 
      </p>
    ),
  },
  {
    question: "My backend requires constant running, will it suit me?",
    answer: (
      <p>
        Yes! Current version of {config.appName} is optimal for this setup. 
        It was made with thoughts of the projects which need special care and more control.
      </p>
    ),
  },
  {
    question: "My frontend is not static, will it work?",
    answer: (
      <p>
        Yes! This version of {config.appName} is great for this setup. 
        Providing more flexibility for projects like yours is one of the aims of {config.appName}.  
      </p>
    ),
  },
  {
    question: "I don't code, is this for me?",
    answer: (
      <p>
        Probably no. {config.appName} guides need basic coding skills for easier steps following.
      </p>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <p>
        {config.appName} is an informational product. It&apos;s yours forever and return is impossible, so no. 
        <br/> However, if you have any problems be sure to contact me using support email.
      </p>
    ),
  },
  {
    question: "I have another question",
    answer: (
      <div className="space-y-2 leading-relaxed">Send me an email!</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
