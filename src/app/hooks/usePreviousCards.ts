import { useEffect, useRef } from 'react';
import { MIDDLE_CARD_INDEX } from '../components/constants';

// Used for applying Thick Fogs on previous cards
export const usePreviousCards = (selectedCard: number | null) => {
  const previousSelectedCards = useRef(new Map([[MIDDLE_CARD_INDEX, -1]]));
  const checkPrevious = (index: number) => {
    const map = previousSelectedCards.current;
    if (map.has(index)) {
      const time = map.get(index) as number;
      if (time === -1) {
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
    const map = previousSelectedCards.current;

    map.keys().forEach(key => {
      map.set(key, Date.now());
    });
    if (selectedCard) {
      map.set(selectedCard, -1);
    }
  }, [selectedCard]);

  return { checkPrevious };
};
