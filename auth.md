# Auth.md

You are an agent. This site provides **publicly accessible** information about GIB-approved e-document solutions in Turkey. No authentication or registration is required to access any content.

## Access Model

This site is a **public information site** — all content is freely accessible without credentials. There are no protected APIs, no OAuth gates, and no registration flow.

**You do not need to register, obtain tokens, or authenticate to:**
- Read and index all pages
- Access `llms.txt`, `sitemap.xml`, or `robots.txt`
- Fetch any page or resource on this domain

## No Registration Required

This site does not implement agentic registration. Agents may access all content directly via standard HTTP GET requests.

- **Authentication:** None required
- **Registration URI:** Not applicable (public site)
- **Token endpoint:** Not applicable
- **Scopes:** Not applicable

## Content Access

All content is served at `https://e-devlethizmetleri.com`. Machine-readable resources:

| Resource | URL | Description |
|---|---|---|
| llms.txt | `/llms.txt` | Site summary for AI agents |
| API Catalog | `/.well-known/api-catalog` | Linkset of available endpoints |
| MCP Server Card | `/.well-known/mcp/server-card.json` | MCP integration info |
| Agent Skills | `/.well-known/agent-skills/index.json` | Available agent skills |
| OAuth Protected Resource | `/.well-known/oauth-protected-resource` | RFC 9728 resource metadata |
| OAuth Authorization Server | `/.well-known/oauth-authorization-server` | Agent auth metadata (no registration required) |
| OpenID Configuration | `/.well-known/openid-configuration` | OIDC discovery (public access) |
| Sitemap | `/sitemap.xml` | All site URLs |
| robots.txt | `/robots.txt` | Bot access rules and Content-Signals |

## Permissions

Per `robots.txt` Content-Signals:
- **Indexing / summarization:** Allowed (`Search: yes`)
- **Training data use:** Not allowed (`AI-Train: no`)

## Agent Auth Block

```yaml
register_uri: https://e-devlethizmetleri.com/auth.md
oauth_protected_resource: https://e-devlethizmetleri.com/.well-known/oauth-protected-resource
oauth_authorization_server: https://e-devlethizmetleri.com/.well-known/oauth-authorization-server
supported_identity_types:
  - public
credential_types: []
```

## Operator

**Umay Tüm Bilişim ve Eğitim Danışmanlık Yazılım Ltd. Şti.**

- Email: bilgi@umaybilisim.com.tr
- Phone: 0 850 777 11 45
- Contact: https://www.e-devlethizmetleri.com/iletisim.html
