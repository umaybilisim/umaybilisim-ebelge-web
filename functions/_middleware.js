export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('Accept') || '';

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    const llmsUrl = new URL('/llms.txt', url.origin);

    try {
      const mdResponse = await fetch(llmsUrl.toString());
      const text = await mdResponse.text();

      return new Response(text, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch {
      return next();
    }
  }

  const response = await next();
  const newHeaders = new Headers(response.headers);
  newHeaders.set(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog", </.well-known/mcp/server-card.json>; rel="service-doc", </.well-known/agent-skills/index.json>; rel="service-doc"'
  );
  newHeaders.set('Vary', 'Accept');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
