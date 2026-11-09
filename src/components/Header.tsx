"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { images } from "@/config/images";
import { event } from "@/config/event";
import { registrationHref } from "@/config/registration";
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Hummelhof 50K – Home">
          <Image
            src={images.logo.src}
            alt={images.logo.alt}
            width={66}
            height={66}
            priority
          />
          <span>
            HUMMELHOF <b>50K</b>
            <small>{event.name.toUpperCase()}</small>
          </span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Schließen ×" : "Menü ☰"}
        </button>
        <nav
          id="navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Hauptnavigation"
        >
          <Link
            href="/"
            aria-current={path === "/" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            aria-current={path === "/about-us" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/faq"
            aria-current={path === "/faq" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            className="nav-cta"
            href={registrationHref}
            aria-current={path === "/anmeldung" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Anmeldung <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
