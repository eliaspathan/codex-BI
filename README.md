# DealDrop

A self-contained, responsive deals-discovery storefront. Open `index.html` directly in a browser, or serve this directory with any static web host. No installation or build is required. Monitor product photos load from external retailers; labeled illustrations remain when no match was found.

## Included

- Search, retailer and category filters, an under-$25 toggle, and discount/price/dollar-savings sorting.
- Saved preview items using browser-local storage, product detail dialogs, and responsive layouts.
- Official offers links for Amazon, Walmart, Walgreens, Target, Costco, BJ’s, CVS, Best Buy, and eBay.
- A verified-deals mode that opens by default. Its catalogue is currently empty while retailer data access is pending.
- Twelve clearly labeled sample products in a separate Preview examples mode. These prices are illustrative and are not represented as current retailer offers.

The verified eligibility rule excludes nonpositive or regular prices, unknown retailers, unavailable products, expired offers, future check times, and checks more than 24 hours old. The selection is capped at ten items per store.

## DealNews

The embedded DealNews section and its network loader are commented out for now. Reconnecting it requires preserving original publisher content, order, links, referral codes, and visible attribution. No remote feed request is needed to render the page.

## Verify

With Node.js 18 or later:

```
node test.cjs
```

The checks cover the initial verified-only state, preview labels, search, store/category/budget filters, saved items, retailer coverage, price and expiry rules, standalone assets, and the disabled DealNews section. They use a small DOM stand-in; they are not browser tests.

## Next integration work

Connect an authorized retailer product feed on a server, normalize verified offers with a per-product check time, and refresh them on a schedule. Do not expose API keys in this HTML or commit secrets. No live feed, payment service, or backend is connected in this version.

## Monitor picks

The imported monitor list groups products by shared category, with known prices sorted low to high. Percentage-only and unspecified prices appear last. Available and Sold figures and Deal expires dates come from the supplied monitor list and are not independently verified. Items outside their listed dates or without a positive reported available quantity stay hidden. Dates use America/New_York and refresh every minute. Product photos are representative when a variant or model was not specified; three unmatched entries use labeled illustrations.

## November 13, 2026 cleanup

Removed eleven monitor rows with listed deal end dates of November 12, 2026. The remaining twenty-five rows have positive reported quantities and listed end dates on or after the cleanup date. No zero-stock rows were present in this supplied snapshot. Calendar dates, inclusive end dates in America/New_York, positive whole-item quantities, and explicit unavailable/out-of-stock flags are validated at display time. The list is re-evaluated every minute and when the tab changes visibility. Reported stock is not live retailer inventory and has not been independently verified.

## Verified Amazon listings

The Amazon page now publishes only fresh, explicitly verified discounted products with confirmed availability. No Amazon product is currently verified, so the page shows an empty state. The prior nineteen product/suggestion links are preserved in `amazon-picks-pending.json` for review; the page never loads that queue.

To publish a record in `verifiedProducts` in `amazon-picks.html`, provide its confirmed ASIN, name and category, USD price and reference price, `inStock: true`, `status: "verified"`, `sourceType: "live"`, a `checkedAt` timestamp less than one hour old, its clean untagged Amazon `/dp/ASIN` source URL, and the corresponding tagged affiliate URL. Cached/search/email snapshots do not qualify. Known expired offers, missing/invalid checks, unavailable products, regular prices and mismatched product links are rejected. Exact quantity may remain unknown when availability is confirmed; a reported quantity must be a positive whole number.

The list is checked at load, every minute, and on visibility changes. It is capped at ten Amazon products and grouped by category. The existing CSS is unchanged. This is a publication guard, not an automated Amazon data connection or a statement that any pending product was verified.

Run `node test-amazon.cjs` to verify this guard. Existing main-page tests remain `node test.cjs`.
