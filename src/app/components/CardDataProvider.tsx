'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useCardCacheStore } from '../stores/cardCacheStore';
import { getRandomCards, getCardByUser } from '../api/cardFunctions';
import { processCardData } from '../util/processCardData';
import { CardType, MIDDLE_CARD_INDEX } from './constants';
import { Session } from '@/lib/auth';
import InfiniteCanvas from './InfiniteCanvas';
import { formatRelativeTime } from '../util/formatTime';

interface CardDataProviderProps {
  initialData?: CardType[] | null;
  session: Session | null;
  newCardToast: {
    status: 'success' | 'error';
    message: string;
  } | null;
}

function formatCardTimestamps(cards: CardType[]): CardType[] {
  return cards.map(card => ({
    ...card,
    lastUpdated: card.lastUpdated.includes('T')
      ? formatRelativeTime(card.lastUpdated)
      : card.lastUpdated
  }));
}

function placeUserCardsInPattern(processedData: CardType[], userCards: CardType[]) {
  if (!userCards.length) return processedData;
  const sortedUserCards = [...userCards].sort((a, b) => {
    const timeA = new Date(a.lastUpdated).getTime();
    const timeB = new Date(b.lastUpdated).getTime();

    return timeA - timeB;
  });

  console.log(sortedUserCards);

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

  return formatCardTimestamps(updatedData);
}

export default function CardDataProvider({
  initialData,
  session,
  newCardToast
}: CardDataProviderProps) {
  const isFetchingRef = useRef(false);
  const {
    cachedCardPattern,
    cachedRandomCards,
    hasInitialFetch,
    setCachedCardPattern,
    setCachedRandomCards,
    setIsLoading,
    setHasInitialFetch,
    setRefreshUserCardsCallback,
    setCurrentUserId,
    getCachedRandomCards
  } = useCardCacheStore();

  const fetchAndCacheData = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    const state = useCardCacheStore.getState();
    if (state.isLoading || (state.hasInitialFetch && state.cachedCardPattern)) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      // Fetch random cards from DB
      let randomCards = getCachedRandomCards();

      if (!randomCards) {
        const randomCardData = await getRandomCards(50, session?.user?.id);
        randomCards = processCardData(randomCardData || []);
        setCachedRandomCards(randomCards);
      }

      // Handle user cards
      let finalCardData = randomCards;

      if (session?.user?.id) {
        // Authenticated user - get cards from database
        const userCards = await getCardByUser();
        if (userCards && userCards.length > 0) {
          const processedUserCards = processCardData(userCards);
          finalCardData = placeUserCardsInPattern(randomCards, processedUserCards);
        }
      } else {
        // Unauthenticated user - check localStorage for cards
        try {
          const localCards = localStorage.getItem('localCards') || '[]';
          const parsedLocalCards = JSON.parse(localCards);

          if (parsedLocalCards.length > 0) {
            const processedLocalCards = parsedLocalCards.map((card: CardType) => ({
              ...card,
              lastUpdated: card.lastUpdated
            }));

            const formattedLocalCards = processCardData(processedLocalCards, false);
            finalCardData = placeUserCardsInPattern(randomCards, formattedLocalCards);
          }
        } catch (error) {
          console.error('Error processing localStorage cards:', error);
        }
      }
      setCachedCardPattern(finalCardData);
      setHasInitialFetch(true);
    } catch (error) {
      console.error('Error fetching card data:', error);
      // Fallback to initial data if available
      if (initialData) {
        setCachedCardPattern(initialData);
        setHasInitialFetch(true);
      }
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [
    getCachedRandomCards,
    session?.user?.id,
    setCachedRandomCards,
    setCachedCardPattern,
    setHasInitialFetch,
    setIsLoading,
    initialData
  ]);

  // Function to refresh user cards only (when they change)
  const refreshUserCards = useCallback(async () => {
    if (!cachedRandomCards) return;

    try {
      let finalCardData = cachedRandomCards;

      if (session?.user?.id) {
        // Authenticated user - get cards from database
        const userCards = await getCardByUser();
        const processedUserCards = processCardData(userCards || []);
        finalCardData = placeUserCardsInPattern(cachedRandomCards, processedUserCards);
      } else {
        // Unauthenticated user (logged out) - check localStorage for cards
        try {
          const localCards = localStorage.getItem('localCards') || '[]';
          const parsedLocalCards = JSON.parse(localCards);

          if (parsedLocalCards.length > 0) {
            const processedLocalCards = parsedLocalCards.map((card: CardType) => ({
              ...card,
              lastUpdated: card.lastUpdated
            }));

            const formattedLocalCards = processCardData(processedLocalCards, false);
            finalCardData = placeUserCardsInPattern(cachedRandomCards, formattedLocalCards);
          }
        } catch (error) {
          console.error('Error processing localStorage cards:', error);
        }
      }

      setCachedCardPattern(finalCardData);
    } catch (error) {
      console.error('Error refreshing user cards:', error);
    }
  }, [session?.user?.id, cachedRandomCards, setCachedCardPattern]);

  useEffect(() => {
    setCurrentUserId(session?.user?.id || null);
  }, [session?.user?.id, setCurrentUserId]);

  // Initial data fetch
  useEffect(() => {
    if (initialData && !hasInitialFetch) {
      setCachedCardPattern(initialData);
      setHasInitialFetch(true);
    } else if (!hasInitialFetch && !cachedCardPattern) {
      fetchAndCacheData();
    }
  }, [
    initialData,
    hasInitialFetch,
    cachedCardPattern,
    setCachedCardPattern,
    setHasInitialFetch,
    fetchAndCacheData
  ]);

  // Listen for session changes to refresh user cards
  useEffect(() => {
    if (hasInitialFetch && cachedRandomCards) {
      refreshUserCards();
    }
  }, [session?.user?.id, hasInitialFetch, cachedRandomCards, refreshUserCards]);

  useEffect(() => {
    setRefreshUserCardsCallback(refreshUserCards);
    return () => {
      setRefreshUserCardsCallback(null);
    };
  }, [refreshUserCards, setRefreshUserCardsCallback]);

  const dataToRender = cachedCardPattern || initialData || [];

  return <InfiniteCanvas data={dataToRender} session={session} newCardToast={newCardToast} />;
}
