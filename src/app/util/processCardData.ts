import { CardType } from '../components/constants';
import { DatabaseCard } from '../components/InfiniteCanvas';
import { generateColorVariations } from './colorUtils';
import { formatRelativeTime } from './formatTime';

export const processCardData = (data: DatabaseCard[]) => {
  const processedData: CardType[] = data.map(card => {
    const { borderColor, buttonColor, scrollbarColor } = generateColorVariations(
      card.primary,
      card.accent
    );
    return {
      ...card,
      lastUpdated: formatRelativeTime(card.lastUpdated),
      borderColor,
      buttonColor,
      scrollbarColor
    };
  });

  return processedData;
};
