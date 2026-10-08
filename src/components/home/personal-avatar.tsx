import Image from 'next/image';

// One original source crop: face, neck, collar and shirt never become separate layers.
export function PersonalAvatar() {
  return (
    <Image
      src="/images/home/daffa-portrait.webp"
      alt="Illustrated Daffa Azhar with short side-swept dark hair and a blue collared shirt"
      width={512}
      height={640}
      sizes="115px"
      unoptimized
      priority
    />
  );
}

export function GreetingWave({ className }: { className?: string }) {
  return (
    <span className={className} data-home-wave aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 96" focusable="false">
        <g
          data-home-wave-hand
          style={{ transformOrigin: '40px 80px' }}
          stroke="#784e3e"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M29 81 L28 70 Q20 63 18 55 L14 43 Q13 39 16 38 Q19 37 21 41 L27 51 L25 29 Q24 24 28 24 Q32 24 32 29 L34 45 L34 21 Q34 16 38 16 Q42 16 42 21 L43 44 L46 24 Q47 19 51 20 Q55 21 54 26 L51 47 L57 33 Q59 29 62 31 Q65 33 63 37 L58 55 Q57 67 50 73 L50 81 Q40 85 29 81Z"
            fill="#efab87"
          />
          <path
            d="M29 81 L28 70 Q21 64 19 57 L26 60 Q31 65 32 71 L34 82 M51 47 L57 33 Q59 30 61 31 L54 53 Q54 66 47 72 L47 82 L50 81 L50 73 Q57 67 58 55Z"
            fill="#d98f6e"
            stroke="none"
          />
          <path
            d="M28 54 Q33 49 39 53 Q44 57 43 66 M34 70 Q40 72 46 68"
            fill="none"
            stroke="#c47d63"
          />
          <path d="M31 35 L32 45 M39 28 L40 44 M49 31 L47 47" fill="none" stroke="#f7c4a5" />
        </g>
      </svg>
    </span>
  );
}
