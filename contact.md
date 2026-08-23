---
layout: default
title: Start With a Conversation
seo_title: "Contact Anurag Nayak"
description: Book a conversation or send a message about insurance, workplace or group benefits, registered savings, business protection or an existing coverage review.
permalink: /contact/
---
<section class="page-hero"><div class="container narrow"><p class="eyebrow">CONTACT</p><h1>Start With a Conversation</h1><p class="lede">Have a question about personal protection, workplace benefits, registered savings, business protection, group benefits or your existing coverage? Start with a conversation.</p></div></section>
<section class="section contact-section"><div class="container contact-grid"><div class="contact-copy"><h2>Choose the easiest way to start.</h2><p>If you already know you would like to speak, book directly. If you have a quick question first, send a message.</p><a class="btn primary" href="{{ site.data.site.booking_url }}">Book a Conversation</a><a class="email-link" href="mailto:{{ site.data.site.email }}">{{ site.data.site.email }}</a>{% if site.data.site.phone %}<a class="email-link" href="{{ site.data.site.phone_href }}">{{ site.data.site.phone }}</a>{% endif %}<p class="license">{{ site.data.site.virtual_line }}</p></div>
<form class="contact-form" data-contact-form action="/api/contact" method="post">
<div class="form-row"><label>First Name<input name="firstName" autocomplete="given-name" required maxlength="80"></label><label>Last Name<input name="lastName" autocomplete="family-name" required maxlength="80"></label></div>
<label>Email<input type="email" name="email" autocomplete="email" required maxlength="160"></label>
<label>Phone <small>optional</small><input type="tel" name="phone" autocomplete="tel" maxlength="40"></label>
<label>Province<select name="province" required><option value="">Select province</option><option>British Columbia</option><option>Alberta</option><option>Ontario</option></select></label>
<label>What would you like to discuss?<select name="topic" required><option value="">Select a topic</option><option>Life Insurance</option><option>Critical Illness Insurance</option><option>Disability Insurance</option><option>Workplace Benefits</option><option>Registered Savings</option><option>Business Protection</option><option>Group Extended Health Benefits</option><option>Business Owner Review</option><option>Existing Policy Review</option><option>Other</option></select></label>
<label>Message<textarea name="message" rows="5" maxlength="1500" placeholder="Please keep this general. Do not include SIN, banking details, policy numbers or medical information."></textarea></label>
<label class="consent"><input type="checkbox" name="consent" required><span>I agree to be contacted regarding my inquiry.</span></label>
{% if site.data.site.turnstile_site_key %}<div class="cf-turnstile" data-sitekey="{{ site.data.site.turnstile_site_key }}"></div>{% endif %}
<button class="btn primary" type="submit">Send Message</button><p class="form-status" role="status" aria-live="polite" data-form-status></p>
</form></div></section>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
