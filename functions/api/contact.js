const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=UTF-8', 'cache-control': 'no-store' }
});

const clean = (value, max = 1500) => String(value ?? '')
  .replace(/[<>]/g, '')
  .replace(/[\u0000-\u001F\u007F]/g, ' ')
  .trim()
  .slice(0, max);

const emailOk = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);

export async function onRequestPost({ request, env }) {
  try {
    if ((request.headers.get('content-type') || '').split(';')[0] !== 'application/json') {
      return json({ error: 'Unsupported request.' }, 415);
    }

    const raw = await request.json();
    if (clean(raw.company_website, 200)) return json({ ok: true }); // honeypot

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
    if (required.some(key => !data[key])) return json({ error: 'Please complete the required fields.' }, 400);
    if (!emailOk(data.email)) return json({ error: 'Please enter a valid email address.' }, 400);
    if (data.consent !== 'yes') return json({ error: 'Consent is required so we can respond to your inquiry.' }, 400);

    const allowedProvinces = ['British Columbia', 'Alberta', 'Ontario', 'Other'];
    const visitorTypes = ['Professional', 'Business Owner', 'Family', 'Other'];
    if (!allowedProvinces.includes(data.province) || !visitorTypes.includes(data.visitor_type)) return json({ error: 'Invalid selection.' }, 400);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.FORM_RATE_LIMIT) {
      const key = `contact:${ip}`;
      const current = Number(await env.FORM_RATE_LIMIT.get(key) || 0);
      if (current >= 5) return json({ error: 'Too many requests. Please wait before trying again.' }, 429);
      await env.FORM_RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 3600 });
    }

    if (env.TURNSTILE_SECRET) {
      if (!data.turnstile) return json({ error: 'Verification is required.' }, 400);
      const body = new FormData();
      body.append('secret', env.TURNSTILE_SECRET);
      body.append('response', data.turnstile);
      body.append('remoteip', ip);
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
      const result = await verify.json();
      if (!result.success) return json({ error: 'Verification failed. Please try again.' }, 400);
    }

    if (!env.CONTACT_WORKER) return json({ error: 'Contact delivery is not configured yet.' }, 503);

    const delivery = await env.CONTACT_WORKER.fetch('https://contact-worker.internal/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-contact-key': env.CONTACT_SHARED_SECRET || '' },
      body: JSON.stringify(data)
    });
    if (!delivery.ok) return json({ error: 'The message could not be delivered. Please email contact@anuragnayak.ca.' }, 502);

    return json({ ok: true });
  } catch (error) {
    return json({ error: 'The form could not be processed. Please try again or email contact@anuragnayak.ca.' }, 400);
  }
}
