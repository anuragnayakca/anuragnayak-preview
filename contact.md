---
layout: default
title: Contact
seo_title: "Contact Anurag Nayak | Insurance Advisor"
description: "Contact Anurag Nayak about insurance, workplace benefits, business needs, policy reviews or eligible investment options in BC, AB and ON."
permalink: /contact/
---
<section class="page-hero"><div class="container narrow">{% include breadcrumbs.html %}<p class="eyebrow">CONTACT</p><h1>Start with your question, not a product name.</h1><p class="lede">Use the form for a general inquiry, or book a consultation if you would rather choose a time directly.</p></div></section>
<section class="section contact-section"><div class="container contact-grid"><div class="contact-copy"><p class="eyebrow">GET IN TOUCH</p><h2>A short message is enough.</h2><p>Please do not send medical information, Social Insurance Numbers, policy numbers, account numbers, passwords or detailed financial balances through this form.</p><a class="email-link" href="mailto:{{ site.data.site.email }}">{{ site.data.site.email }}</a><a class="phone-link" href="{{ site.data.site.phone_href }}">{{ site.data.site.phone }}</a><p class="license">{{ site.data.site.licensing_disclosure }}</p><a class="btn outline-dark" href="/book/">Book a Consultation</a></div>
<form class="contact-form" action="/api/contact" method="post" data-contact-form novalidate>
  <div class="form-row"><label>Name<input name="name" type="text" autocomplete="name" required maxlength="100"></label><label>Email<input name="email" type="email" autocomplete="email" required maxlength="160"></label></div>
  <div class="form-row"><label>Province<select name="province" autocomplete="address-level1" required><option value="">Select province</option><option>British Columbia</option><option>Alberta</option><option>Ontario</option><option>Other</option></select></label><label>Visitor type<select name="visitor_type" required><option value="">Select one</option><option>Professional</option><option>Business Owner</option><option>Family</option><option>Other</option></select></label></div>
  <label>Topic of interest<select name="topic" required><option value="">Select a topic</option><option>Personal Insurance</option><option>Business Insurance</option><option>Employee Benefits</option><option>Workplace Benefits</option><option>Registered Investment Options</option><option>Non-Registered Investment Options</option><option>Insurance Policy Review</option><option>Other</option></select></label>
  <label>Short message <small>Do not include sensitive personal, medical or account information.</small><textarea name="message" rows="6" maxlength="1500" required></textarea></label>
  <label class="honeypot" aria-hidden="true">Leave this field empty<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>
  <label class="consent"><input type="checkbox" name="consent" value="yes" required><span>I consent to being contacted in response to this inquiry. I understand this does not subscribe me to marketing messages.</span></label>
  {% if site.data.site.turnstile_site_key and site.data.site.turnstile_site_key != '' %}<div class="cf-turnstile" data-sitekey="{{ site.data.site.turnstile_site_key }}"></div>{% endif %}
  <button class="btn primary" type="submit">Send Message</button><p class="form-status" data-form-status role="status" aria-live="polite"></p>
</form></div></section>
{% if site.data.site.turnstile_site_key and site.data.site.turnstile_site_key != '' %}<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>{% endif %}