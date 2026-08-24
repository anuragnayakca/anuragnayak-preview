# Build notes — Master Prompt revision

## Strategic changes

- Broadens the professional audience beyond technology while retaining a dedicated section acknowledging Anurag's technology-career familiarity.
- Uses the Master Prompt homepage headline and education-first messaging.
- Replaces product-first primary navigation with Home, About, Who I Help, Services, Insights, Contact and Book a Consultation.
- Creates dedicated nested audience and service routes.
- Leads with the visitor's current financial picture rather than Anurag's analytical background.

## New pages

- `/who-i-help/`
- `/who-i-help/professionals/`
- `/who-i-help/business-owners/`
- `/who-i-help/families/`
- `/services/`
- `/services/personal-insurance/`
- `/services/business-insurance/`
- `/services/employee-benefits/`
- `/services/registered-investments/`
- `/services/non-registered-investments/`
- `/services/policy-reviews/`
- `/book/`
- `/accessibility/`

## Preserved and strengthened

- Jekyll + GitHub + Cloudflare Pages architecture
- Decap CMS approach
- existing professional photograph
- confirmed email, phone and booking destination
- Cloudflare Pages Function contact architecture
- accessibility foundations and responsive design

## Draft publishing policy

The three sample Insights articles are stored in `_posts` with `published: false`, so Jekyll does not publish them until they are reviewed and deliberately enabled.

## Known configuration dependencies

- CMS GitHub OAuth Worker must be configured.
- Contact email Worker/Turnstile must be configured.
- Production crawler blocking must be removed before launch.
- Compliance items listed in `COMPLIANCE_CHECKLIST.md` remain to be confirmed.
