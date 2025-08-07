import { useCardCacheStore } from '../stores/cardCacheStore';
import { processCardData } from './processCardData';
import { DatabaseCard } from '../components/InfiniteCanvas';
import { CardType } from '../components/constants';

export function updateCardInCache(cardId: string, updatedCardData: DatabaseCard) {
  const { updateCardInCache } = useCardCacheStore.getState();

  const processedCards = processCardData([updatedCardData]);
  const processedCard = processedCards[0];

  updateCardInCache(cardId, processedCard);
}

export function updateLocalCardInCache(cardId: string, updatedCardData: CardType) {
  const { updateCardInCache } = useCardCacheStore.getState();

  updateCardInCache(cardId, updatedCardData);

  try {
    const localCards = JSON.parse(localStorage.getItem('localCards') || '[]');
    const updatedLocalCards = localCards.map((card: CardType) =>
      card._id === cardId ? { ...card, ...updatedCardData } : card
    );
    localStorage.setItem('localCards', JSON.stringify(updatedLocalCards));
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
}

export function removeCardFromCache(cardId: string) {
  const { removeCardFromCache } = useCardCacheStore.getState();
  removeCardFromCache(cardId);

  // If it's a local card, also remove from localStorage
  if (cardId.startsWith('local-card-')) {
    try {
      const localCards = JSON.parse(localStorage.getItem('localCards') || '[]');
      const updatedLocalCards = localCards.filter((card: CardType) => card._id !== cardId);
      localStorage.setItem('localCards', JSON.stringify(updatedLocalCards));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
}

export function addCardToCache(newCardData: DatabaseCard) {
  const { addCardToCache } = useCardCacheStore.getState();

  const processedCards = processCardData([newCardData]);
  const processedCard = processedCards[0];

  addCardToCache(processedCard);
}

export function addLocalCardToCache(newCardData: CardType) {
  const { addCardToCache } = useCardCacheStore.getState();

  addCardToCache(newCardData);
  try {
    const localCards = JSON.parse(localStorage.getItem('localCards') || '[]');
    localCards.push(newCardData);
    localStorage.setItem('localCards', JSON.stringify(localCards));
  } catch (error) {
    console.error('Error adding to localStorage:', error);
  }
}
