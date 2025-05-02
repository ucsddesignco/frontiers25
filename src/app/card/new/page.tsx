import CustomizationContainer from '@/app/components/customization/CustomizationContainer';
import { BorderStyle, FontFamily } from '@/app/stores/customizationStore';

export default function NewCardPage() {
  const card = {
    _id: 'new',
    primary: '#FFCDD2',
    accent: '#530B67',
    fontFamily: 'Jaro' as FontFamily,
    borderStyle: 'rectangular' as BorderStyle,
    user: 'temporary',
    author: 'temporary',
    lastUpdated: new Date().toISOString()
  };

  return <CustomizationContainer card={card} />;
}
