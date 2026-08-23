# Production launch notes

Before connecting `anuragnayak.ca` to this build:

1. Replace the preview `robots.txt` with:

   ```text
   User-agent: *
   Allow: /

   Sitemap: https://anuragnayak.ca/sitemap.xml
   ```

2. Remove the `X-Robots-Tag: noindex, nofollow` line from `_headers`.
3. Confirm the contact form Worker/service binding is live and test a real submission.
4. Submit `https://anuragnayak.ca/sitemap.xml` in Google Search Console.
5. Re-scrape the homepage in LinkedIn Post Inspector after the domain switch.

Do not publish licence numbers unless Anurag explicitly changes that preference.
