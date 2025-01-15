"use client";
import { useEffect } from "react";
import config from "@/config";

export default function UmamiScript(): null {
  useEffect(() => {
    if (!document.getElementById("umami-script")) {
      const script = document.createElement("script");
      script.id = "umami-script";
      script.src = config.umamiScriptPath;
      script.defer = true;
      script.setAttribute("data-website-id", config.umamiWebsiteId);
      document.head.appendChild(script);
      console.log("Umami script added");
    }
  }, []);

  return null;
}