import { createContext } from 'react';
import { CustomizationStore } from '../stores/customizationStore';

export const CustomizationContext = createContext<CustomizationStore | null>(null);
