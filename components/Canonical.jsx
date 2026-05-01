"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Canonical({ siteUrl }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const base = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://bishopswalthampharmacy.co.uk";
    const query = searchParams?.toString();
    const href = `${base.replace(/\/+$/, "")}${pathname}${query ? `?${query}` : ""}`;

    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, [pathname, searchParams, siteUrl]);

  return null;
}
