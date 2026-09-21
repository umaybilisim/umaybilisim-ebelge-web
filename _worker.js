const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/mcp/server-card.json>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="service-doc"',
].join(', ');

const CONTENT_TYPES = {
  '/.well-known/openid-configuration': 'application/json',
  '/.well-known/jwks.json': 'application/json',
  '/.well-known/oauth-protected-resource': 'application/json',
  '/.well-known/oauth-authorization-server': 'application/json',
  '/.well-known/api-catalog': 'application/linkset+json',
  '/.well-known/agent-card.json': 'application/json',
  '/auth.md': 'text/markdown; charset=utf-8',
};

// Sayfa yolu -> Markdown sürümü adayları (/md/...). Sayfa olmayan yollar (css, js, img, .txt, .well-known...) için [] döner.
function markdownCandidates(pathname) {
  let p = pathname;
  try { p = decodeURIComponent(pathname); } catch { /* bozuk kodlama: ham yolu kullan */ }
  if (p.startsWith('/md/') || p.startsWith('/.well-known/') || p.startsWith('/api/')) return [];
  if (/\.[a-z0-9]+$/i.test(p) && !p.endsWith('.html')) return [];
  p = p.replace(/\.html$/, '');
  if (p === '' || p === '/') return ['/md/index.md'];
  if (p.endsWith('/')) return ['/md' + p + 'index.md'];
  return ['/md' + p + '.md', '/md' + p + '/index.md'];
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';
    const candidates = markdownCandidates(url.pathname);

    // Markdown negotiation: Accept: text/markdown isteğine sayfanın kendi Markdown sürümü (/md/...) döner.
    // Ana sayfada Markdown sürümü yoksa llms.txt'e düşer. .md dosyaları doğrudan servis edilir.
    if (accept.includes('text/markdown') && !url.pathname.endsWith('.md')) {
      const order = url.pathname === '/' ? [...candidates, '/llms.txt'] : candidates;
      for (const path of order) {
        try {
          const asset = await env.ASSETS.fetch(new Request(new URL(path, url.origin)));
          // yok/hata veya HTML geri dönüşü (fallback) ise Markdown sayılmaz
          if (!asset.ok || (asset.headers.get('Content-Type') || '').includes('text/html')) continue;
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
          // sonraki adaya geç
        }
      }
    }

    // Serve static asset
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    let link = LINK_HEADER;
    const respType = newHeaders.get('Content-Type') || '';
    if (response.status === 200 && respType.includes('text/html') && candidates.length) {
      link += ', <' + candidates[0] + '>; rel="alternate"; type="text/markdown"';
    }
    newHeaders.set('Link', link);
    newHeaders.set('Vary', 'Accept');
    const ct = CONTENT_TYPES[url.pathname];
    if (ct) newHeaders.set('Content-Type', ct);
    else if (url.pathname.startsWith('/md/') && url.pathname.endsWith('.md')) {
      newHeaders.set('Content-Type', 'text/markdown; charset=utf-8');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
