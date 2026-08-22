# Build notes

## What this redesign changes
- Repositions the site around **From Technology to Financial Clarity**.
- Uses the public title **Insurance Advisor**.
- Uses licensing language limited to British Columbia, Alberta and Ontario.
- Centralizes the booking URL as `https://booknow.anuragnayak.ca/discovery` in `_data/site.yml`.
- Adds standalone Insurance, Workplace Benefits, Registered Savings, Business Protection, About, Insights, Contact, Privacy and Terms pages.
- Replaces invented financial-dashboard figures with an abstract complexity-to-clarity visual built entirely in CSS.
- Keeps Jekyll's static architecture and moves deployment assumptions from Netlify to Cloudflare Pages.
- Replaces the Netlify-specific contact workflow with a Cloudflare Pages Function plus optional Turnstile and an Email Service Worker.
- Leaves Decap CMS content structure in place, but the `/admin` login must be reconnected using GitHub OAuth outside Netlify.

## Existing content deliberately not copied into the new build
The two existing corporate-insurance articles contain specific premium/tax examples and broad tax/CDA language that should be compliance-reviewed before republishing. They remain safe in the current GitHub `main` history and have not been silently rewritten or deleted in this build package.

## QA performed
- YAML front matter parsed successfully.
- Key HTML files passed Python HTML parser sanity checks.
- Search confirmed the rebuild does not contain old booking URLs, the old `Financial Security Advisor` title, "Virtual across Canada", "Serving all of Canada", invented hero values, or the prior absolute DI/CDA phrases.
- Full `jekyll build` could not be executed in the local artifact environment because Jekyll/Bundler executables are not installed and external package installation is disabled. Cloudflare Pages will install Gemfile dependencies during its build.

## GitHub status
A feature branch named `redesign/cloudflare-jekyll-v1` was requested through the connected GitHub integration, but GitHub returned HTTP 403 (`Resource not accessible by integration`). No writes were made to `main`.
