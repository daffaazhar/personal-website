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
        background: '#191d23',
        color: '#e8e9e5',
        padding: '56px 64px',
        fontFamily: 'sans-serif',
        justifyContent: 'space-between',
        flexDirection: 'column',
        border: '1px solid #343b45',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#a5adb8',
        }}
      >
        Daffa Azhar
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
        <div style={{ display: 'flex', fontSize: 72, lineHeight: 1.12, fontWeight: 500 }}>
          Software, from the interface to the infrastructure.
        </div>
        <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.4, color: '#a5adb8' }}>
          Selected work and technical writing from interface to infrastructure.
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
            background: '#e8e9e5',
            color: '#191d23',
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
            background: '#9ab8f3',
            color: '#191d23',
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
