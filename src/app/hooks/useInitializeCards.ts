import { useEffect } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { CardType } from '../components/constants';
import { generateColorVariations } from '../util/colorUtils';
import { DatabaseCard } from '../components/InfiniteCanvas';

// Function to convert ISO timestamp string to relative time string (e.g., "18h", "3d")
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date(); // Reference "today"
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d`;
}

export function useInitializeCards({ data }: { data: DatabaseCard[] }) {
  const { setBasePattern } = useCanvasStore();

  useEffect(() => {
    // Process the fake data to format timestamps and generate colors before setting state
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
    setBasePattern(processedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
