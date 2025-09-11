// app/smooth-scroll-provider.tsx
"use client";

import { useEffect } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check if native smooth scrolling is supported
    if (!("scrollBehavior" in document.documentElement.style)) {
      const handleSmoothScroll = (e: Event) => {
        const target = e.currentTarget as HTMLAnchorElement;
        if (
          target.hash &&
          target.pathname === window.location.pathname &&
          target.hash.startsWith("#")
        ) {
          e.preventDefault();
          const targetElement = document.querySelector(target.hash);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      };

      // Add event listeners to all anchor links
      const links =
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      links.forEach((link) =>
        link.addEventListener("click", handleSmoothScroll)
      );

      // Cleanup on unmount
      return () => {
        links.forEach((link) =>
          link.removeEventListener("click", handleSmoothScroll)
        );
      };
    }
  }, []);

  return <>{children}</>;
}
