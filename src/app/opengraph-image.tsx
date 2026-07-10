import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site-config';

export const alt = 'Daffa Azhar website preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#f4f4f1',
        color: '#111111',
        padding: '56px 64px',
        fontFamily: 'sans-serif',
        justifyContent: 'space-between',
        flexDirection: 'column',
        border: '1px solid #cecec8',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#62625e',
        }}
      >
        Daffa Azhar
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
        <div style={{ display: 'flex', fontSize: 78, lineHeight: 0.98, fontWeight: 700 }}>
          Software engineer building dependable digital products.
        </div>
        <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.4, color: '#62625e' }}>
          Selected work, technical writing, and operational notes from interface to infrastructure.
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            width: 96,
            height: 96,
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111111',
            color: '#f5f5f1',
            fontSize: 30,
            letterSpacing: '0.08em',
          }}
        >
          {siteConfig.monogram}
        </div>
        <div
          style={{
            display: 'flex',
            padding: '12px 18px',
            background: '#f2e533',
            color: '#111111',
            fontSize: 24,
          }}
        >
          {siteConfig.location}
        </div>
      </div>
    </div>,
    size,
  );
}
