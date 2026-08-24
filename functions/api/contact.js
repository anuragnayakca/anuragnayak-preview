const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=UTF-8', 'cache-control': 'no-store' }
});

const redirectThankYou = () => new Response(null, {
  status: 303,
  headers: { location: '/thank-you/', 'cache-control': 'no-store' }
});

const htmlError = (message, status = 400) => new Response(`<!doctype html><html lang="en-CA"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contact form</title><body style="font-family:system-ui,sans-serif;max-width:720px;margin:60px auto;padding:0 20px;line-height:1.6"><h1>We could not send that message.</h1><p>${message}</p><p><a href="/contact/">Return to the contact page</a> or email <a href="mailto:contact@anuragnayak.ca">contact@anuragnayak.ca</a>.</p></body></html>`, {
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

    const allowedProvinces = ['British Columbia', 'Alberta', 'Ontario', 'Other'];
    const visitorTypes = ['Professional', 'Business Owner', 'Family', 'Other'];
    if (!allowedProvinces.includes(data.province) || !visitorTypes.includes(data.visitor_type)) return fail('Invalid selection.');

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

    if (!env.CONTACT_WORKER) return fail('Contact delivery is not configured yet. Please email contact@anuragnayak.ca.', 503);

    const delivery = await env.CONTACT_WORKER.fetch('https://contact-worker.internal/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-contact-key': env.CONTACT_SHARED_SECRET || '' },
      body: JSON.stringify(data)
    });
    if (!delivery.ok) return fail('The message could not be delivered. Please email contact@anuragnayak.ca.', 502);

    return succeed();
  } catch (error) {
    return fail('The form could not be processed. Please try again or email contact@anuragnayak.ca.');
  }
}
