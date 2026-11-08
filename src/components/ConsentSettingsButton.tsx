"use client";
import { consent } from "@/config/consent";
import { openConsentSettings } from "@/lib/consent";

// Steht im Footer, damit die Auswahl jederzeit ohne Umweg änderbar bleibt.
export default function ConsentSettingsButton() {
  return (
    <button
      type="button"
      className="footer-settings"
      onClick={openConsentSettings}
    >
      {consent.settingsLabel}
    </button>
  );
}
