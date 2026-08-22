export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const allowedProvinces = ['British Columbia','Alberta','Ontario'];
    const required = ['firstName','lastName','email','province','topic','consent'];
    if (required.some(k => !String(data[k] || '').trim())) return json({error:'Missing required fields'},400);
    if (!allowedProvinces.includes(data.province)) return json({error:'Invalid province'},400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({error:'Invalid email'},400);
    if ((data.message || '').length > 1500) return json({error:'Message too long'},400);
    const ip = request.headers.get('CF-Connecting-IP') || '';
    if (env.TURNSTILE_SECRET) {
      const token=data['cf-turnstile-response'];
      if(!token) return json({error:'Verification required'},400);
      const body=new FormData(); body.append('secret',env.TURNSTILE_SECRET); body.append('response',token); body.append('remoteip',ip);
      const vr=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body});
      const v=await vr.json(); if(!v.success) return json({error:'Verification failed'},400);
    }
    if (!env.CONTACT_WORKER) return json({error:'Contact service not configured'},503);
    const clean = Object.fromEntries(Object.entries(data).map(([k,v])=>[k, String(v ?? '').replace(/[<>]/g,'').trim()]));
    const result = await env.CONTACT_WORKER.fetch('https://contact-worker.internal/send',{method:'POST',headers:{'Content-Type':'application/json','X-Contact-Key':env.CONTACT_SHARED_SECRET || ''},body:JSON.stringify(clean)});
    if(!result.ok) return json({error:'Delivery failed'},502);
    return json({ok:true},200);
  } catch { return json({error:'Invalid request'},400); }
}
function json(body,status){return new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json','cache-control':'no-store'}})}
