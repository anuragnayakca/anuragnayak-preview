import { EmailMessage } from 'cloudflare:email';

const safe = (value, max = 1500) => String(value ?? '')
  .replace(/[\r\n]+/g, ' ')
  .replace(/[<>]/g, '')
  .trim()
  .slice(0, max);

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    if (request.headers.get('x-contact-key') !== env.CONTACT_SHARED_SECRET) return new Response('Forbidden', { status: 403 });

    const d = await request.json();
    const name = safe(d.name, 100);
    const email = safe(d.email, 160);
    const topic = safe(d.topic, 100);
    const province = safe(d.province, 60);
    const visitorType = safe(d.visitor_type, 60);
    const message = safe(d.message, 1500);

    const subject = `Website inquiry: ${topic} — ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Province: ${province}`,
      `Visitor type: ${visitorType}`,
      `Topic: ${topic}`,
      '',
      'Message:',
      message
    ].join('\n');

    const raw = [
      `From: Website <${env.FROM_EMAIL}>`,
      `To: ${env.TO_EMAIL}`,
      `Reply-To: ${email}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset=UTF-8',
      '',
      text
    ].join('\r\n');

    await env.EMAIL.send(new EmailMessage(env.FROM_EMAIL, env.TO_EMAIL, raw));
    return new Response('ok');
  }
};
