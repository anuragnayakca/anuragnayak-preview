import { EmailMessage } from "cloudflare:email";
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Method not allowed',{status:405});
    if (request.headers.get('X-Contact-Key') !== env.CONTACT_SHARED_SECRET) return new Response('Forbidden',{status:403});
    const d=await request.json();
    const subject=`Website inquiry: ${d.topic} - ${d.firstName} ${d.lastName}`;
    const text=[`Name: ${d.firstName} ${d.lastName}`,`Email: ${d.email}`,`Phone: ${d.phone || 'Not provided'}`,`Province: ${d.province}`,`Topic: ${d.topic}`,'', 'Message:', d.message || '(none)'].join('\n');
    const raw=[`From: Website <${env.FROM_EMAIL}>`,`To: ${env.TO_EMAIL}`,`Reply-To: ${d.email}`,`Subject: ${subject}`,'Content-Type: text/plain; charset=UTF-8','',text].join('\r\n');
    await env.EMAIL.send(new EmailMessage(env.FROM_EMAIL, env.TO_EMAIL, raw));
    return new Response('ok');
  }
};
