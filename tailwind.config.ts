import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      transitionDuration: {
        card: 'var(--card-duration)',
        'card-half': 'calc(var(--card-duration) / 2)'
      },
      cursor: {
        auto: "url('/default-cursor.svg') 6 6, auto",
        pointer: "url('/pointer-cursor.svg') 6 6, pointer",
        grab: "url('/grab-cursor.svg') 6 6, grab",
        grabbing: "url('/grabbing-cursor.svg') 6 6, grabbing"
      }
    }
  },
  plugins: []
} satisfies Config;
