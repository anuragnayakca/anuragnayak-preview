# V13 update package

## Primary change

The public-facing service name is now **Insurance for Business Owners** rather than **Business Insurance**.

This avoids implying broad commercial property/casualty insurance while keeping the service aligned with life and living-benefit planning concepts relevant to business owners.

## Where it changed

- Homepage service explorer
- Services dropdown navigation
- Footer service links
- Services overview page
- Insurance-for-business-owners service page
- Business Owners audience page wording
- Employee Benefits related link
- Contact-page SEO description and topic dropdown
- Contact-form backend readable topic label
- Structured-data service type
- Decap CMS service-page label
- CMS editing guide
- Business-owner Insights article phrasing

## URL decision

The existing route remains:

`/services/business-insurance/`

This is intentional. Changing the public URL would add redirect and indexing work without improving the visitor-facing terminology. The old phrase now survives only as an internal URL slug/machine value.

## CMS OAuth source

The package also updates `cloudflare/cms-oauth-worker.js` to the popup-handshake version that successfully completed GitHub login with Decap CMS.

## Safe deployment model

This package is intended to be overlaid on the **current** repository rather than used to delete and replace the repository. That preserves articles and media added through Decap CMS after V12.
