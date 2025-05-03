'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BorderIcon } from '@/app/assets/BorderIcons';
import { BorderTab } from './Tabs/BorderTab';
import { TypographyTab } from './Tabs/TypographyTab/TypographyTab';
import { ColorTab } from './Tabs/ColorTab';
import ColorIcon from '@/app/assets/ColorIcon';
import TextIcon from '@/app/assets/TextIcon';
import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import { useContext } from 'react';
import { useShallow } from 'zustand/shallow';
import { useStore } from 'zustand';

export function CustomizationPanel() {
  const store = useContext(CustomizationContext);
  if (!store) throw new Error('Missing CustomizationContext');

  const { validContrast } = useStore(
    store,
    useShallow(state => ({
      validContrast: state.validContrast
    }))
  );
  return (
    <Tabs defaultValue="color" className="relative h-full w-full">
      <TabsList className="relative top-0 mb-12 grid w-full grid-cols-3">
        <TabsTrigger
          value="color"
          className={`hover:cursor-pointer ${!validContrast ? 'data-[state=active]:border-[#AC271E]' : ''}`}
        >
          <ColorIcon color={validContrast ? '#4D4857' : '#AC271E'} />
        </TabsTrigger>
        <TabsTrigger value="typography" className="h-full hover:cursor-pointer">
          <TextIcon />
        </TabsTrigger>
        <TabsTrigger value="border" className="hover:cursor-pointer">
          <BorderIcon />
        </TabsTrigger>
      </TabsList>

      <div className="h-[240px]">
        <TabsContent value="color">
          <ColorTab />
        </TabsContent>

        <TabsContent value="typography" className="h-full overflow-y-auto">
          <TypographyTab />
        </TabsContent>

        <TabsContent value="border">
          <BorderTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
