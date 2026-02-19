"use client";
import { useEffect, useState } from "react";

export default function QuickNav() {
  const [scrolled, setScrolled] = useState(false);
  console.log(scrolled);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-white border p-2">
      quick-nav
    </div>
  );
}
