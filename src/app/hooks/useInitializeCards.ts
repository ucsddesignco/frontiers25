import { CardType, MIDDLE_CARD_INDEX } from '../components/constants';
import { useEffect, useCallback } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { DatabaseCard } from '../components/InfiniteCanvas';
import { processCardData } from '../util/processCardData';
import { Session } from '@/lib/auth';
import { getCardByUser } from '../api/cardFunctions';
import { formatRelativeTime } from '../util/formatTime';

interface InitializeCardsProps {
  data: DatabaseCard[];
  session: Session | null;
}

export function useInitializeCards({ data, session }: InitializeCardsProps) {
  const { setBasePattern } = useCanvasStore();

  const placeUserCards = useCallback((processedData: CardType[], userCards: CardType[]) => {
    if (!userCards.length) return processedData;

    const sortedUserCards = [...userCards].sort(
      (a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
    );

    const updatedData = [...processedData];

    switch (sortedUserCards.length) {
      case 3:
        updatedData[MIDDLE_CARD_INDEX - 1] = sortedUserCards[0];
        updatedData[MIDDLE_CARD_INDEX] = sortedUserCards[2];
        updatedData[MIDDLE_CARD_INDEX + 1] = sortedUserCards[1];
        break;
      case 2:
        updatedData[MIDDLE_CARD_INDEX - 1] = sortedUserCards[0];
        updatedData[MIDDLE_CARD_INDEX] = sortedUserCards[1];
        break;
      case 1:
        updatedData[MIDDLE_CARD_INDEX] = sortedUserCards[0];
        break;
    }

    return updatedData;
  }, []);

  const fetchUserCards = useCallback(
    async (processedData: CardType[]) => {
      try {
        const userCards = await getCardByUser();
        const processedUserCards = processCardData(userCards || []);
        setBasePattern(placeUserCards(processedData, processedUserCards));
      } catch (error) {
        console.error('Error fetching user cards:', error);
        setBasePattern(processedData);
      }
    },
    [placeUserCards, setBasePattern]
  );

  const getLocalCards = useCallback(
    (processedData: CardType[]) => {
      try {
        const localCards = localStorage.getItem('localCards') || '[]';
        const parsedLocalCards = JSON.parse(localCards).map((card: CardType) => ({
          ...card,
          lastUpdated: formatRelativeTime(card.lastUpdated)
        }));

        setBasePattern(placeUserCards(processedData, parsedLocalCards));
      } catch (error) {
        console.error('Error retrieving local cards:', error);
        setBasePattern(processedData);
      }
    },
    [placeUserCards, setBasePattern]
  );

  useEffect(() => {
    const processedData = processCardData(data);
    if (session) {
      fetchUserCards(processedData);
    } else {
      getLocalCards(processedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
