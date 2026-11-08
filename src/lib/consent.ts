"use client";
import { useEffect, useState } from "react";
import { consent } from "@/config/consent";

// Gemeinsamer Zustand für den Hinweis und das Anmeldeformular.
// Es wird bewusst kein Cookie gesetzt: nur die Auswahl selbst liegt in
// localStorage. Solange sie fehlt, werden keine externen Inhalte geladen.
export type ConsentChoice = "unset" | "accepted" | "rejected";

export const CONSENT_CHANGE = "hummelhof:consent-change";
export const CONSENT_OPEN = "hummelhof:consent-open";

// Falls der Browser Speicherzugriff verweigert, gilt die Auswahl zumindest
// für den aktuellen Besuch.
let inMemory: ConsentChoice = "unset";

export function readConsent(): ConsentChoice {
  if (inMemory !== "unset") return inMemory;
  try {
    const value = window.localStorage.getItem(consent.storageKey);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    // Speicher nicht verfügbar: ohne Auswahl bleiben externe Inhalte aus.
  }
  return "unset";
}

export function saveConsent(choice: "accepted" | "rejected") {
  inMemory = choice;
  try {
    window.localStorage.setItem(consent.storageKey, choice);
  } catch {
    // s. o.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN));
}

export function useConsent(): ConsentChoice {
  const [choice, setChoice] = useState<ConsentChoice>("unset");
  useEffect(() => {
    const update = () => setChoice(readConsent());
    update();
    window.addEventListener(CONSENT_CHANGE, update);
    // Auch Änderungen in einem zweiten Tab berücksichtigen.
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CONSENT_CHANGE, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return choice;
}
