"use client";

const alerts = [
  {
    status: "live",
    text: "PayPal checkout failing · Germany · €3,200 at risk",
  },
  {
    status: "fixed",
    text: "Add-to-cart broken · Mobile Safari · Caught in 22 min",
  },
  {
    status: "live",
    text: "Wrong currency showing · UK visitors · Abandonment +40%",
  },
  {
    status: "fixed",
    text: "Theme update broke navigation · Tablet · Caught in 18 min",
  },
  { status: "live", text: "Klarna not loading · Netherlands · €1,800 at risk" },
  {
    status: "fixed",
    text: "Checkout frozen on Android · 47 visitors · Caught in 31 min",
  },
  {
    status: "live",
    text: "Size selector not responding · iOS 17 · €890 at risk",
  },
  {
    status: "fixed",
    text: "Wrong prices shown · CA visitors · Caught in 11 min",
  },
  {
    status: "live",
    text: "Buy now button dead after app update · €2,100 at risk",
  },
  {
    status: "fixed",
    text: "PayPal missing at checkout · Austria · Caught in 26 min",
  },
];

export default function AlertTicker() {
  return (
    <div className="relative overflow-hidden border-b border-border/40 bg-background py-2.5">
      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-background to-transparent" />

      <div className="flex animate-[ticker_40s_linear_infinite] gap-8 whitespace-nowrap">
        {[...alerts, ...alerts].map((alert, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-2 text-xs"
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                alert.status === "live"
                  ? "bg-primary animate-pulse"
                  : "bg-emerald-500"
              }`}
            />
            <span
              className={
                alert.status === "live"
                  ? "text-foreground/70"
                  : "text-muted-foreground/60"
              }
            >
              {alert.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
