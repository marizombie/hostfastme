import { Suspense } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WithWithout from '@/components/WithWithout';
import TryForFree from '@/components/TryForFree';
import FeaturesListicle from '@/components/FeaturesListicle';
// import WebSocketTester from '@/components/TestWebSocket';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        {/* <WebSocketTester /> */}
        <Hero />
        <Problem />
        <WithWithout />
        <FeaturesListicle />
        <TryForFree />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}