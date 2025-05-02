function hexToHSL(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace(/^#/, '');

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

type ColorVariations = {
  borderColor: string;
  buttonColor: string;
  scrollbarColor: string;
};

export function generateColorVariations(primary: string, accent: string): ColorVariations {
  const hsl = hexToHSL(primary);

  // Create border color (darker, more saturated)
  const borderHSL = {
    h: hsl.h,
    s: Math.min(hsl.s + 0.15, 1), // Increase saturation
    l: Math.max(hsl.l - 0.15, 0) // Decrease lightness
  };

  // Create button color (lighter, slightly desaturated)
  let buttonL;
  if (hsl.l <= 0.05) {
    buttonL = Math.min(hsl.l + 0.25, 1);
  } else if (hsl.l >= 0.95) {
    buttonL = Math.max(hsl.l - 0.25, 0);
  } else {
    buttonL = Math.min(hsl.l + 0.1, 0.95);
  }

  const buttonHSL = {
    h: hsl.h,
    s: Math.max(hsl.s - 0.05, 0),
    l: buttonL
  };

  // Convert back to hex
  const borderColor = hslToHex(borderHSL.h, borderHSL.s, borderHSL.l);
  const buttonColor = hslToHex(buttonHSL.h, buttonHSL.s, buttonHSL.l);

  // Create scrollbar color based on accent lightness
  const accentHSL = hexToHSL(accent);
  let scrollbarL = accentHSL.l;
  const adjustment = 0.1;

  if (accentHSL.l < 0.5) {
    scrollbarL = Math.min(accentHSL.l + adjustment, 1);
  } else {
    scrollbarL = Math.max(accentHSL.l - adjustment, 0);
  }

  const scrollbarHSL = {
    h: accentHSL.h,
    s: accentHSL.s,
    l: scrollbarL
  };
  const scrollbarColor = hslToHex(scrollbarHSL.h, scrollbarHSL.s, scrollbarHSL.l);

  return { borderColor, buttonColor, scrollbarColor };
}
