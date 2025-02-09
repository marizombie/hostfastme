"use client";
import { useEffect } from "react";

export default function UmamiScript(): null {
  useEffect(() => {
    if (!document.getElementById("umami-script")) {
      const script = document.createElement("script");
      script.id = "umami-script";
      script.src = "/uma/script.js";
      script.defer = true;
      script.setAttribute("data-website-id", "640263a4-b3f8-4e99-8fd1-5c4ab656e712");
      document.head.appendChild(script);
      console.log("Umami script added");
    }
  }, []);

  return null;
}