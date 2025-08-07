import { memo, useState } from 'react';
import Card from '../Card';
import { VisibleCard } from '@/app/hooks/useVisibleCards';
// import ExpandedCard from '../ExpandedCard/ExpandedCard';
import GlassIsland from '../GlassIsland/GlassIsland';
import GlassButton from '../GlassButton/GlassButton';
import DeleteIcon from '@/app/assets/DeleteIcon';
import Modal from '../Modal';
import { removeCardByID } from '@/app/api/cardFunctions';
import { customToast } from '@/app/util/CustomToast/CustomToast';
import { Session } from '@/lib/auth';
import { removeCardFromCache } from '@/app/util/cacheInvalidation';

type CardsPageProps = {
  cards: VisibleCard[];
  setCards: (cards: VisibleCard[]) => void;
  handleLearnMore: (card: VisibleCard) => void;
  session: Session | null;
};

function MyCardsPage({
  cards,
  setCards,
  handleLearnMore: _handleLearnMore,
  session
}: CardsPageProps) {
  const [selectedCard, setSelectedCard] = useState<VisibleCard | null>(null);
  const [openModal, setOpenModal] = useState(false);
  // const showExpanded = useCanvasStore(state => state.showExpanded);

  const handleCardClick = (card: VisibleCard) => {
    setSelectedCard(card);
  };

  const cardWidth = 300;
  const cardHeight = 400;

  const handleDeleteCard = async () => {
    if (!selectedCard) return;
    if (!session) {
      removeCardFromCache(selectedCard._id);
      const updatedCards = cards.filter(card => card._id !== selectedCard._id);
      setCards(updatedCards);
      setSelectedCard(null);
      setOpenModal(false);

      customToast({
        description: 'Card deleted successfully',
        type: 'success'
      });
      return;
    }
    const deleteCount = await removeCardByID(selectedCard._id);
    setOpenModal(false);

    if (!deleteCount) {
      console.error('Error deleting card');
      customToast({
        description: 'Error deleting card',
        type: 'error'
      });
      return;
    }
    if (deleteCount > 0) {
      removeCardFromCache(selectedCard._id);
      const updatedCards = cards.filter(card => card._id !== selectedCard._id);
      setCards(updatedCards);
      setSelectedCard(null);

      customToast({
        description: 'Card deleted successfully',
        type: 'success'
      });
    }
  };

  return (
    <>
      {/* <ExpandedCard showExpanded={showExpanded} /> */}
      {/* Overlay to reset selected card */}
      <Modal
        open={openModal}
        onOpenChange={setOpenModal}
        title="Are You Sure?"
        description="You cannot undo this change."
        primaryText="Delete Card"
        secondaryText="Nevermind"
        Icon={<DeleteIcon />}
        onPrimaryClick={handleDeleteCard}
      />
      <div className="absolute inset-0" onClick={() => setSelectedCard(null)}></div>
      <GlassIsland className={selectedCard ? 'translate-y-0' : 'translate-y-[200%]'}>
        <p className="hidden md:block">Selected</p>
        {/* Desktop */}
        <GlassButton
          text="Edit Card"
          color="light"
          size="skinny"
          href={`/card/${selectedCard?._id}`}
        ></GlassButton>
        <GlassButton
          text="Delete Card"
          color="dark"
          size="skinny"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <DeleteIcon />
        </GlassButton>
      </GlassIsland>

      <>
        {cards.map(card => {
          const isSelected = selectedCard?._id === card._id;
          const scaleClass = isSelected ? 'scale-[1.07]' : '';
          return (
            <div
              key={card._id}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`
              }}
            >
              <Card
                card={card}
                onClick={() => {
                  handleCardClick(card);
                }}
                onLearnMore={(e: React.MouseEvent<HTMLButtonElement>) => {
                  // e.stopPropagation();
                  // handleLearnMore(card);
                }}
                className={`${scaleClass} hover:scale-[1.07]`}
              />
            </div>
          );
        })}
      </>
    </>
  );
}

export default memo(MyCardsPage);
