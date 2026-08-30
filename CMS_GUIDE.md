# Content editing guide

The site separates routine content from layout code so normal wording and article changes can be made through Decap CMS after the one-time GitHub OAuth setup is complete.

## CMS URL

`https://anuragnayak.ca/admin/`

Sign in with a GitHub account that has permission to edit the website repository.

## Homepage

Open **Site Content → Homepage** to edit:

- hero headline, positioning line and supporting detail
- current-picture review points
- Professionals, Business Owners and Families cards
- interactive service-explorer content
- Business Owners spotlight
- three-step consultation process
- From Technology to Financial Clarity / corporate IT section
- homepage FAQ
- final CTA

## Contact and business settings

Open **Site Content → Contact & Business Settings** to edit:

- public title
- licensing wording
- email and phone
- booking link
- LinkedIn / Facebook / optional Instagram
- meeting wording
- portrait/headshot
- social-sharing image
- optional Turnstile site key

## Audience and service pages

Use **Audience Pages** for Professionals, Business Owners and Families.

Use **Service Pages** for Personal Insurance, Insurance for Business Owners, Employee Benefits, Registered Investment Options, Non-Registered Investment Options and Insurance Policy Reviews.

Review areas, limitations, FAQs, related links and page copy are editable.

## Articles

Open **Insights** to edit the five launch articles or create a new article.

The editorial workflow supports draft, review and publish states. New financial content should be reviewed before **Publish on website** is enabled.

Article fields include title, date, excerpt, category, tags, featured image and alt text, SEO fields, reading time and body content.

## Publishing

Publishing in Decap CMS commits the changed content file to GitHub. Cloudflare Pages detects the commit and automatically rebuilds the website.

## Restoring an earlier version

GitHub keeps the complete commit history. An earlier file can be restored or the relevant commit can be reverted.

## One-time CMS authentication setup

The GitHub backend uses `cloudflare/cms-oauth-worker.js`.

1. Create a GitHub OAuth App for the website editor.
2. Use `https://cms-auth.anuragnayak.ca/callback` as the callback URL.
3. Deploy the Worker and route `cms-auth.anuragnayak.ca/*` to it.
4. Store `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as Worker secrets.
5. Set `ALLOWED_ORIGIN=https://anuragnayak.ca`.
6. Confirm `admin/config.yml` points to the deployed OAuth Worker.
7. Test create, edit, preview, publish and unpublish before relying on the CMS for production editing.
