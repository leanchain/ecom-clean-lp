"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ConsentStatus = "undecided" | "accepted" | "declined";
interface CookieConsentContextType {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
  reset: () => void;
}

const STORAGE_KEY = "cookie-consent";
const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<ConsentStatus>("undecided");

  useEffect(() => {
    const savedStatus = localStorage.getItem(STORAGE_KEY);
    if (savedStatus === "accepted" || savedStatus === "declined") {
      setStatus(savedStatus);
    }
  }, []);

  const update = (nextStatus: Exclude<ConsentStatus, "undecided">) => {
    localStorage.setItem(STORAGE_KEY, nextStatus);
    setStatus(nextStatus);
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStatus("undecided");
  };

  return (
    <CookieConsentContext.Provider
      value={{
        status,
        accept: () => update("accepted"),
        decline: () => update("declined"),
        reset,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}
