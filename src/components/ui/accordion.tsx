'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { BorderStyle } from '@/app/stores/customizationStore';

function getBorderRadiusClass(borderStyle: BorderStyle | undefined) {
  return borderStyle === 'rounded'
    ? 'rounded-b-xl'
    : borderStyle === 'squircle'
      ? 'rounded-b-[32px]'
      : 'rounded-b-none';
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('b-none', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'gap-auto flex flex-1 items-center justify-between bg-[var(--card-button-color)] p-6 pl-8 font-medium text-[var(--card-accent-color)] transition-all data-[state=open]:rounded-b-none data-[state=open]:transition-none data-[state=closed]:[transition-delay:0.185s] [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-8 w-8 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { borderStyle?: BorderStyle }
>(({ className, children, borderStyle, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      getBorderRadiusClass(borderStyle),
      'agp-4 text-md overflow-hidden border-x-[4px] border-b-[4px] border-[var(--card-button-color)] bg-[var(--card-primary-color)] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className={cn('p-6 pl-8', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
