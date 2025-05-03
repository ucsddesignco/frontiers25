import { Beveled, Rectangular, Rounded, Squircle } from '../assets/CardSvgs';

interface CardBorderProps {
  borderStyle: string | undefined;
  bgColor: string | undefined;
  borderColor: string | undefined;
}

export function getCardBorders({
  borderStyle = 'rounded',
  bgColor = 'FFCDD2',
  borderColor = 'FFA5B0'
}: CardBorderProps) {
  switch (borderStyle) {
    case 'rounded':
      return <Rounded bgColor={bgColor} borderColor={borderColor} />;
    case 'beveled':
      return <Beveled bgColor={bgColor} borderColor={borderColor} />;
    case 'squircle':
      return <Squircle bgColor={bgColor} borderColor={borderColor} />;
    case 'rectangular':
      return <Rectangular bgColor={bgColor} borderColor={borderColor} />;
    default:
      return <Rectangular bgColor={bgColor} borderColor={borderColor} />;
  }
}
