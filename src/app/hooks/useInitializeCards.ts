import { MIDDLE_CARD_INDEX } from './../components/constants';
import { useEffect } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { DatabaseCard } from '../components/InfiniteCanvas';
import { processCardData } from '../util/processCardData';
import { Session } from '@/lib/auth';
import { getCardByUser } from '../api/cardFunctions';

interface InitializeCardsProps {
  data: DatabaseCard[];
  session: Session | null;
}

export function useInitializeCards({ data, session }: InitializeCardsProps) {
  const { setBasePattern } = useCanvasStore();

  useEffect(() => {
    const processedData = processCardData(data);
    // Set middle three cards to user cards
    if (session) {
      const fetchUserCards = async () => {
        const userCards = await getCardByUser();
        const processsedUserCards = processCardData(userCards);

        if (processsedUserCards.length === 3) {
          processedData[MIDDLE_CARD_INDEX - 1] = processsedUserCards[0];
          processedData[MIDDLE_CARD_INDEX] = processsedUserCards[1];
          processedData[MIDDLE_CARD_INDEX + 1] = processsedUserCards[2];
        } else if (processsedUserCards.length === 2) {
          processedData[MIDDLE_CARD_INDEX - 1] = processsedUserCards[0];
          processedData[MIDDLE_CARD_INDEX] = processsedUserCards[1];
        } else if (processsedUserCards.length === 1) {
          processedData[MIDDLE_CARD_INDEX] = processsedUserCards[0];
        }
        setBasePattern(processedData);
      };
      fetchUserCards();
    } else {
      setBasePattern(processedData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
