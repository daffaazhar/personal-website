const DEFAULT_DEVELOPMENT_SITE_URL = 'http://localhost:3000';
const DEFAULT_PRODUCTION_SITE_URL = 'https://dapu.my.id';

function isSupportedProtocol(protocol: string) {
  return protocol === 'http:' || protocol === 'https:';
}

function normalizeSiteUrl(value: string, source: string) {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`[site-url] ${source} must be a valid absolute URL.`);
  }

  if (!isSupportedProtocol(parsed.protocol)) {
    throw new Error(`[site-url] ${source} must use http or https.`);
  }

  if (process.env.NODE_ENV === 'production' && parsed.hostname === 'localhost') {
    throw new Error('[site-url] localhost is not allowed for production SEO output.');
  }

  parsed.pathname = '';
  parsed.search = '';
  parsed.hash = '';

  return parsed.toString().replace(/\/$/, '');
}

export function getSiteOrigin() {
  const override = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (override) {
    return normalizeSiteUrl(override, 'NEXT_PUBLIC_SITE_URL');
  }

  if (process.env.NODE_ENV === 'production') {
    return normalizeSiteUrl(DEFAULT_PRODUCTION_SITE_URL, 'production default site URL');
  }

  return normalizeSiteUrl(DEFAULT_DEVELOPMENT_SITE_URL, 'development default site URL');
}

export function getSiteUrl(path = '/') {
  return new URL(path, `${getSiteOrigin()}/`).toString();
}

export function getSiteUrlObject(path = '/') {
  return new URL(getSiteUrl(path));
}
