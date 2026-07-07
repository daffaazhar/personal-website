import { getArticles } from '@/lib/content/writing';

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const items = getArticles()
    .map(
      (article) => `<item>
      <title>${escapeXml(article.title)}</title>
      <description>${escapeXml(article.description)}</description>
      <link>${baseUrl}/writing/${article.slug}</link>
      <guid>${baseUrl}/writing/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Daffa Azhar</title>
    <description>Draft writing feed. TODO: Replace seed content before publishing.</description>
    <link>${baseUrl}</link>
    ${items}
  </channel>
</rss>`,
    {
      headers: {
        'content-type': 'application/rss+xml; charset=utf-8',
      },
    },
  );
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
