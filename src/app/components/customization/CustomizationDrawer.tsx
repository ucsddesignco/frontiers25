'use client';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { VisuallyHidden } from 'radix-ui';
import { CustomizationPanel } from './CustomizationPanel';

export function CustomizationDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="mt-4 rounded-full">
          Open Drawer
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
