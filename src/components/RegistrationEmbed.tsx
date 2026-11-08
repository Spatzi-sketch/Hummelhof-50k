"use client";
import type { CSSProperties } from "react";
import { consent } from "@/config/consent";
import { registration } from "@/config/registration";
import { openConsentSettings, useConsent } from "@/lib/consent";

// Der iframe wird erst erzeugt, wenn eine Zustimmung vorliegt. Vorher – und
// auch ohne JavaScript – gibt es nur einen Hinweis und einen selbst
// ausgelösten Link zum Formular beim Anbieter.
export default function RegistrationEmbed() {
  const choice = useConsent();

  if (choice !== "accepted") {
    return (
      <div className="registration-blocked">
        <strong>{consent.blockedTitle}</strong>
        <p>{consent.blockedText}</p>
        <div className="registration-blocked-actions">
          <button type="button" onClick={openConsentSettings}>
            {consent.changeLabel}
          </button>
          <a
            className="text-link"
            href={registration.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {consent.externalLabel}
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="registration-frame"
      style={
        { "--embed-height": `${registration.embedHeight}px` } as CSSProperties
      }
      src={registration.registrationUrl}
      title={registration.embedTitle}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
