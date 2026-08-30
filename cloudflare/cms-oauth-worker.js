/**
 * Decap CMS GitHub OAuth proxy for Cloudflare Workers.
 * Required secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 * Optional env: ALLOWED_ORIGIN (default https://www.anuragnayak.ca)
 * Route this Worker at https://cms-auth.anuragnayak.ca/* and set that URL in admin/config.yml.
 */
const html = body => new Response(body, {
  headers: {
    'content-type': 'text/html; charset=UTF-8',
    'cache-control': 'no-store'
  }
});

const escapeJs = value => JSON.stringify(String(value));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.ALLOWED_ORIGIN || 'https://www.anuragnayak.ca';

    if (url.pathname === '/auth') {
      if (!env.GITHUB_CLIENT_ID) return new Response('OAuth not configured', { status: 503 });

      const state = crypto.randomUUID();
      const cookie = `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`;
      const github = new URL('https://github.com/login/oauth/authorize');
      github.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      github.searchParams.set('scope', 'repo,user');
      github.searchParams.set('state', state);

      return new Response(null, {
        status: 302,
        headers: {
          location: github.toString(),
          'set-cookie': cookie,
          'cache-control': 'no-store'
        }
      });
    }

    if (url.pathname === '/callback') {
      const cookie = request.headers.get('cookie') || '';
      const savedState = cookie.match(/(?:^|; )decap_oauth_state=([^;]+)/)?.[1] || '';
      const state = url.searchParams.get('state') || '';
      const code = url.searchParams.get('code') || '';

      if (!code || !state || state !== savedState) {
        return new Response('Invalid OAuth state', { status: 400 });
      }

      if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        return new Response('OAuth not configured', { status: 503 });
      }

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code
        })
      });

      const tokenData = await tokenResponse.json();
      if (!tokenData.access_token) return new Response('GitHub OAuth failed', { status: 502 });

      const successMessage = 'authorization:github:success:' + JSON.stringify({
        token: tokenData.access_token
      });

      return html(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>CMS sign in</title>
</head>
<body>
<p>Completing authentication…</p>
<script>
(function () {
  const allowedOrigin = ${escapeJs(origin)};
  const successMessage = ${escapeJs(successMessage)};

  function receiveMessage(event) {
    if (event.origin !== allowedOrigin) return;

    if (!window.opener) {
      document.body.innerHTML = '<p>Unable to communicate with CMS window.</p>';
      return;
    }

    window.opener.postMessage(successMessage, allowedOrigin);
    window.removeEventListener('message', receiveMessage, false);
    setTimeout(function () { window.close(); }, 250);
  }

  window.addEventListener('message', receiveMessage, false);

  if (window.opener) {
    window.opener.postMessage('authorizing:github', allowedOrigin);
  } else {
    document.body.innerHTML = '<p>Please return to the CMS and try signing in again.</p>';
  }
})();
</script>
</body>
</html>`);
    }

    return new Response('Decap CMS OAuth service', { status: 200 });
  }
};
