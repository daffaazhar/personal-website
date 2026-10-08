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

  if (parsed.username || parsed.password) {
    throw new Error(`[site-url] ${source} must not contain URL userinfo credentials.`);
  }

  // URL parsing canonicalizes shorthand/decimal IPv4 and compressed IPv6 first.
  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, '');
  const isLocalHostname =
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === 'localhost.localdomain' ||
    hostname === 'ip6-localhost' ||
    hostname === 'ip6-loopback' ||
    hostname.startsWith('127.') ||
    hostname === '0.0.0.0' ||
    hostname === '[::]' ||
    hostname === '[::1]' ||
    /^\[::ffff:7f[\da-f]{2}:[\da-f]{1,4}\]$/.test(hostname) ||
    hostname === '[::ffff:0:0]';

  if (process.env.NODE_ENV === 'production' && isLocalHostname) {
    throw new Error(
      '[site-url] localhost is not allowed for production SEO output; loopback and unspecified hosts are also forbidden.',
    );
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
