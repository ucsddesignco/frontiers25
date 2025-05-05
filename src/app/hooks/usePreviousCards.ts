import { useEffect, useRef } from 'react';
import { MIDDLE_CARD_INDEX } from '../components/constants';
import { CanvasState } from '../stores/canvasStore';

// Used for applying Thick Fogs on previous cards
export const usePreviousCards = (selectedCard: CanvasState['selectedCard']) => {
  const previousSelectedCards = useRef(new Map([[MIDDLE_CARD_INDEX, -1]]));
  const checkPrevious = (index: number) => {
    const map = previousSelectedCards.current;
    if (map.has(index)) {
      const time = map.get(index) as number;
      if (time === -1) {
        setTimeout(() => {
          map.delete(index);
        }, 800);
        return true;
      } else if (Date.now() - time > 350) {
        map.delete(index);
        return false;
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const map = previousSelectedCards.current;
    for (const key of map.keys()) {
      if (key !== MIDDLE_CARD_INDEX) {
        map.set(key, Date.now());
      }
    }
    if (selectedCard) {
      map.set(parseInt(selectedCard), -1);
    }
  }, [selectedCard]);

  return { checkPrevious };
};
