"use client";
import { useEffect, useRef, useState } from "react";
import { consent } from "@/config/consent";
import { CONSENT_OPEN, saveConsent, useConsent } from "@/lib/consent";

// Dezent am unteren Rand, ohne Overlay und ohne Animation. Beide Buttons
// sind gleich groß; Escape entspricht der datensparsameren Auswahl.
export default function CookieConsent() {
  const choice = useConsent();
  const [mounted, setMounted] = useState(false);
  const [reopened, setReopened] = useState(false);
  const region = useRef<HTMLElement>(null);

  // Erst nach der Hydration rendern: so flackert der Hinweis bei
  // wiederkehrenden Besuchern nicht auf.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN, onOpen);
  }, []);

  const visible = mounted && (choice === "unset" || reopened);

  useEffect(() => {
    if (visible) region.current?.focus({ preventScroll: true });
  }, [visible]);

  function decide(next: "accepted" | "rejected") {
    saveConsent(next);
    setReopened(false);
  }

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") decide("rejected");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <aside
      ref={region}
      className="consent"
      role="region"
      aria-label={consent.regionLabel}
      tabIndex={-1}
    >
      <div className="consent-inner wrap">
        <div className="consent-text">
          <h2>{consent.title}</h2>
          <p>{consent.intro}</p>
          <details className="consent-details">
            <summary>{consent.detailsSummary}</summary>
            <ul>
              {consent.details.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </details>
        </div>
        <div className="consent-actions">
          <button
            type="button"
            className="consent-button consent-accept"
            onClick={() => decide("accepted")}
          >
            {consent.acceptLabel}
          </button>
          <button
            type="button"
            className="consent-button consent-reject"
            onClick={() => decide("rejected")}
          >
            {consent.rejectLabel}
          </button>
          <p className="consent-footnote">{consent.footnote}</p>
        </div>
      </div>
    </aside>
  );
}
