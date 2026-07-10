import test from 'node:test';
import assert from 'node:assert/strict';

import {
  readNavigationHrefs,
  readSourceFile,
  validateNavigationHrefs,
} from '../scripts/lib/content-audit.mjs';

test('site URL helper keeps production default canonical', async () => {
  const source = await readSourceFile('src/lib/site-url.ts');

  assert.match(source, /https:\/\/dapu\.my\.id/);
  assert.match(source, /http:\/\/localhost:3000/);
  assert.match(source, /localhost is not allowed for production SEO output/);
});

test('navigation links resolve to known public routes', async () => {
  const hrefs = await readNavigationHrefs();
  const knownRoutes = new Set([
    '/work',
    '/writing',
    '/notes',
    '/about',
    '/index',
    '/rss.xml',
    '/resume',
  ]);

  assert.doesNotThrow(() => validateNavigationHrefs(hrefs, knownRoutes));
});

test('sitemap uses absolute URL helper and includes /index', async () => {
  const source = await readSourceFile('src/app/sitemap.ts');

  assert.match(source, /getSiteUrl/);
  assert.match(source, /'\/index'/);
  assert.doesNotMatch(source, /localhost:3000/);
});
