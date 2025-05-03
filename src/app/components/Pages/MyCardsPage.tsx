import { memo, useState } from 'react';
import Card from '../Card';
import { VisibleCard } from '@/app/hooks/useVisibleCards';
// import ExpandedCard from '../ExpandedCard/ExpandedCard';
import GlassIsland from '../GlassIsland/GlassIsland';
import GlassButton from '../GlassButton/GlassButton';
import EditIcon from '@/app/assets/EditIcon';
import DeleteIcon from '@/app/assets/DeleteIcon';
import Modal from '../Modal';
import { removeCardByID } from '@/app/api/cardFunctions';
import { customToast } from '@/app/util/CustomToast/CustomToast';

type CardsPageProps = {
  cards: VisibleCard[];
  handleLearnMore: (card: VisibleCard) => void;
};

function MyCardsPage({ cards, handleLearnMore: _handleLearnMore }: CardsPageProps) {
  const [selectedCard, setSelectedCard] = useState<VisibleCard | null>(null);
  const [openModal, setOpenModal] = useState(false);
  // const showExpanded = useCanvasStore(state => state.showExpanded);

  const handleCardClick = (card: VisibleCard) => {
    setSelectedCard(card);
  };

  const cardWidth = 300;
  const cardHeight = 400;

  // if (isMobile) {
  //   cardWidth = Math.min(Math.max(window.innerWidth * 0.8, 292), 300);
  //   cardHeight = cardWidth * (4 / 3);
  // }

  const handleDeleteCard = async () => {
    if (!selectedCard) return;
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
        buttonOnClick={handleDeleteCard}
      />
      <div
        className="pointer-events-none absolute inset-0"
        onClick={() => setSelectedCard(null)}
      ></div>
      <GlassIsland className={selectedCard ? 'translate-y-0' : 'translate-y-[200%]'}>
        <p>Selected</p>
        {/* Desktop */}
        <GlassButton
          text="Edit Variant"
          color="dark"
          size="skinny"
          href={`/card/${selectedCard?._id}`}
          className="hidden md:block"
        >
          <EditIcon />
        </GlassButton>
        <GlassButton
          text="Delete Variant"
          color="dark"
          size="skinny"
          onClick={() => {
            setOpenModal(true);
          }}
          className="hidden md:block"
        >
          <DeleteIcon />
        </GlassButton>

        {/* Mobile */}
        <GlassButton
          text="Edit"
          color="dark"
          size="skinny"
          href={`/card/${selectedCard?._id}`}
          className="md:hidden"
        >
          <EditIcon />
        </GlassButton>
        <GlassButton
          text="Delete"
          color="dark"
          size="skinny"
          onClick={() => {
            setOpenModal(true);
          }}
          className="md:hidden"
        >
          <DeleteIcon />
        </GlassButton>
      </GlassIsland>
      <div className="flex h-full w-screen flex-wrap items-center justify-center gap-16 overflow-auto bg-[#eaeaea] py-32 md:min-h-screen md:py-0">
        {cards.map(card => {
          const isSelected = selectedCard?.key === card.key;
          const scaleClass = isSelected ? 'scale-[1.07]' : '';
          return (
            <div
              key={card.key}
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
                  e.stopPropagation();
                  // handleLearnMore(card);
                }}
                className={`${scaleClass} hover:scale-[1.07]`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default memo(MyCardsPage);
