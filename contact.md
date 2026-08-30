---
layout: default
title: Contact
seo_title: "Contact Anurag Nayak | Insurance Advisor"
description: "Contact Anurag Nayak about personal insurance, insurance for business owners, employee or workplace benefits, policy reviews and eligible investment options in BC, AB and ON."
permalink: /contact/
last_modified_at: 2026-08-30
---
<section class="page-hero"><div class="container narrow">{% include breadcrumbs.html %}<p class="eyebrow">CONTACT</p><h1>Start with your question, not a product name.</h1><p class="lede">Use the form for a general inquiry, or book a consultation if you would rather choose a time directly.</p></div></section>
<section class="section contact-section"><div class="container contact-grid"><div class="contact-copy"><p class="eyebrow">GET IN TOUCH</p><h2>A short message is enough.</h2><p>Please do not send medical information, Social Insurance Numbers, policy numbers, account numbers, passwords or detailed financial balances through this form.</p><a class="email-link" href="mailto:{{ site.data.site.email }}">{{ site.data.site.email }}</a><a class="phone-link" href="{{ site.data.site.phone_href }}">{{ site.data.site.phone }}</a><p class="license">{{ site.data.site.licensing_disclosure }}</p>{% include booking_button.html class="btn primary" label="Book a Consultation" %}</div>
<form class="contact-form" action="/api/contact" method="post" data-contact-form novalidate>
  <div class="form-row">
    <div class="field"><label for="contact-name">Name</label><input id="contact-name" name="name" type="text" autocomplete="name" required maxlength="100"></div>
    <div class="field"><label for="contact-email">Email</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
  </div>
  <div class="form-row">
    <div class="field"><label for="contact-province">Province</label><select id="contact-province" name="province" autocomplete="address-level1" required aria-describedby="province-help"><option value="">Select province</option><option value="bc">British Columbia</option><option value="ab">Alberta</option><option value="on">Ontario</option><option value="other">Other</option></select><p class="field-help" id="province-help">I am licensed in British Columbia, Alberta and Ontario. If you select Other, I will reply, but I may not be able to help directly.</p></div>
    <div class="field"><label for="contact-visitor-type">Visitor type</label><select id="contact-visitor-type" name="visitor_type" required><option value="">Select one</option><option value="professional">Professional</option><option value="business-owner">Business Owner</option><option value="family">Family</option><option value="other">Other</option></select></div>
  </div>
  <div class="field"><label for="contact-topic">Topic of interest</label><select id="contact-topic" name="topic" required><option value="">Select a topic</option><option value="personal-insurance">Personal Insurance</option><option value="business-insurance">Insurance for Business Owners</option><option value="employee-benefits">Employee Benefits</option><option value="workplace-benefits">Workplace Benefits</option><option value="registered-investments">Registered Investment Options</option><option value="non-registered-investments">Non-Registered Investment Options</option><option value="policy-review">Insurance Policy Review</option><option value="other">Other</option></select></div>
  <div class="field"><label for="contact-message">Short message <small>Do not include sensitive personal, medical or account information.</small></label><textarea id="contact-message" name="message" rows="6" maxlength="1500" required></textarea></div>
  <label class="honeypot" aria-hidden="true" for="company-website">Leave this field empty</label><input class="honeypot" id="company-website" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
  <label class="consent" for="contact-consent"><input id="contact-consent" type="checkbox" name="consent" value="yes" required><span>I consent to being contacted in response to this inquiry. I understand this does not subscribe me to marketing messages.</span></label>
  {% if site.data.site.turnstile_site_key and site.data.site.turnstile_site_key != '' %}<div class="cf-turnstile" data-sitekey="{{ site.data.site.turnstile_site_key }}"></div>{% endif %}
  <button class="btn primary" type="submit">Send Message</button><p class="form-status" id="form-status" data-form-status role="status" aria-live="polite"></p>
</form></div></section>
{% if site.data.site.turnstile_site_key and site.data.site.turnstile_site_key != '' %}<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>{% endif %}
