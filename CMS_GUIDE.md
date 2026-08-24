# Content editing guide

The site is structured so routine content can be edited without changing layout code.

## CMS URL

After the GitHub OAuth Worker is configured, open:

`https://anuragnayak.ca/admin/`

Sign in with the GitHub account that has permission to edit the website repository.

## What can be edited

### Homepage
Open **Site Content → Homepage** to edit:
- hero headline and supporting copy
- Start With What You Already Have section
- audience cards
- service cards
- consultation process
- background section
- homepage FAQ
- final CTA

### Contact and business settings
Open **Site Content → Contact & Business Settings** to edit:
- email and phone
- booking link
- social links
- licensing wording
- meeting wording
- headshot and social image
- Turnstile site key

### Audience pages
Open **Audience Pages** to edit Professionals, Business Owners and Families. FAQs and review areas are editable.

### Service pages
Open **Service Pages** to edit service copy, limitations, review points, FAQs and page body.

### Articles
Open **Insights → New Article**. The editorial workflow supports draft, review and publish states. New financial content should remain in the editorial workflow until content and compliance review are complete. Set **Publish on website** to true only when the article is ready to go live.

## Images and alternative text

Upload images through the CMS media field. Write alternative text that describes the useful content of the image rather than repeating the filename.

## Publishing

When content is published, Decap CMS commits the change to GitHub. Cloudflare Pages detects the Git commit and automatically rebuilds the website.

## Restoring an earlier version

GitHub keeps the commit history. If a content change needs to be reversed, restore the earlier file version or revert the relevant Git commit.

## CMS authentication setup

The CMS GitHub backend requires the Cloudflare OAuth helper in `cloudflare/cms-oauth-worker.js`.

1. Create a GitHub OAuth App for the website editor.
2. Use `https://cms-auth.anuragnayak.ca/callback` as the callback URL.
3. Deploy the Worker and route `cms-auth.anuragnayak.ca/*` to it.
4. Store `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as Worker secrets.
5. Set `ALLOWED_ORIGIN=https://anuragnayak.ca`.
6. Confirm `admin/config.yml` points to the final OAuth Worker URL.

**[CONFIRM BEFORE PUBLISHING]** Complete the OAuth setup and test create, edit, preview, publish and unpublish workflows before production launch.
