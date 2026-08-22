# Cloudflare deployment

## Pages
- Production branch: `main`
- Build command: `bundle exec jekyll build`
- Build output: `_site`
- Environment variable: `RUBY_VERSION=3.3.8` (or another supported recent Ruby version matching the build)

## Preview workflow
Connect the GitHub repository to Cloudflare Pages. Pull-request branches receive preview deployments. Do not move the custom domain until the preview is approved.

## Contact form
The public form posts to `/api/contact`, handled by `functions/api/contact.js`.

Create a separate Worker from `cloudflare/contact-email-worker.js`, onboard `anuragnayak.ca` in Cloudflare Email Service, and bind `EMAIL` as a `send_email` binding. Set Worker variables:
- `FROM_EMAIL` (an address on the onboarded domain)
- `TO_EMAIL=contact@anuragnayak.ca`
- `CONTACT_SHARED_SECRET`

In the Pages project add:
- service binding `CONTACT_WORKER` pointing to that Worker
- secret `CONTACT_SHARED_SECRET` with the same value
- secret `TURNSTILE_SECRET`

Add the Turnstile site key to `_data/site.yml` as `turnstile_site_key`.

## Custom domain
After preview approval, attach `anuragnayak.ca` and `www.anuragnayak.ca`. Preserve existing mail MX records unless intentionally changing email hosting.
