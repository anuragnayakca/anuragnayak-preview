/**
 * Decap CMS GitHub OAuth helper for Cloudflare Workers.
 * Required secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 * Optional env: ALLOWED_ORIGIN (default https://anuragnayak.ca)
 * Route this Worker at https://cms-auth.anuragnayak.ca/* and set that URL in admin/config.yml.
 */
const html = body => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'no-store' } });
const escapeJs = value => JSON.stringify(String(value));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.ALLOWED_ORIGIN || 'https://anuragnayak.ca';

    if (url.pathname === '/auth') {
      if (!env.GITHUB_CLIENT_ID) return new Response('OAuth not configured', { status: 503 });
      const state = crypto.randomUUID();
      const cookie = `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`;
      const github = new URL('https://github.com/login/oauth/authorize');
      github.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      github.searchParams.set('scope', 'repo,user');
      github.searchParams.set('state', state);
      return new Response(null, { status: 302, headers: { location: github.toString(), 'set-cookie': cookie, 'cache-control': 'no-store' } });
    }

    if (url.pathname === '/callback') {
      const cookie = request.headers.get('cookie') || '';
      const savedState = cookie.match(/(?:^|; )decap_oauth_state=([^;]+)/)?.[1] || '';
      const state = url.searchParams.get('state') || '';
      const code = url.searchParams.get('code') || '';
      if (!code || !state || state !== savedState) return new Response('Invalid OAuth state', { status: 400 });

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code })
      });
      const tokenData = await tokenResponse.json();
      if (!tokenData.access_token) return new Response('GitHub OAuth failed', { status: 502 });

      const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
      return html(`<!doctype html><meta charset="utf-8"><title>CMS sign in</title><script>
        (function(){
          const message = 'authorization:github:success:' + ${escapeJs(payload)};
          if (window.opener) window.opener.postMessage(message, ${escapeJs(origin)});
          window.close();
        })();
      </script><p>Authentication complete. You can close this window.</p>`);
    }

    return new Response('Not found', { status: 404 });
  }
};
