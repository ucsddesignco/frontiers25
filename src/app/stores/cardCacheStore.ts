import { create } from 'zustand';
import { CardType, MIDDLE_CARD_INDEX } from '../components/constants';

type RefreshUserCardsCallback = () => Promise<void>;

// Helper function to place user cards in the correct positions
function placeUserCardsInPattern(baseData: CardType[], userCards: CardType[]): CardType[] {
  if (!userCards.length) return baseData;
  const sortedUserCards = [...userCards].sort((a, b) => {
    const timeA = new Date(a.lastUpdated).getTime();
    const timeB = new Date(b.lastUpdated).getTime();

    return timeA - timeB;
  });

  const updatedData = [...baseData];

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
}

function isUserCard(card: CardType, userId: string | null | undefined): boolean {
  return card._id.startsWith('local-card-') || !!(userId && card.user === userId);
}

interface CardCacheState {
  // Cache for the complete card pattern (random cards + user cards placed)
  cachedCardPattern: CardType[] | null;

  // Cache for just the random cards (before user card placement)
  cachedRandomCards: CardType[] | null;

  hasInitialFetch: boolean;
  isLoading: boolean;
  refreshUserCardsCallback: RefreshUserCardsCallback | null;
  currentUserId: string | null;

  setCachedCardPattern: (cards: CardType[]) => void;
  setCachedRandomCards: (cards: CardType[]) => void;
  setIsLoading: (loading: boolean) => void;
  setHasInitialFetch: (hasFetched: boolean) => void;
  setRefreshUserCardsCallback: (callback: RefreshUserCardsCallback | null) => void;
  setCurrentUserId: (userId: string | null) => void;

  refreshUserCards: () => Promise<void>;

  updateCardInCache: (cardId: string, updatedCard: Partial<CardType>) => void;
  removeCardFromCache: (cardId: string) => void;
  addCardToCache: (newCard: CardType) => void;

  getCachedCardPattern: () => CardType[] | null;
  getCachedRandomCards: () => CardType[] | null;
}

export const useCardCacheStore = create<CardCacheState>((set, get) => ({
  cachedCardPattern: null,
  cachedRandomCards: null,
  hasInitialFetch: false,
  isLoading: false,
  refreshUserCardsCallback: null,
  currentUserId: null,

  setCachedCardPattern: cards => set({ cachedCardPattern: cards }),

  setCachedRandomCards: cards => set({ cachedRandomCards: cards }),

  setIsLoading: loading => set({ isLoading: loading }),

  setHasInitialFetch: hasFetched => set({ hasInitialFetch: hasFetched }),

  setRefreshUserCardsCallback: callback => set({ refreshUserCardsCallback: callback }),

  setCurrentUserId: userId => set({ currentUserId: userId }),

  refreshUserCards: async () => {
    const { refreshUserCardsCallback } = get();
    if (refreshUserCardsCallback) {
      await refreshUserCardsCallback();
    }
  },

  updateCardInCache: (cardId: string, updatedCard: Partial<CardType>) => {
    set(state => {
      if (!state.cachedCardPattern) return state;

      const updatedPattern = state.cachedCardPattern.map(card =>
        card._id === cardId ? { ...card, ...updatedCard } : card
      );

      return { cachedCardPattern: updatedPattern };
    });
  },

  removeCardFromCache: (cardId: string) => {
    set(state => {
      if (!state.cachedCardPattern || !state.cachedRandomCards) return state;

      const cardToDelete = state.cachedCardPattern.find(card => card._id === cardId);
      if (!cardToDelete || !isUserCard(cardToDelete, state.currentUserId)) {
        const updatedPattern = state.cachedCardPattern.filter(card => card._id !== cardId);
        return { cachedCardPattern: updatedPattern };
      }

      const remainingUserCards = state.cachedCardPattern.filter(
        card => isUserCard(card, state.currentUserId) && card._id !== cardId
      );

      const basePattern = [...state.cachedRandomCards];

      const updatedPattern = placeUserCardsInPattern(basePattern, remainingUserCards);

      return { cachedCardPattern: updatedPattern };
    });
  },

  addCardToCache: (newCard: CardType) => {
    set(state => {
      if (!state.cachedCardPattern || !state.cachedRandomCards) return state;

      const currentUserCards = state.cachedCardPattern.filter(card =>
        isUserCard(card, state.currentUserId)
      );
      const allUserCards = [...currentUserCards, newCard];
      const basePattern = [...state.cachedRandomCards];
      const updatedPattern = placeUserCardsInPattern(basePattern, allUserCards);

      return { cachedCardPattern: updatedPattern };
    });
  },

  getCachedCardPattern: () => get().cachedCardPattern,

  getCachedRandomCards: () => get().cachedRandomCards
}));
