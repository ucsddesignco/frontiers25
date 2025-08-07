import { CardType } from '../components/constants';
import { DatabaseCard } from '../components/InfiniteCanvas';
import { generateColorVariations } from './colorUtils';
import { formatRelativeTime } from './formatTime';

export const processCardData = (data: DatabaseCard[], shouldFormatTime = true) => {
  const processedData: CardType[] = data.map(card => {
    const { borderColor, buttonColor, scrollbarColor } = generateColorVariations(
      card.primary,
      card.accent
    );
    return {
      ...card,
      lastUpdated: shouldFormatTime ? formatRelativeTime(card.lastUpdated) : card.lastUpdated,
      borderColor,
      buttonColor,
      scrollbarColor
    };
  });

  return processedData;
};
