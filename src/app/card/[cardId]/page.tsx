import { getCardByID } from '../../api/cardFunctions';
import CustomizationContainer from '../../components/customization/CustomizationContainer';

export default async function Page({ params }: { params: Promise<{ cardId: string }> }) {
  const param = await params;
  const cardId = param.cardId as string;

  const card = await getCardByID(cardId);

  return <CustomizationContainer card={card} />;
}
