import Link from "next/link";

import { Mail } from "lucide-react";

import Logo from "../ui/logo";

import { cn } from "@/lib/utils";

const ITEMS = [
  {
    title: "Product",
    links: [
      { name: "PDP Audit (Free)", href: "https://app.beseam.com/analyze", target: "_blank" },
      { name: "Playbooks & Upgrades", href: "/#platform" },
      { name: "Monitoring & Incidents", href: "/#the-loop" },
      { name: "Change History", href: "/#platform" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "About", href: "/about" },
      { name: "Alternatives", href: "/alternatives" },
      { name: "Compare", href: "/compare" },
      { name: "Documentation", href: "https://docs.beseam.com/docs/public/tracker", target: "_blank" },
      { name: "FAQ", href: "/#faq" },
      { name: "Demo", href: "/demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

// Compliance badges
const COMPLIANCE_BADGES = [
  {
    name: "GDPR Compliant",
    flag: "🇪🇺",
    href: "https://gdpr.eu/",
  },
  {
    name: "CASA Tier II Verified",
    flag: "🛡️",
    href: "https://appdefensealliance.dev/casa",
  },
  {
    name: "CCPA Compliant",
    flag: "🇺🇸",
    href: "https://oag.ca.gov/privacy/ccpa",
  },
  {
    name: "SOC 2 Type II",
    flag: "🔒",
    href: "https://appdefensealliance.dev/casa",
    comingSoon: true,
  },
];

const SOCIAL_LINKS = [
  {
    name: "Email Us",
    href: "mailto:contact@beseam.com",
    icon: <Mail className="size-5" />,
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/beseam_ai",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M20.1328 20.4259L14.264 11.2028L20.0549 4.8325C20.1859 4.68487 20.2534 4.49156 20.2428 4.29449C20.2322 4.09742 20.1444 3.91247 19.9983 3.77974C19.8523 3.64701 19.6598 3.5772 19.4626 3.58543C19.2654 3.59367 19.0794 3.6793 18.9449 3.82375L13.4287 9.89125L9.63276 3.92594C9.56507 3.81939 9.47158 3.73166 9.36097 3.67086C9.25035 3.61006 9.12617 3.57816 8.99994 3.57813H4.49994C4.36547 3.57806 4.23345 3.61415 4.11771 3.68262C4.00198 3.75109 3.90677 3.84941 3.84208 3.9673C3.77738 4.08519 3.74558 4.21831 3.74998 4.35271C3.75439 4.48711 3.79485 4.61785 3.86713 4.73125L9.73588 13.9534L3.94494 20.3284C3.87732 20.4011 3.82479 20.4864 3.79039 20.5795C3.75599 20.6726 3.74041 20.7716 3.74455 20.8708C3.74869 20.9699 3.77248 21.0673 3.81452 21.1572C3.85657 21.2471 3.91604 21.3278 3.98949 21.3945C4.06293 21.4613 4.1489 21.5128 4.2424 21.546C4.3359 21.5793 4.43508 21.5937 4.53419 21.5884C4.63329 21.5831 4.73035 21.5581 4.81974 21.515C4.90914 21.4719 4.98908 21.4114 5.05494 21.3372L10.5712 15.2697L14.3671 21.235C14.4354 21.3407 14.5291 21.4275 14.6397 21.4874C14.7503 21.5474 14.8742 21.5786 14.9999 21.5781H19.4999C19.6343 21.5781 19.7661 21.542 19.8817 21.4735C19.9973 21.4051 20.0924 21.3069 20.1571 21.1892C20.2218 21.0714 20.2536 20.9385 20.2493 20.8042C20.2451 20.67 20.2048 20.5393 20.1328 20.4259ZM15.4115 20.0781L5.86588 5.07812H8.58463L18.134 20.0781H15.4115Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/beseam",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-footer-background border-t py-16 md:py-24">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Side: Brand, Social, Compliance */}
          <div className="flex flex-col space-y-8">
            <div>
              <Logo className="text-primary scale-110 origin-left transition-transform hover:scale-115" />
              <p className="font-heading mt-6 max-w-sm text-lg font-semibold leading-tight text-foreground md:text-xl">
                Every PDP change. <br className="hidden sm:block" />
                <span className="text-primary">Revenue-guardrailed</span>.
              </p>
            </div>

            <div>
              <div className="mt-4 flex items-center gap-5">
                {SOCIAL_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      "text-muted-foreground transition-colors hover:text-primary",
                      link.icon && "text-muted-foreground",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {link.icon || (
                      <span className="text-sm font-medium">{link.name}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <ul className="mt-4 flex flex-col space-y-3">
                {COMPLIANCE_BADGES.map((badge, index) => (
                  <li key={index}>
                    <Link
                      href={badge.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-base">{badge.flag}</span>
                      <span>{badge.name}</span>
                      {badge.comingSoon && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Beseam. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Side: Product, Resources, Legal */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:justify-items-end">
            {ITEMS.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        target={link.target}
                        rel={
                          link.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t pt-8">
          <p className="max-w-2xl text-[11px] leading-relaxed text-muted-foreground/60">
            Beseam is a revenue-guardrailed PDP ops platform. We help brands and
            their agencies ship PDP improvements safely - with versioning,
            monitoring, and rollback. All product names, logos, and brands are
            property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
