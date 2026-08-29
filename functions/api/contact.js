const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=UTF-8', 'cache-control': 'no-store' }
});

const redirectThankYou = () => new Response(null, {
  status: 303,
  headers: { location: '/thank-you/', 'cache-control': 'no-store' }
});

const htmlError = (message, status = 400) => new Response(`<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Contact form | Anurag Nayak</title><link rel="stylesheet" href="/assets/css/styles.css"></head><body><a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><div class="container nav-wrap"><a class="brand" href="/" aria-label="Anurag Nayak home"><span>Anurag Nayak</span><small>Insurance Advisor</small></a><a class="btn header-cta" href="https://booknow.anuragnayak.ca/discovery" target="_blank" rel="noopener noreferrer">Book a Consultation<span class="sr-only"> (opens in a new tab)</span></a></div></header><main id="main-content"><section class="page-hero"><div class="container narrow"><p class="eyebrow">CONTACT</p><h1>We could not send that message.</h1><p class="lede">${message}</p></div></section><section class="page-content"><div class="container narrow"><p>You can return to the contact page and try again, or email <a href="mailto:contact@anuragnayak.ca">contact@anuragnayak.ca</a>.</p><div class="actions"><a class="btn primary" href="/contact/">Return to Contact</a><a class="btn outline-dark" href="mailto:contact@anuragnayak.ca">Email Anurag</a></div></div></section></main></body></html>`, {
  status,
  headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'no-store' }
});

const clean = (value, max = 1500) => String(value ?? '')
  .replace(/[<>]/g, '')
  .replace(/[\u0000-\u001F\u007F]/g, ' ')
  .trim()
  .slice(0, max);

const emailOk = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);

async function parseRequest(request) {
  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (type === 'application/json') return await request.json();
  if (type === 'application/x-www-form-urlencoded' || type === 'multipart/form-data') {
    return Object.fromEntries((await request.formData()).entries());
  }
  return null;
}

export async function onRequestPost({ request, env }) {
  const wantsJson = request.headers.get('x-requested-with') === 'fetch' || (request.headers.get('accept') || '').includes('application/json');
  const fail = (message, status = 400) => wantsJson ? json({ error: message }, status) : htmlError(message, status);
  const succeed = () => wantsJson ? json({ ok: true }) : redirectThankYou();

  try {
    const raw = await parseRequest(request);
    if (!raw) return fail('Unsupported request.', 415);
    if (clean(raw.company_website, 200)) return succeed(); // honeypot

    const data = {
      name: clean(raw.name, 100),
      email: clean(raw.email, 160).toLowerCase(),
      province: clean(raw.province, 60),
      visitor_type: clean(raw.visitor_type, 60),
      topic: clean(raw.topic, 100),
      message: clean(raw.message, 1500),
      consent: clean(raw.consent, 20),
      turnstile: clean(raw['cf-turnstile-response'], 2048)
    };

    const required = ['name', 'email', 'province', 'visitor_type', 'topic', 'message', 'consent'];
    if (required.some(key => !data[key])) return fail('Please complete the required fields.');
    if (!emailOk(data.email)) return fail('Please enter a valid email address.');
    if (data.consent !== 'yes') return fail('Consent is required so we can respond to your inquiry.');

    const allowedProvinces = ['bc', 'ab', 'on', 'other'];
    const visitorTypes = ['professional', 'business-owner', 'family', 'other'];
    const topics = ['personal-insurance', 'business-insurance', 'employee-benefits', 'workplace-benefits', 'registered-investments', 'non-registered-investments', 'policy-review', 'other'];
    if (!allowedProvinces.includes(data.province) || !visitorTypes.includes(data.visitor_type) || !topics.includes(data.topic)) return fail('Invalid selection.');

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.FORM_RATE_LIMIT) {
      const key = `contact:${ip}`;
      const current = Number(await env.FORM_RATE_LIMIT.get(key) || 0);
      if (current >= 5) return fail('Too many requests. Please wait before trying again.', 429);
      await env.FORM_RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 3600 });
    }

    if (env.TURNSTILE_SECRET) {
      if (!data.turnstile) return fail('Verification is required.');
      const body = new FormData();
      body.append('secret', env.TURNSTILE_SECRET);
      body.append('response', data.turnstile);
      body.append('remoteip', ip);
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
      const result = await verify.json();
      if (!result.success) return fail('Verification failed. Please try again.');
    }

    if (!env.RESEND_API_KEY) return fail('Contact delivery is temporarily unavailable. Please email contact@anuragnayak.ca.', 503);

    const provinceLabels = { bc: 'British Columbia', ab: 'Alberta', on: 'Ontario', other: 'Other' };
    const visitorLabels = { professional: 'Professional', 'business-owner': 'Business Owner', family: 'Family', other: 'Other' };
    const topicLabels = {
      'personal-insurance': 'Personal Insurance',
      'business-insurance': 'Business Insurance',
      'employee-benefits': 'Employee Benefits',
      'workplace-benefits': 'Workplace Benefits',
      'registered-investments': 'Registered Investment Options',
      'non-registered-investments': 'Non-Registered Investment Options',
      'policy-review': 'Insurance Policy Review',
      other: 'Other'
    };

    const subject = `Website inquiry: ${topicLabels[data.topic] || data.topic} — ${data.name}`;
    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Province: ${provinceLabels[data.province] || data.province}`,
      `Visitor type: ${visitorLabels[data.visitor_type] || data.visitor_type}`,
      `Topic: ${topicLabels[data.topic] || data.topic}`,
      '',
      'Message:',
      data.message
    ].join('\n');

    const fromEmail = env.CONTACT_FROM_EMAIL || 'Anurag Nayak Website <website@forms.anuragnayak.ca>';
    const toEmail = env.CONTACT_TO_EMAIL || 'contact@anuragnayak.ca';
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject,
        text
      })
    });
    if (!delivery.ok) {
      console.error('Resend delivery failed', delivery.status, await delivery.text());
      return fail('The message could not be delivered. Please email contact@anuragnayak.ca.', 502);
    }

    return succeed();
  } catch (error) {
    return fail('The form could not be processed. Please try again or email contact@anuragnayak.ca.');
  }
}
