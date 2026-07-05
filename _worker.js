const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/mcp/server-card.json>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="service-doc"',
].join(', ');

const CONTENT_TYPES = {
  '/.well-known/openid-configuration': 'application/json',
  '/.well-known/jwks.json': 'application/json',
  '/.well-known/oauth-protected-resource': 'application/json',
  '/.well-known/api-catalog': 'application/linkset+json',
  '/auth.md': 'text/markdown; charset=utf-8',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';

    // Markdown negotiation: return llms.txt for text/markdown requests
    // Skip negotiation for .md files — serve them directly
    if (accept.includes('text/markdown') && !url.pathname.endsWith('.md')) {
      const llmsUrl = new URL('/llms.txt', url.origin);
      try {
        const asset = await env.ASSETS.fetch(new Request(llmsUrl));
        const text = await asset.text();
        return new Response(text, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Link': LINK_HEADER,
          },
        });
      } catch {
        // fall through
      }
    }

    // Serve static asset
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Link', LINK_HEADER);
    newHeaders.set('Vary', 'Accept');
    const ct = CONTENT_TYPES[url.pathname];
    if (ct) newHeaders.set('Content-Type', ct);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
