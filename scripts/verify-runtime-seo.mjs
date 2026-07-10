const baseUrl = process.env.SEO_BASE_URL ?? 'http://127.0.0.1:3000';

const htmlChecks = [
  { path: '/', expectStatus: 200, expectCanonical: 'https://dapu.my.id', expectH1: true },
  { path: '/work', expectStatus: 200, expectCanonical: 'https://dapu.my.id/work', expectH1: true },
  {
    path: '/work/calme',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/work/calme',
    expectH1: true,
    expectJsonLd: true,
  },
  {
    path: '/work/eco-in',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/work/eco-in',
    expectH1: true,
  },
  {
    path: '/work/work-fusion',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/work/work-fusion',
    expectH1: true,
  },
  {
    path: '/writing',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/writing',
    expectH1: true,
  },
  {
    path: '/writing/building-audit-trails-that-survive-service-failure',
    expectStatus: 200,
    expectCanonical:
      'https://dapu.my.id/writing/building-audit-trails-that-survive-service-failure',
    expectH1: true,
    expectJsonLd: true,
  },
  {
    path: '/notes',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/notes',
    expectH1: true,
  },
  {
    path: '/about',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/about',
    expectH1: true,
  },
  {
    path: '/index',
    expectStatus: 200,
    expectCanonical: 'https://dapu.my.id/index',
    expectH1: true,
  },
];

const statusChecks = [
  {
    path: '/resume',
    expectStatus: 308,
    expectLocation: 'https://dapu.my.id/cv-daffa-azhar-putra-utama.pdf',
  },
  { path: '/sitemap.xml', expectStatus: 200 },
  { path: '/robots.txt', expectStatus: 200 },
  { path: '/rss.xml', expectStatus: 200 },
  { path: '/not-a-real-route', expectStatus: 404 },
  { path: '/work/not-a-real-slug', expectStatus: 404 },
  { path: '/writing/not-a-real-slug', expectStatus: 404 },
  { path: '/notes/not-a-real-slug', expectStatus: 404 },
];

function requireMatch(haystack, pattern, label) {
  if (!pattern.test(haystack)) {
    throw new Error(`${label} check failed.`);
  }
}

async function checkHtmlRoute(route) {
  const response = await fetch(`${baseUrl}${route.path}`);
  const html = await response.text();

  if (response.status !== route.expectStatus) {
    throw new Error(`${route.path} returned ${response.status}, expected ${route.expectStatus}.`);
  }

  requireMatch(html, /<title>[^<]+<\/title>/i, `${route.path} title`);
  requireMatch(
    html,
    /<meta\s+name="description"\s+content="[^"]+"/i,
    `${route.path} meta description`,
  );
  requireMatch(
    html,
    new RegExp(
      `<link[^>]+rel="canonical"[^>]+href="${route.expectCanonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
      'i',
    ),
    `${route.path} canonical`,
  );
  requireMatch(html, /<meta\s+property="og:title"/i, `${route.path} open graph`);
  requireMatch(html, /<meta\s+name="twitter:card"/i, `${route.path} twitter`);

  if (route.expectH1) {
    requireMatch(html, /<h1[^>]*>[^<]+<\/h1>/i, `${route.path} h1`);
  }

  if (route.expectJsonLd) {
    requireMatch(html, /application\/ld\+json/i, `${route.path} JSON-LD`);
  }

  if (/localhost:3000/i.test(html)) {
    throw new Error(`${route.path} still contains localhost:3000 in runtime HTML.`);
  }

  if (/TODO:|\[XX\]|\[X\]\+|lorem ipsum/i.test(html)) {
    throw new Error(`${route.path} still contains public placeholder text.`);
  }
}

async function checkStatusRoute(route) {
  const response = await fetch(`${baseUrl}${route.path}`, { redirect: 'manual' });
  const body =
    route.path.endsWith('.xml') || route.path.endsWith('.txt') ? await response.text() : '';

  if (response.status !== route.expectStatus) {
    throw new Error(`${route.path} returned ${response.status}, expected ${route.expectStatus}.`);
  }

  if (route.expectLocation && response.headers.get('location') !== route.expectLocation) {
    throw new Error(
      `${route.path} redirected to ${response.headers.get('location')}, expected ${route.expectLocation}.`,
    );
  }

  if (body && /localhost:3000/i.test(body)) {
    throw new Error(`${route.path} still contains localhost:3000.`);
  }
}

for (const route of htmlChecks) {
  await checkHtmlRoute(route);
}

for (const route of statusChecks) {
  await checkStatusRoute(route);
}

console.log(`Runtime SEO verification passed against ${baseUrl}.`);
