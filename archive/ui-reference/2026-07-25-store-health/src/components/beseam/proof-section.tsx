"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

interface EvidenceItem {
  title: string;
  date?: string;
  platform: string;
  href: string;
}

interface Category {
  id: string;
  label: string;
  items: EvidenceItem[];
}

const evidenceCategories: Category[] = [
  {
    id: "visibility",
    label: "Product visibility failures",
    items: [
      {
        platform: "Shopify",
        title: "Live website not showing available items",
        date: "Feb 4, 2026",
        href: "https://community.shopify.com/t/live-website-not-showing-available-items/587284",
      },
      {
        platform: "Square",
        title: "New Category and items not showing up",
        date: "Oct 9, 2025",
        href: "https://community.squareup.com/t5/Online-Store/New-Category-and-items-not-showing-up/td-p/820427",
      },
      {
        platform: "Square",
        title: "Created a category with items, it is not showing up on website",
        date: "Nov 7, 2025",
        href: "https://community.squareup.com/t5/Online-Store/Created-a-category-with-items-it-is-not-showing-up-on-website/td-p/824206",
      },
      {
        platform: "Square",
        title: "ITEMS ARE NOT SYNCING TO ONLINE STORE",
        date: "May 13, 2025",
        href: "https://community.squareup.com/t5/Orders-Menu-Items-Catalog/ITEMS-ARE-NOT-SYNCING-TO-ONLINE-STORE/td-p/793417",
      },
      {
        platform: "Square",
        title:
          "Online Website item quantities not syncing with Square Item Library",
        date: "Mar 27, 2025",
        href: "https://community.squareup.com/t5/Online-Store/Re-Online-Website-item-quantities-not-syncing-with-Square-Item/m-p/786633",
      },
      {
        platform: "Square",
        title: "Categories not showing on website",
        date: "Aug 10, 2025",
        href: "https://community.squareup.com/t5/Online-Store/Categories-not-showing-on-website/m-p/804895",
      },
      {
        platform: "Square",
        title:
          "Why are items on my website store not showing in the categories",
        date: "Dec 21, 2024",
        href: "https://community.squareup.com/t5/Square-Online/Why-are-items-on-my-website-store-not-showing-in-the-categories/m-p/768485",
      },
      {
        platform: "Shopify",
        title: "Product Description is Hidden",
        date: "Mar 4, 2026",
        href: "https://community.shopify.com/t/product-description-is-hide/590837",
      },
      {
        platform: "Shopify",
        title:
          "Why are product prices not visible on my customer-facing store?",
        date: "Feb 28, 2024",
        href: "https://community.shopify.com/t/why-are-product-prices-not-visible-on-my-customer-facing-store/300251",
      },
      {
        platform: "Shopify",
        title: "Live Product Options not showing",
        date: "Nov 3, 2025",
        href: "https://community.shopify.com/t/live-product-options/573898",
      },
    ],
  },
  {
    id: "product-truth",
    label: "Wrong price / stock / variant state",
    items: [
      {
        platform: "Shopify",
        title: "Products showing 'Sold Out' even when inventory is available",
        date: "Jan 22, 2026",
        href: "https://community.shopify.com/t/products-showing-sold-out-even-when-inventory-is-available/585374",
      },
      {
        platform: "Shopify",
        title: "Products are showing as sold out",
        date: "Feb 6, 2026",
        href: "https://community.shopify.com/t/products-are-showing-as-sold-out/587486",
      },
      {
        platform: "Shopify",
        title: "Sold out items with 1 in the inventory",
        date: "Jan 29, 2026",
        href: "https://community.shopify.com/t/sold-out-items-with-1-in-the-inventory/586394",
      },
      {
        platform: "Shopify",
        title:
          "Products are showing as sold out despite availability in inventory",
        date: "Aug 13, 2025",
        href: "https://community.shopify.com/t/products-are-showing-as-sold-out-despite-availability-in-inventory/556924",
      },
      {
        platform: "Shopify",
        title: "Shopify insists items are sold out when there is stock",
        date: "Oct 31, 2024",
        href: "https://community.shopify.com/t/shopify-insists-items-are-sold-out-when-there-is-stock/370361",
      },
      {
        platform: "Shopify",
        title: "Product inventory not updating",
        date: "Feb 28, 2025",
        href: "https://community.shopify.com/t/product-inventory-not-updating/397767",
      },
      {
        platform: "Shopify",
        title: "Quantity of products available not updating!",
        date: "Jan 16, 2026",
        href: "https://community.shopify.com/t/quantity-of-products-available-not-updating/584070",
      },
      {
        platform: "Shopify",
        title: "Product showing up as Sold Out",
        date: "Nov 13, 2025",
        href: "https://community.shopify.com/t/product-showing-up-as-sold-out/575335",
      },
      {
        platform: "WooCommerce",
        title: "Variable products shown as simple products on shop page",
        date: "Feb 13, 2026",
        href: "https://wordpress.org/support/topic/variable-products-shown-as-simple-products-on-shop-page/",
      },
      {
        platform: "BigCommerce",
        title:
          "Bulk pricing on PDP does not display both prices when tax display is set to both",
        date: "Jan 21, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
    ],
  },
  {
    id: "cart",
    label: "Add-to-cart / cart-state failures",
    items: [
      {
        platform: "WooCommerce",
        title: "Critical issue: Add to Cart broken in WooCommerce 10.5.0",
        date: "Feb 11, 2026",
        href: "https://wordpress.org/support/topic/critical-issue-add-to-cart-broken-in-woocommerce-10-5-0/",
      },
      {
        platform: "WooCommerce",
        title: "Cart empty for customers",
        date: "Jan 25, 2026",
        href: "https://wordpress.org/support/topic/cart-empty-for-customers/",
      },
      {
        platform: "WooCommerce",
        title: "WooCommerce cart not working",
        date: "Jan 27, 2026",
        href: "https://wordpress.org/support/topic/woocommerce-cart-not-working-6/",
      },
      {
        platform: "WooCommerce",
        title: "Undo cart deletion not working after update V 10.1.0",
        date: "Aug 14, 2025",
        href: "https://wordpress.org/support/topic/undo-cart-deletion-not-working-after-update-v-10-1-0/",
      },
      {
        platform: "WooCommerce",
        title: "Cart issue – Impossible to delete or to add a 2nd product",
        href: "https://wordpress.org/support/topic/cart-issue-impossible-to-delete-or-to-add-a-2nd-product/",
      },
      {
        platform: "BigCommerce",
        title: "Fix Cart Page not updating when adding product via Quick View",
        date: "Jan 2, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "BigCommerce",
        title: "Add to Cart and quantity buttons disabled when BCData is empty",
        date: "Mar 17, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "BigCommerce",
        title: "Out of Stock banner overlaps Add to cart button on PDP",
        date: "Mar 17, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "BigCommerce",
        title:
          "Default option is out of stock - add to cart button doesn't populate for in-stock options",
        date: "Jan 26, 2021",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "BigCommerce",
        title:
          "Unable to change product quantity several times on cart page using keyboard",
        date: "Jan 26, 2021",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
    ],
  },
  {
    id: "promo",
    label: "Promo / coupon / offer-logic failures",
    items: [
      {
        platform: "Shopify",
        title: "Coupon code was not sent to the Frontend cart",
        date: "Jan 29, 2026",
        href: "https://community.shopify.com/t/coupon-code-was-not-sent-to-the-frontend-cart/586516",
      },
      {
        platform: "Shopify",
        title: "Shopify Specific Discount Code Issue",
        date: "Feb 3, 2026",
        href: "https://community.shopify.com/t/shopify-specific-discount-code-issue/587078",
      },
      {
        platform: "Shopify",
        title: "Automatic Discount Not Showing on Product & Collection Pages",
        date: "Jan 8, 2026",
        href: "https://community.shopify.com/t/automatic-discount-not-showing-on-product-collection-pages/582572",
      },
      {
        platform: "Shopify",
        title:
          "Shopify Discount Function not working properly if other discounts are in cart",
        date: "Jan 13, 2026",
        href: "https://community.shopify.com/t/shopify-discount-function-not-working-properly-if-i-use-other-discounts-in-the-cart/583260",
      },
      {
        platform: "Shopify",
        title: "Discount Code with Multiple Conditions not applying",
        date: "Feb 19, 2026",
        href: "https://community.shopify.com/t/discount-code-with-multiple-conditions/588952",
      },
      {
        platform: "Shopify",
        title: "Automatic Free Shipping discount doesn't show at checkout",
        date: "Oct 2, 2023",
        href: "https://community.shopify.com/t/automatic-free-shipping-discount-doesnt-show-at-checkout-and-this-is-confusing-customers/255781",
      },
      {
        platform: "Shopify",
        title: "Discount codes can't be used on already-discounted products",
        date: "Feb 5, 2025",
        href: "https://community.shopify.com/t/i-want-to-allow-discount-codes-to-be-used-on-discounted-products-how-do-i-do-this/392364",
      },
      {
        platform: "Shopify",
        title: "GWP with 'discount code' - not working",
        date: "May 5, 2025",
        href: "https://community.shopify.com/t/gwp-with-discount-code-anyone-figured-it-out/412607",
      },
      {
        platform: "Shopify",
        title: "Auto Add Product to Cart with Discount Code not triggering",
        date: "May 10, 2021",
        href: "https://community.shopify.com/t/auto-add-product-to-cart-with-discount-code/46134",
      },
      {
        platform: "Shopify",
        title: "Show discount before customer adds item to cart",
        date: "Sep 26, 2024",
        href: "https://community.shopify.com/t/show-discount-for-the-customer-before-they-choose-to-put-it-in-the-cart/361589",
      },
    ],
  },
  {
    id: "checkout",
    label: "Checkout / payment failures",
    items: [
      {
        platform: "Shopify",
        title: "Country not selected automatically - payment methods disappear",
        date: "Mar 16, 2026",
        href: "https://community.shopify.com/t/country-not-automatically-selected-in-checkout-causing-payment-methods-to-disappear/592280",
      },
      {
        platform: "Shopify",
        title: "Store Credit not showing in checkout",
        date: "Feb 20, 2026",
        href: "https://community.shopify.com/t/store-credit-not-showing-in-checkout/589089",
      },
      {
        platform: "Shopify",
        title: "TWINT not showing at checkout for Swiss customers",
        date: "Dec 1, 2025",
        href: "https://community.shopify.com/t/twint-not-showing-at-checkout-for-swiss-customers/577789",
      },
      {
        platform: "Shopify",
        title: "Shop Pay Test Payment Failure",
        date: "Feb 24, 2026",
        href: "https://community.shopify.com/t/shop-pay-test-payment-failure/589562",
      },
      {
        platform: "WooCommerce",
        title: "No available payment method",
        date: "Apr 17, 2025",
        href: "https://wordpress.org/support/topic/no-available-payment-method/",
      },
      {
        platform: "WooCommerce",
        title: "Payment options not displayed at checkout for all customers",
        date: "Sep 28, 2025",
        href: "https://wordpress.org/support/topic/payment-options-are-not-displayed-at-checkout-for-all-customers/",
      },
      {
        platform: "WooCommerce",
        title: "Payment fail",
        date: "Mar 1, 2026",
        href: "https://wordpress.org/support/topic/payment-fail-4/",
      },
      {
        platform: "Shopify",
        title: "Can't use Store Credit at check out",
        date: "Dec 30, 2024",
        href: "https://community.shopify.com/t/cant-use-store-credit-at-check-out/383508",
      },
      {
        platform: "Shopify",
        title: "Bank deposit payment option not showing / hidden",
        date: "Jan 30, 2023",
        href: "https://community.shopify.com/t/bank-deposit-payment-option-not-showing-hidden-bad-for-wholesale/187744",
      },
      {
        platform: "Shopify",
        title: "Can't find or add PayPal as a payment method",
        date: "Jun 25, 2025",
        href: "https://community.shopify.com/t/cant-find-or-add-paypal-as-a-payment-method/421057",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping / tax / address friction",
    items: [
      {
        platform: "Shopify",
        title: "Shipping doesn't work",
        date: "Jan 15, 2026",
        href: "https://community.shopify.com/t/shipping-doesnt-work/583883",
      },
      {
        platform: "Shopify",
        title:
          "Cheapest shipping method selected by default without merchant control",
        date: "Mar 11, 2026",
        href: "https://community.shopify.com/t/shopify-must-immediately-fix-this-the-cheapest-shipping-method-should-never-be-the-default-solution/591755",
      },
      {
        platform: "BigCommerce",
        title: "Fix state/zip validation error on country change",
        date: "Jan 5, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "BigCommerce",
        title:
          "Add dynamic postal code validation based on country requirements",
        date: "Jan 2, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "BigCommerce",
        title: "Fixed validation removal on form fields",
        date: "Jan 8, 2026",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "WooCommerce",
        title: "User exists, but password reset says they do not",
        date: "Jan 6, 2026",
        href: "https://wordpress.org/support/topic/user-exists-but-password-reset-says-they-do-not/",
      },
      {
        platform: "Shopify",
        title: "Shipping - Product Dimensions not applying to rates",
        date: "Jan 31, 2025",
        href: "https://community.shopify.com/t/shipping-product-dimensions/391461",
      },
      {
        platform: "Shopify",
        title: "No Orders Since I Moved to Shopify",
        date: "Jun 28, 2025",
        href: "https://community.shopify.com/t/no-orders-since-i-moved-to-shopify/421444",
      },
      {
        platform: "Shopify",
        title:
          "Why is Shopify changing the address after the customer input it correctly?",
        date: "Aug 18, 2024",
        href: "https://community.shopify.com/t/why-is-shopify-changing-the-address-after-the-customer-input-it-correctly/349735/2",
      },
    ],
  },
  {
    id: "email",
    label: "Order confirmation / email failures",
    items: [
      {
        platform: "Wix",
        title: "Wix Stores Order Notification Emails Not Being Delivered",
        date: "Feb 24, 2026",
        href: "https://support.wix.com/en/article/wix-stores-order-notification-emails-not-being-delivered",
      },
      {
        platform: "Wix",
        title: "Wix Stores Digital Product Emails Are Not Sent to Customers",
        date: "Feb 24, 2026",
        href: "https://support.wix.com/en/article/wix-stores-digital-product-emails-are-not-sent-to-customers",
      },
      {
        platform: "WooCommerce",
        title: "Order confirmation emails not sending after successful payment",
        date: "Jan 4, 2026",
        href: "https://wordpress.org/support/topic/order-confirmation-emails-not-sending-after-successful-payment/",
      },
      {
        platform: "WooCommerce",
        title: "Shipping Tracking Email Not Sending Tracking",
        href: "https://wordpress.org/support/topic/shipping-tracking-email-not-sending-tracking/",
      },
      {
        platform: "Shopify",
        title:
          "Order confirmation email still sending default template after editing",
        href: "https://community.shopify.com/t/shopify-order-confirmation-email-is-still-sending-default-template-after-editing-notification-code/583961",
      },
      {
        platform: "Shopify",
        title: "When order is Delivered, emails are not sent",
        href: "https://community.shopify.com/t/when-order-is-delivered-emails-are-not-sent/386732",
      },
      {
        platform: "Wix",
        title: "Notification emails sent to previous business email address",
        date: "Nov 7, 2023",
        href: "https://support.wix.com/en/article/wix-stores-notification-emails-are-sent-to-previous-business-email-address-includes-workaround",
      },
      {
        platform: "Shopify",
        title: "Why is my store sending an outdated order confirmation email?",
        href: "https://community.shopify.com/t/why-is-my-store-sending-an-outdated-order-confirmation-email/150375",
      },
      {
        platform: "Shopify",
        title: "Email informing that order was paid - but it was not",
        href: "https://community.shopify.com/t/email-informing-that-the-order-was-paid-but-it-was-not/395214",
      },
      {
        platform: "WooCommerce",
        title: "WooCommerce customer email not received",
        href: "https://wordpress.org/support/topic/woocommerce-customer-email-not-received/",
      },
    ],
  },
  {
    id: "order-integrity",
    label: "Order integrity failures",
    items: [
      {
        platform: "WooCommerce",
        title: "Order value and quantity incorrect in WooCommerce",
        date: "Jan 23, 2026",
        href: "https://wordpress.org/support/topic/order-value-and-quantity-incorrect-in-woocommerce/",
      },
      {
        platform: "Wix",
        title: "Dashboard displays duplicate modifiers in order details",
        date: "Feb 22, 2026",
        href: "https://support.wix.com/en/article/restaurant-orders-dashboard-displays-duplicate-modifiers-in-order-details",
      },
      {
        platform: "Wix",
        title: "Completed orders not appearing in the Orders tab",
        href: "https://support.wix.com/en/article/completed-orders-not-appearing-in-the-orders-tab",
      },
      {
        platform: "WooCommerce",
        title: "Order sync problems",
        date: "Apr 23, 2025",
        href: "https://wordpress.org/support/topic/apparent-sync-problems/",
      },
      {
        platform: "BigCommerce",
        title:
          "Customer account shows incorrect quantity vs. Order details page",
        date: "Oct 18, 2024",
        href: "https://github.com/bigcommerce/cornerstone/blob/master/CHANGELOG.md",
      },
      {
        platform: "Magento",
        title: "Old random orders associated to newly registered customer",
        date: "Dec 22, 2021",
        href: "https://magento.stackexchange.com/questions/351178/some-old-random-orders-are-associated-to-newly-registered-customer-magento-2-3-5",
      },
      {
        platform: "Magento",
        title: "Items are missing on Order Details Page",
        date: "2021",
        href: "https://magento.stackexchange.com/questions/344396/items-are-missing-on-order-details-page",
      },
      {
        platform: "PrestaShop",
        title: "PrestaShop splitting orders using deleted delivery addresses",
        date: "May 19, 2021",
        href: "https://forum.prestashop.com/topic/1049013-prestashop-is-splitting-orders-using-deleted-delivery-addresses/",
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory sync / oversell failures",
    items: [
      {
        platform: "WooCommerce",
        title: "Payment gateway succeeds after stock = 0 - potential oversell",
        date: "Mar 14, 2026",
        href: "https://wordpress.org/support/topic/potential-stock-issue-when-payment-gateway-succeeds-after-stock-0/",
      },
      {
        platform: "Square",
        title: "Items with stock show as unavailable with 0 stock on site",
        date: "Sep 14, 2025",
        href: "https://community.squareup.com/t5/Online-Store/Items-in-my-inventory-with-stock-are-showing-up-as-unavailable/m-p/810786",
      },
      {
        platform: "Square",
        title: "Item showing 'Not Available'",
        date: "Jul 4, 2025",
        href: "https://community.squareup.com/t5/Online-Store/Item-in-my-site-showing-quot-Not-Available-quot/m-p/800938",
      },
      {
        platform: "Square",
        title: "Item showing 'Not Available'",
        date: "Sep 16, 2024",
        href: "https://community.squareup.com/t5/Square-Online/Item-in-my-site-showing-quot-Not-Available-quot/m-p/751839",
      },
      {
        platform: "Square",
        title: "Visible items becoming unavailable - changing at will",
        href: "https://community.squareup.com/t5/Square-Online/Visible-Items-Becoming-Unavailable-Changing-at-Will/m-p/776447",
      },
      {
        platform: "Square",
        title: "Customers can add unlimited quantities of a limited-stock item",
        date: "Jan 26, 2026",
        href: "https://community.squareup.com/t5/Online-Store/Customers-can-add-unlimited-quantities-of-a-limited-stock-item/m-p/833303",
      },
      {
        platform: "Square",
        title:
          "How to prevent customers from adding more than one of limited stock",
        date: "Nov 14, 2025",
        href: "https://community.squareup.com/t5/Online-Store/How-to-prevent-customers-from-adding-more-than-one-of-limited/td-p/825258",
      },
      {
        platform: "Square",
        title: "Items are showing as unavailable",
        href: "https://community.squareup.com/t5/Square-Online/Items-are-showing-as-unavailable/td-p/287645",
      },
      {
        platform: "Square",
        title: "Square Online and Square Dashboard not syncing",
        href: "https://community.squareup.com/t5/Troubleshooting/Square-Online-and-Square-Dashboard-Not-Syncing/m-p/275420",
      },
      {
        platform: "Shopify",
        title: "Quantity of products available not updating!",
        date: "Jan 16, 2026",
        href: "https://community.shopify.com/t/quantity-of-products-available-not-updating/584070",
      },
    ],
  },
  {
    id: "privacy",
    label: "Wrong-customer data exposure",
    items: [
      {
        platform: "WooCommerce",
        title: "Customers seeing other customers' orders and personal details",
        date: "Oct 24, 2025",
        href: "https://wordpress.org/support/topic/customers-are-seeing-other-customers-orders-and-personal-details-on-their-accoun/",
      },
      {
        platform: "WooCommerce",
        title: "Customers seeing other customers' details at checkout",
        date: "Jan 5, 2025",
        href: "https://wordpress.org/support/topic/customers-seeing-other-customers-details-at-checkout/",
      },
      {
        platform: "WooCommerce",
        title: "Customers seeing other customers' details in checkout",
        href: "https://wordpress.org/support/topic/customers-seeing-other-customers-details-in-checkout/",
      },
      {
        platform: "WooCommerce",
        title:
          "Woo is showing shipping info and personal details to multiple customers",
        href: "https://wordpress.org/support/topic/woo-is-showing-shipping-info-and-other-personal-details-to-multiple-customers/",
      },
      {
        platform: "Magento",
        title: "Old random orders associated to newly registered customer",
        date: "Dec 22, 2021",
        href: "https://magento.stackexchange.com/questions/351178/some-old-random-orders-are-associated-to-newly-registered-customer-magento-2-3-5",
      },
      {
        platform: "Shopify",
        title: "Why is Shopify displaying the wrong customer name on orders?",
        date: "Nov 27, 2023",
        href: "https://community.shopify.com/t/why-is-shopify-displaying-the-wrong-customer-name-on-orders/272255",
      },
      {
        platform: "Shopify",
        title:
          "Why are customer shipping addresses duplicating on my platform?",
        date: "Feb 4, 2022",
        href: "https://community.shopify.com/c/shopify-discussions/why-are-customer-shipping-addresses-duplicating-on-my-platform/m-p/1475435",
      },
      {
        platform: "Shopify",
        title:
          "Why is Shopify changing the address after the customer input it correctly?",
        date: "Aug 18, 2024",
        href: "https://community.shopify.com/t/why-is-shopify-changing-the-address-after-the-customer-input-it-correctly/349735/2",
      },
      {
        platform: "Shopify",
        title:
          "Customer default address always getting replaced with order shipping address",
        date: "Dec 3, 2020",
        href: "https://community.shopify.com/t/customers-default-address-is-always-getting-replaced-with-order-shipping-address/27003",
      },
    ],
  },
];

/* ─── Platform badge colors ──────────────────────────────────────── */

const platformBadge: Record<string, string> = {
  Shopify: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  BigCommerce: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Magento: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  WooCommerce: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  Wix: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  Square: "bg-slate-500/10 text-slate-700 dark:text-slate-400",
  PrestaShop: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  Squarespace: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-400",
};

/* ─── Evidence card ──────────────────────────────────────────────── */

function EvidenceCard({ item }: { item: EvidenceItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2.5 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${platformBadge[item.platform] ?? "bg-muted text-muted-foreground"}`}
        >
          {item.platform}
        </span>
        {item.date && (
          <span className="text-[10px] text-muted-foreground/60 shrink-0">
            {item.date}
          </span>
        )}
      </div>
      <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground/80 group-hover:text-foreground">
        {item.title}
      </p>
      <div className="mt-auto flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="h-3 w-3 text-muted-foreground" />
      </div>
    </a>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */

const totalReports = evidenceCategories.reduce(
  (acc, c) => acc + c.items.length,
  0,
);
const totalPlatforms = new Set(
  evidenceCategories.flatMap((c) => c.items.map((i) => i.platform)),
).size;

export default function ProofSection() {
  const visibleCategories = evidenceCategories.slice(0, 4);
  const [activeId, setActiveId] = useState(visibleCategories[0].id);
  const activeCategory = visibleCategories.find((c) => c.id === activeId)!;
  const visibleItems = activeCategory.items.slice(0, 4);

  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold">
            Market evidence
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            The same revenue leaks show up in four repeatable patterns.
          </h2>
          <p className="text-muted-foreground mt-4 mx-auto max-w-2xl text-lg leading-relaxed">
            Dated public reports from merchants across Shopify, WooCommerce,
            BigCommerce, Square, Wix, Magento, and others - revenue and
            reputation risks that standard uptime monitoring never catches.
          </p>
        </motion.div>

        {/* Platform logos strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 flex flex-col items-center gap-3"
        >
          <p className="text-xs font-semibold text-muted-foreground/70">
            Confirmed across major commerce platforms
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              {
                name: "Shopify",
                color: "text-[#96bf48]",
                bg: "bg-[#96bf48]/10 border-[#96bf48]/20",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" />
                  </svg>
                ),
              },
              {
                name: "WooCommerce",
                color: "text-[#873EFF]",
                bg: "bg-[#873EFF]/10 border-[#873EFF]/20",
                icon: (
                  <svg
                    viewBox="0 0 184 48"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="M77.4,0c-4.3,0-7.1,1.4-9.6,6.1L56.4,27.6V8.5c0-5.7-2.7-8.5-7.7-8.5s-7.1,1.7-9.6,6.5L28.3,27.6V8.7 c0-6.1-2.5-8.7-8.6-8.7H7.3C2.6,0,0,2.2,0,6.2s2.5,6.4,7.1,6.4h5.1v24.1c0,6.8,4.6,10.8,11.2,10.8s9.6-2.6,12.9-8.7l7.2-13.5v11.4 c0,6.7,4.4,10.8,11.1,10.8s9.2-2.3,13-8.7l16.6-28C87.8,4.7,85.3,0,77.3,0C77.3,0,77.3,0,77.4,0z M108.6,0C95,0,84.7,10.1,84.7,23.8s10.4,23.7,23.9,23.7s23.8-10.1,23.9-23.7C132.5,10.1,122.1,0,108.6,0z M108.6,32.9c-5.1,0-8.6-3.8-8.6-9.1s3.5-9.2,8.6-9.2s8.6,3.9,8.6,9.2S113.8,32.9,108.6,32.9z M159.7,0c-13.5,0-23.9,10.1-23.9,23.8s10.4,23.7,23.9,23.7s23.9-10.1,23.9-23.7S173.2,0,159.7,0z M159.7,32.9 c-5.2,0-8.5-3.8-8.5-9.1s3.4-9.2,8.5-9.2s8.6,3.9,8.6,9.2S164.9,32.9,159.7,32.9z" />
                  </svg>
                ),
              },
              {
                name: "BigCommerce",
                color: "text-[#34313f]",
                bg: "bg-slate-100 border-slate-200",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="M12.645 13.663h3.027c.861 0 1.406-.474 1.406-1.235 0-.717-.545-1.234-1.406-1.234h-3.027c-.1 0-.187.086-.187.172v2.125c.015.1.086.172.187.172zm0 4.896h3.128c.961 0 1.535-.488 1.535-1.35 0-.746-.545-1.35-1.535-1.35h-3.128c-.1 0-.187.087-.187.173v2.34c.015.115.086.187.187.187zM23.72.053l-8.953 8.93h1.464c2.281 0 3.63 1.435 3.63 3 0 1.235-.832 2.14-1.722 2.541-.143.058-.143.259.014.316 1.033.402 1.765 1.48 1.765 2.742 0 1.78-1.19 3.202-3.5 3.202h-6.342c-.1 0-.187-.086-.187-.172V13.85L.062 23.64c-.13.13-.043.359.143.359h23.631a.16.16 0 0 0 .158-.158V.182c.043-.158-.158-.244-.273-.13z" />
                  </svg>
                ),
              },
              {
                name: "Magento",
                color: "text-[#f46f25]",
                bg: "bg-[#f46f25]/10 border-[#f46f25]/20",
                icon: (
                  <svg
                    viewBox="0 0 43 50"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="M21.43 0L0 12.37v24.72l6.12 3.53V15.91l15.27-8.85 15.31 8.85v24.7l6.12-3.52V12.35L21.43 0z M24.47 40.62l-3.06 1.77-3.07-1.76V15.91l-6.12 3.53v24.71l9.18 5.3 9.18-5.3V19.44l-6.12-3.53v24.71z" />
                  </svg>
                ),
              },
              {
                name: "Wix",
                color: "text-[#0C6EFC]",
                bg: "bg-[#0C6EFC]/10 border-[#0C6EFC]/20",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="m0 7.354 2.113 9.292h.801a1.54 1.54 0 0 0 1.506-1.218l1.351-6.34a.171.171 0 0 1 .167-.137c.08 0 .15.058.167.137l1.352 6.34a1.54 1.54 0 0 0 1.506 1.218h.805l2.113-9.292h-.565c-.62 0-1.159.43-1.296 1.035l-1.26 5.545-1.106-5.176a1.76 1.76 0 0 0-2.19-1.324c-.639.176-1.113.716-1.251 1.365l-1.094 5.127-1.26-5.537A1.33 1.33 0 0 0 .563 7.354H0zm13.992 0a.951.951 0 0 0-.951.95v8.342h.635a.952.952 0 0 0 .951-.95V7.353h-.635zm1.778 0 3.158 4.66-3.14 4.632h1.325c.368 0 .712-.181.918-.486l1.756-2.59a.12.12 0 0 1 .197 0l1.754 2.59c.206.305.55.486.918.486h1.326l-3.14-4.632L24 7.354h-1.326c-.368 0-.712.181-.918.486l-1.772 2.617a.12.12 0 0 1-.197 0L18.014 7.84a1.108 1.108 0 0 0-.918-.486H15.77z" />
                  </svg>
                ),
              },
              {
                name: "Square",
                color: "text-foreground",
                bg: "bg-muted border-border",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="M4.01 0A4.01 4.01 0 000 4.01v15.98c0 2.21 1.8 4 4.01 4.01h15.98C22.2 24 24 22.2 24 19.99V4A4.01 4.01 0 0019.99 0H4zm1.62 4.36h12.74c.7 0 1.26.57 1.26 1.27v12.74c0 .7-.56 1.27-1.26 1.27H5.63c-.7 0-1.26-.57-1.26-1.27V5.63a1.27 1.27 0 011.26-1.27zm3.83 4.35a.73.73 0 00-.73.73v5.09c0 .4.32.72.72.72h5.1a.73.73 0 00.73-.72V9.44a.73.73 0 00-.73-.73h-5.1Z" />
                  </svg>
                ),
              },
              {
                name: "PrestaShop",
                color: "text-[#df0067]",
                bg: "bg-[#df0067]/10 border-[#df0067]/20",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-auto fill-current"
                    aria-hidden
                  >
                    <path d="M11.558 1.034C5.174 1.034 0 6.21 0 12.592c0 1.258.201 2.47.574 3.597l.002-.007a12.415 12.415 0 01.53-1.787l.011-.03c.085-.222.179-.442.277-.66l.084-.181c.08-.171.165-.34.253-.507.036-.068.07-.136.108-.203.02-.038.044-.073.064-.11.094-.166.19-.332.29-.493l.075-.114c.125-.195.256-.386.393-.573l.035-.05c.144-.193.295-.38.451-.563l.1-.118c.155-.177.315-.35.481-.517l.099-.097a10.321 10.321 0 01.546-.503c.74-2.48 3.005-4.285 5.686-4.285 1.079 0 2.152.31 3.071.873a6.017 6.017 0 012.211 2.407l.007.015.04.074v.003l.004.002a9.925 9.925 0 011.567 1.198c.04.037.081.071.12.109.002 0 .006.005.007.006l-.002-.006-.001-.004v-.003l.042-.084c.377-2.384 1.43-4.102 2.67-4.102.934 0 1.762.975 2.276 2.476l.005.016.001.002c.145.158.287.331.424.521l.007.01.021.067-.02-.078c-1.542-4.569-5.863-7.857-10.952-7.857zM9.927 5.477C7.586 5.52 5.34 7.132 4.574 9.365l-.012.034a10.14 10.14 0 011.315-.895c2.806-1.656 6.479-1.646 9.278.016-.895-1.653-2.631-2.819-4.5-3.004a5.14 5.14 0 00-.728-.039zm9.834.5a1.36 1.36 0 00-.39.067c-1.265.562-1.719 2.073-2.031 3.303l-.016.072c.365-.62.808-1.215 1.396-1.642.835-.687 2.105-.655 2.916.053.308.326.141.008.031-.22-.342-.75-1.025-1.653-1.906-1.634zM21.67 7.98zm-9.32.335l-1.07 3.27-.002.005-.006.002-4.498 1.112h-.009l4.456 1.087c.105.11.227.205.36.28h.002c.042.024.085.045.129.065l.01.005c.041.018.083.033.126.047l.021.008c.04.013.08.023.12.032l.033.008a1.677 1.677 0 00.318.033 1.546 1.546 0 001.43-.948c.08-.186.123-.39.123-.604v-.011l-.001-.012c-.001-.054-.004-.107-.01-.16l-.001-.002a1.506 1.506 0 00-.026-.153l-.001-.004a1.511 1.511 0 00-.096-.288v-.003a1.521 1.521 0 00-.348-.49v-.003zm3.148.626c.048 1.008.036 2.046-.1 3.057-.17 2.018-1.19 3.798-1.972 5.616l-.03.08-.035.086c1.51-1.522 3.17-3.04 3.969-5.082.383-.636.118-1.342-.115-1.976-.17-.877-1.069-1.278-1.717-1.781zm6.172.572l-.588 2.688a1.764 1.764 0 00-.047.2c-.002.02-.007.04-.01.06a1.76 1.76 0 00-.016.222l-.002.031h.003c0 .628.297 1.136.663 1.137a.41.41 0 00.182-.045l.027-.015a.537.537 0 00.07-.047c.013-.01.024-.022.036-.033a.752.752 0 00.137-.168l.03-.054a1.23 1.23 0 00.052-.108l.017-.04c.02-.053.038-.108.053-.166l.002-.002.001-.003.404-.451-.407-.456v.001l-.02-.063zm-4.381.856c.69 1.716.85 3.707.091 5.43-.49 1.368-1.587 2.463-1.874 3.905.73.115 1.468.176 2.21.186 2.166.029 4.332-.42 6.284-1.365-2.04-2.869-4.121-5.755-6.711-8.156zm-4.948.977a.583.583 0 110 1.166.583.583 0 010-1.166zm9.352.37c.138 0 .249.19.249.426s-.111.426-.249.426c-.137 0-.248-.19-.248-.426 0-.235.11-.426.248-.426zm-4.044.184c-.016.112-.033.209-.05.29l-.006.023c-.01.05-.022.094-.033.128-.48 1.417-1.275 2.52-2.36 3.697-.147.16-.301.32-.459.484a58.883 58.883 0 01-1.196 1.205c-.112.11-.259.261-.425.436-.103.287-.22.61-.318.95-.044-.016-.086-.031-.131-.049-2.108-.815-3.519-1.904-3.519-1.904s1.086 1.414 2.915 2.74c.177.129.351.24.522.339-.075 1.194.452 2.34 2.83 2.682a4.81 4.81 0 001.228.008l-.01-.029a.062.062 0 00-.004-.01s-.167-.133-.379-.377a3.842 3.842 0 01-.584-.897 3.382 3.382 0 01-.266-.862 3.176 3.176 0 01-.006-.972c.017-.12.04-.241.072-.366.093-.374.255-.772.507-1.192l.002-.003.241-.404c1.103-1.86 1.797-3.275 1.506-5.441a8.943 8.943 0 00-.078-.476zm4.668.576zm.013.203l.003.036v.01c0 .013-.003.025-.003.038 0-.014.003-.028.003-.043 0-.014-.002-.026-.003-.04zm-.012.275v.001l-.002.01-.002.014.004-.025zm1.353 5.928c-2.553 1.138-5.44 1.44-8.192 1.007-.14 1.108.384 2.218 1.214 2.93l.012.01c2.703-.433 4.975-2.168 6.966-3.946z" />
                  </svg>
                ),
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${p.color} ${p.bg}`}
              >
                {p.icon}
                {p.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            {
              value: String(visibleCategories.length),
              label: "priority failure patterns",
            },
            {
              value: `${totalReports}+`,
              label: "source reports in the library",
            },
            { value: `${totalPlatforms}`, label: "platforms affected" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-primary">
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Split panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-6 rounded-2xl border border-border bg-muted/40 p-1 md:flex-row"
        >
          {/* Left - category list */}
          <div className="md:w-72 shrink-0">
            <div className="flex flex-col gap-0.5 p-2 md:sticky md:top-24">
              {/* Mobile: horizontal scroll */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 md:hidden">
                {visibleCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveId(cat.id)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeId === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Desktop: vertical list */}
              {visibleCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={`hidden md:flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all ${
                    activeId === cat.id
                      ? "bg-background shadow-sm font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  <span className="leading-snug">{cat.label}</span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors ${
                      activeId === cat.id
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right - evidence cards */}
          <div className="flex-1 rounded-xl bg-background p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <p className="mb-4 text-xs font-semibold text-muted-foreground">
                  {activeCategory.label}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {visibleItems.map((item, i) => (
                    <EvidenceCard key={i} item={item} />
                  ))}
                </div>
                {activeCategory.items.length > visibleItems.length && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Showing the clearest {visibleItems.length} examples. The
                    full source library stays available for deeper diligence.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-xs text-muted-foreground/50">
          All reports are public, dated, and linked to original sources.
        </p>
      </div>
    </section>
  );
}
