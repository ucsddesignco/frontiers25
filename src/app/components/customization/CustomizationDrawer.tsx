'use client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { VisuallyHidden } from 'radix-ui';
import { CustomizationPanel } from './CustomizationPanel';
import { BorderIcon } from '@/app/assets/BorderIcons';
import ColorIcon from '@/app/assets/ColorIcon';
import TextIcon from '@/app/assets/TextIcon';

export function CustomizationDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-16 w-60 rounded-full">
          <div className="flex justify-between gap-10">
            <span className="hover:cursor-pointer">
              <ColorIcon />
            </span>
            <span className="h-full hover:cursor-pointer">
              <TextIcon />
            </span>
            <span className="hover:cursor-pointer">
              <BorderIcon />
            </span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[96%] justify-self-center rounded-[44px] p-6 pt-0">
        <VisuallyHidden.Root>
          <DrawerTitle>Customization Drawer</DrawerTitle>
        </VisuallyHidden.Root>
        <CustomizationPanel />
      </DrawerContent>
    </Drawer>
  );
}
