import { parseColor, Color } from '@react-stately/color'; // Make sure to install @react-stately/color

type ColorVariations = {
  borderColor: string;
  buttonColor: string;
  scrollbarColor: string;
};

export function generateColorVariations(primary: string, accent: string): ColorVariations {
  let primaryColor: Color;
  let accentColor: Color;

  try {
    primaryColor = parseColor(primary).toFormat('hsl');
    accentColor = parseColor(accent).toFormat('hsl');
  } catch (e) {
    console.error('Invalid color format provided:', e);
    return {
      borderColor: '#000000',
      buttonColor: '#FFFFFF',
      scrollbarColor: '#808080'
    };
  }

  const primarySaturation = primaryColor.getChannelValue('saturation');
  const primaryLightness = primaryColor.getChannelValue('lightness');

  // const accentHue = accentColor.getChannelValue('hue');
  // const accentSaturation = accentColor.getChannelValue('saturation');
  const accentLightness = accentColor.getChannelValue('lightness');

  const borderSaturation = Math.min(primarySaturation + 15, 100);
  const borderLightness = Math.max(primaryLightness - 15, 0);

  const borderColorColor = primaryColor
    .withChannelValue('saturation', borderSaturation)
    .withChannelValue('lightness', borderLightness);

  const buttonSaturation = Math.max(primarySaturation - 5, 0);

  let buttonLightness: number;
  if (primaryLightness <= 5) {
    buttonLightness = Math.min(primaryLightness + 25, 100);
  } else if (primaryLightness >= 95) {
    buttonLightness = Math.max(primaryLightness - 25, 0);
  } else {
    buttonLightness = Math.min(primaryLightness + 10, 95);
  }

  const buttonColorColor = primaryColor
    .withChannelValue('saturation', buttonSaturation)
    .withChannelValue('lightness', buttonLightness);

  let scrollbarLightness: number;
  const adjustment = 10;

  if (accentLightness < 50) {
    scrollbarLightness = Math.min(accentLightness + adjustment, 100);
  } else {
    scrollbarLightness = Math.max(accentLightness - adjustment, 0);
  }

  const scrollbarColorColor = accentColor.withChannelValue('lightness', scrollbarLightness);

  const borderColor = borderColorColor.toString('hex');
  const buttonColor = buttonColorColor.toString('hex');
  const scrollbarColor = scrollbarColorColor.toString('hex');

  return { borderColor, buttonColor, scrollbarColor };
}
