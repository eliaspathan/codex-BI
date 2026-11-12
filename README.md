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
