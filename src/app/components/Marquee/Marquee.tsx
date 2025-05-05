import type { BorderStyle } from '@/app/stores/customizationStore';
import type { FontFamily } from '@/app/stores/customizationStore';
import { getMarqueeLongText, getMarqueeShortText } from '@/app/util/getMarqueeText';
import { getMarqueeSpacer } from '@/app/util/getMarqueeSpacer';
import './Marquee.scss';

interface MarqueeProps {
  accent?: string;
  buttonColor?: string;
  borderStyle?: BorderStyle;
  fontFamily?: FontFamily;
}

export default function Marquee({ accent, buttonColor, borderStyle, fontFamily }: MarqueeProps) {
  const MarqueeLongText = getMarqueeLongText({
    fontFamily,
    accent
  });

  const MarqueeShortText = getMarqueeShortText({
    fontFamily,
    accent
  });

  const MarqueeSpacer = getMarqueeSpacer({
    borderStyle: borderStyle ?? 'rectangular',
    accent: accent
  });

  return (
    <div
      className="marquee relative bottom-0 mt-8 overflow-hidden xl:absolute"
      style={{ backgroundColor: buttonColor }}
    >
      <ul className="marquee__content">
        {MarqueeShortText}
        {MarqueeSpacer}
        {MarqueeLongText}
        {MarqueeSpacer}
        {MarqueeShortText}
        {MarqueeSpacer}
        {MarqueeLongText}
        {MarqueeSpacer}
      </ul>
      <ul className="marquee__content">
        {MarqueeShortText}
        {MarqueeSpacer}
        {MarqueeLongText}
        {MarqueeSpacer}
        {MarqueeShortText}
        {MarqueeSpacer}
        {MarqueeLongText}
        {MarqueeSpacer}
      </ul>
    </div>
  );
}
