# Production launch checklist

This package is intentionally configured as a crawler-blocked preview.

Before connecting `anuragnayak.ca`:

1. Replace `robots.txt` with:

```text
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /thank-you/

Sitemap: https://anuragnayak.ca/sitemap.xml
```

2. Remove the site-wide `X-Robots-Tag: noindex, nofollow` line from `_headers`. Keep `/admin/*` noindex.
3. Confirm the canonical URL and site URL are `https://anuragnayak.ca`.
4. Test all redirects in `_redirects`.
5. Configure and test Decap CMS OAuth.
6. Configure contact email delivery, optional Turnstile and optional rate-limit KV binding.
7. Confirm the booking link is `https://booknow.anuragnayak.ca/discovery`.
8. Complete the internal review items in `COMPLIANCE_CHECKLIST.md`.
9. Test keyboard navigation, 200% zoom, reduced motion and widths 320, 375, 390, 768, 1024, 1280 and 1440 px.
10. Verify the mobile menu both with JavaScript enabled and disabled.
11. Test contact submission with JavaScript enabled and with a native HTML form submission.
12. Run Lighthouse or equivalent audits on Home, About, Professionals, Business Owners, Personal Insurance, Employee Benefits, Insights, Book and Contact.
13. Validate structured data, canonical tags, Open Graph metadata and sitemap.
14. Confirm `https://anuragnayak.ca/assets/images/social-card.png` returns 200 after the domain switch.
15. Submit the production sitemap to Google Search Console and refresh the homepage in LinkedIn Post Inspector after launch.
