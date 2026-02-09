"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ConsentStatus = "undecided" | "accepted" | "declined";

interface CookieConsentContextType {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
}

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
    const savedStatus = localStorage.getItem("cookie-consent") as ConsentStatus;
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setStatus("accepted");
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setStatus("declined");
  };

  return (
    <CookieConsentContext.Provider value={{ status, accept, decline }}>
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
