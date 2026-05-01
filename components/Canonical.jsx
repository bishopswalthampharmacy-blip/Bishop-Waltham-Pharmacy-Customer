"use client";
import { useEffect } from "react";

export default function Canonical({ siteUrl }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const base =
      siteUrl ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://bishopswalthampharmacy.co.uk";
    const { origin, pathname } = window.location;
    const normalizedBase = base.replace(/\/+$/, "");
    const href = normalizedBase.startsWith(origin)
      ? `${normalizedBase}${pathname}`
      : `${normalizedBase}${pathname}`;

    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, [siteUrl]);

  return null;
}
