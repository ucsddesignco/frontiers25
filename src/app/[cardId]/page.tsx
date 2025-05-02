import { getCardByID } from '../api/cardFunctions';
import CustomizationContainer from '../components/customization/CustomizationContainer';

export default async function Page({ params }: { params: Promise<{ cardId: string }> }) {
  const param = await params;
  const cardId = param.cardId as string;

  const card = await getCardByID(cardId);

  // if (!card) {
  //   return <h1>Card not found</h1>;
  // }

  return <CustomizationContainer card={card} />;
}
