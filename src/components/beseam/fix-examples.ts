/**
 * Worked examples, built from the store's own details.
 *
 * The merchant asked for "an embedded example here, like a generated version of
 * my site with the positive example in it. In this way, I could adapt to clear
 * visual instructions instead of guessing what's meant exactly."
 *
 * So these are not documentation samples to translate. They use the brand and
 * product we actually read, and the country and currency we detected, so the
 * merchant can compare them against their own page.
 */

export type FixExample = {
  /** One line saying what this snippet is, in plain words. */
  caption: string;
  /** Where it belongs on the page. */
  placement: string;
  code: string;
};

const q = (value: string) => JSON.stringify(value);

function returnPolicyExample(country: string): FixExample {
  const code = [
    "{",
    '  "@type": "Offer",',
    '  "hasMerchantReturnPolicy": {',
    '    "@type": "MerchantReturnPolicy",',
    `    "applicableCountry": ${q(country)},`,
    '    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",',
    '    "merchantReturnDays": 30,',
    '    "returnMethod": "https://schema.org/ReturnByMail",',
    '    "returnFees": "https://schema.org/FreeReturn"',
    "  }",
    "}",
  ].join("\n");
  return {
    caption:
      "Your returns terms, written so search engines can read them. Change 30 days and free returns to whatever your policy actually says.",
    placement:
      "Goes inside the Offer block of the product data already on your product pages.",
    code,
  };
}

function shippingExample(country: string, currency: string): FixExample {
  const code = [
    "{",
    '  "@type": "Offer",',
    '  "shippingDetails": {',
    '    "@type": "OfferShippingDetails",',
    '    "shippingRate": {',
    '      "@type": "MonetaryAmount",',
    '      "value": 0,',
    `      "currency": ${q(currency)}`,
    "    },",
    '    "shippingDestination": {',
    '      "@type": "DefinedRegion",',
    `      "addressCountry": ${q(country)}`,
    "    },",
    '    "deliveryTime": {',
    '      "@type": "ShippingDeliveryTime",',
    '      "transitTime": {',
    '        "@type": "QuantitativeValue",',
    '        "minValue": 2,',
    '        "maxValue": 5,',
    '        "unitCode": "DAY"',
    "      }",
    "    }",
    "  }",
    "}",
  ].join("\n");
  return {
    caption:
      "Your delivery cost and time, written so search engines can read them. Change the 0 and the 2 to 5 days to your real rate and timings.",
    placement:
      "Goes inside the Offer block of the product data already on your product pages.",
    code,
  };
}

function productIdentityExample(
  brand: string,
  product: string,
  image: string,
): FixExample {
  const code = [
    "{",
    '  "@type": "Product",',
    `  "name": ${q(product)},`,
    '  "brand": {',
    '    "@type": "Brand",',
    `    "name": ${q(brand)}`,
    "  },",
    `  "image": [${q(image)}]`,
    "}",
  ].join("\n");
  return {
    caption:
      "Your product with its brand and main image attached, which is what a listing shows.",
    placement: "Part of the product data on the product page.",
    code,
  };
}

/** The example for a finding, or null when we cannot show one honestly. */
export function fixExampleFor(
  code: string,
  context: {
    brand: string;
    product: string | null;
    country: string | null;
    currency: string | null;
    image: string | null;
  },
): FixExample | null {
  // Guessing a currency would put a wrong number in front of the merchant, which
  // is exactly the habit this work exists to remove. When we do not know it, the
  // snippet says so in the place they have to edit anyway.
  const country = context.country || "YOUR_COUNTRY";
  const currency = context.currency || "YOUR_CURRENCY";

  if (code.includes("return_policy") || code.includes("merchant_return")) {
    return returnPolicyExample(country);
  }
  if (code.includes("shipping_details") || code.includes("merchant.shipping")) {
    return shippingExample(country, currency);
  }
  if (code.includes("image_missing") || code.includes("brand_missing")) {
    return productIdentityExample(
      context.brand,
      context.product || "Your product",
      context.image || "https://your-store.example/product-photo.jpg",
    );
  }
  return null;
}
