import {
  RectangularSpacer,
  RoundedSpacer,
  BeveledSpacer,
  SquircleSpacer
} from '../assets/Marquee/MarqueeSpacers';

import type { BorderStyle } from '../stores/customizationStore';

interface getMarqueeSpacerProps {
  borderStyle: BorderStyle;
  accent?: string;
}

export function getMarqueeSpacer({ borderStyle, accent }: getMarqueeSpacerProps) {
  switch (borderStyle) {
    case 'rounded':
      return <RoundedSpacer accent={accent} />;
    case 'beveled':
      return <BeveledSpacer accent={accent} />;
    case 'squircle':
      return <SquircleSpacer accent={accent} />;
    case 'rectangular':
      return <RectangularSpacer accent={accent} />;
    default:
      return <RectangularSpacer accent={accent} />;
  }
}
