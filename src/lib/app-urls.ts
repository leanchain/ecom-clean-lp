/**
 * Where the product app lives.
 *
 * `next dev` picks up `.env.development` (localhost); every build without an
 * explicit override falls back to production, so a missing env file can never
 * ship localhost links to real visitors. Staging or a preview deploy sets
 * `NEXT_PUBLIC_APP_BASE_URL` in its build environment, which wins over both.
 *
 * The value is inlined at build time, so it must be read as a full static
 * `process.env.NEXT_PUBLIC_*` expression.
 */
const APP_BASE_URL = (
  process.env.NEXT_PUBLIC_APP_BASE_URL || "https://app.beseam.com"
).replace(/\/+$/, "");

export { APP_BASE_URL };

export const APP_LOGIN_URL = `${APP_BASE_URL}/login`;
export const APP_REGISTER_URL = `${APP_BASE_URL}/register`;
export const APP_REPORT_URL = `${APP_BASE_URL}/report`;

// lc-debt: Beseam's main app has no public Shopify App Store listing yet
// (only the Fit/sizing app is published, at apps.shopify.com/beseam-sizing).
// "Add to Shopify" points at the real connect-store flow (dashboard ->
// Stores -> Connect Store -> Shopify OAuth, see docs/public/tracker/
// installation/shopify.md) until a public listing exists, then swap this to
// the apps.shopify.com URL.
export const SHOPIFY_APP_URL = `${APP_BASE_URL}/register`;
