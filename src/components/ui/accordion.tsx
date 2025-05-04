'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import '../../app/Components/ExpandedCard/ExpandedCard.scss';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

//Sahil's Jank Code :)
type BorderStyle = 'rounded' | 'squircle' | 'beveled' | undefined;

function getBorderRadiusClass(borderStyle: BorderStyle) {
  return borderStyle === 'rounded'
    ? 'rounded-b-xl'
    : borderStyle === 'squircle'
      ? 'rounded-b-[45px]'
      : 'rounded-b-none';
}

function renderAccentTriangles(borderStyle: BorderStyle) {
  if (borderStyle !== 'beveled') return null;
  return (
    <>
      <div className="accent-triangle absolute bottom-[-3px] left-[-3px] rotate-[270deg]"></div>
      <div className="accent-triangle absolute bottom-[-3px] right-[-3px] rotate-180"></div>
    </>
  );
}

function renderPrimaryTriangles(borderStyle: BorderStyle) {
  if (borderStyle !== 'beveled') return null;
  return (
    <>
      <div className="primary-triangle absolute left-0 top-0"></div>
      <div className="primary-triangle absolute right-0 top-0 rotate-90"></div>
      <div className="primary-triangle absolute bottom-0 left-0 rotate-[270deg]"></div>
      <div className="primary-triangle absolute bottom-0 right-0 rotate-180"></div>
    </>
  );
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
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { borderStyle?: BorderStyle }
>(({ className, children, borderStyle, ...props }, ref) => (
  <AccordionPrimitive.Header className="relative flex">
    <div className="relative">{borderStyle && renderPrimaryTriangles(borderStyle)}</div>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'gap-auto flex flex-1 items-center justify-between bg-[var(--card-accent-color)] p-6 py-4 font-medium text-[var(--card-primary-color)] transition-all data-[state=open]:rounded-b-none [&[data-state=open]>svg]:rotate-180',
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
      'agp-4 text-md relative border-x-[3px] border-b-[3px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    {renderAccentTriangles(borderStyle)}
    <div className={cn(`p-4 pt-2`, className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
