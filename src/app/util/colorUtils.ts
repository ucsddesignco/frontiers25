import { contrast, isValidColor, lighten, darken, hex2oklch, oklch2hex, convert } from 'colorizr';

type ColorVariations = {
  borderColor: string;
  buttonColor: string;
  scrollbarColor: string;
};

export function generateColorVariations(primary: string, accent: string): ColorVariations {
  if (!isValidColor(primary) || !isValidColor(accent)) {
    return {
      borderColor: '#333333',
      buttonColor: '#000000',
      scrollbarColor: '#808080'
    };
  }

  const borderColor = darken(primary, 15);

  const scrollbarColor = lighten(accent, 20);

  const buttonColor = generateButtonColor(primary);

  return {
    borderColor,
    buttonColor,
    scrollbarColor
  };
}

function generateButtonColor(primary: string): string {
  const MIN_UI_CONTRAST_DARK = 1.35;
  const MIN_UI_CONTRAST_BRIGHT = 1.18;
  const MAX_ITERATIONS = 50;
  const INITIAL_STEP = 1.5;

  const primaryLch = hex2oklch(convert(primary, 'hex'));
  const primaryLightness = primaryLch.l * 100; // Convert to 0-100 range
  const primaryChroma = primaryLch.c;
  const primaryHue = primaryLch.h;

  // Prefer brighter colors more often
  const preferLighter = primaryLightness < 95;

  let buttonColor: string | null = null;
  const minContrast = primaryLightness < 60 ? MIN_UI_CONTRAST_DARK : MIN_UI_CONTRAST_BRIGHT;

  // Try the preferred direction first
  if (preferLighter) {
    buttonColor = searchInDirection(primary, 1, minContrast, MAX_ITERATIONS, INITIAL_STEP);
  } else {
    buttonColor = searchInDirection(primary, -1, minContrast, MAX_ITERATIONS, INITIAL_STEP);
  }

  // If preferred direction failed, try the other direction
  if (!buttonColor) {
    const alternateDirection = preferLighter ? -1 : 1;
    buttonColor = searchInDirection(
      primary,
      alternateDirection,
      minContrast,
      MAX_ITERATIONS,
      INITIAL_STEP
    );
  }

  // Final fallback
  if (!buttonColor) {
    const fallbackLightness = preferLighter
      ? Math.min(100, primaryLightness + 15)
      : Math.max(0, primaryLightness - 15);

    const fallbackLch = {
      l: fallbackLightness / 100, // Convert back to 0-1 range
      c: primaryChroma * 0.8,
      h: primaryHue
    };

    buttonColor = clampToValidRange(fallbackLch);
  }

  return buttonColor;
}

function searchInDirection(
  primary: string,
  direction: number, // 1 = lighter, -1 = darker
  minContrast: number,
  maxIterations: number,
  initialStep: number
): string | null {
  const primaryLch = hex2oklch(convert(primary, 'hex'));
  const primaryLightness = primaryLch.l * 100; // Convert to 0-100 range
  const primaryChroma = primaryLch.c;
  const primaryHue = primaryLch.h;

  let currentLightness = primaryLightness;
  let currentChroma = primaryChroma;
  let step = initialStep;

  for (let i = 0; i < maxIterations; i++) {
    const candidateLch = {
      l: currentLightness / 100, // Convert back to 0-1 range
      c: currentChroma,
      h: primaryHue
    };

    const candidate = clampToValidRange(candidateLch);
    const uiContrast = contrast(candidate, primary);

    if (uiContrast >= minContrast) {
      return candidate;
    }

    // Adjust lightness for next iteration
    currentLightness += direction * step;

    // Check boundaries
    if (currentLightness <= 0 || currentLightness >= 100) {
      // Hit boundary, try reducing chroma and resetting lightness
      currentLightness = primaryLightness;
      currentChroma = Math.max(0, currentChroma - 0.05);
      step = initialStep;

      if (currentChroma < 0.05) {
        break;
      }
    } else if (i % 8 === 7) {
      // Increase step size periodically for faster convergence
      step = Math.min(step + 1, 4);
    }
  }

  return null;
}

function clampToValidRange(lch: { l: number; c: number; h: number }): string {
  const clampedL = Math.max(0, Math.min(1, lch.l));
  const clampedC = Math.max(0, Math.min(0.5, lch.c));
  const clampedH = lch.h || 0;

  try {
    return oklch2hex({
      l: clampedL,
      c: clampedC,
      h: clampedH
    });
  } catch {
    return oklch2hex({
      l: clampedL,
      c: 0,
      h: 0
    });
  }
}
