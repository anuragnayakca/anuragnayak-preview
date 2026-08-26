import { EmailMessage } from 'cloudflare:email';


const provinceLabels = { bc: 'British Columbia', ab: 'Alberta', on: 'Ontario', other: 'Other' };
const visitorLabels = { 'professional': 'Professional', 'business-owner': 'Business Owner', family: 'Family', other: 'Other' };
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
    const topicCode = safe(d.topic, 100);
    const provinceCode = safe(d.province, 60);
    const visitorCode = safe(d.visitor_type, 60);
    const topic = topicLabels[topicCode] || topicCode;
    const province = provinceLabels[provinceCode] || provinceCode;
    const visitorType = visitorLabels[visitorCode] || visitorCode;
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
