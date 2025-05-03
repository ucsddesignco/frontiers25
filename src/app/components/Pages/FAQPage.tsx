import { Ref } from 'react';
import PageTitle from '../PageTitle';
import '../ExpandedCard/ExpandedCard.scss';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

type FAQPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
  borderStyle?: string;
};

type BorderStyle = 'rounded' | 'squircle' | 'none' | undefined;

export default function FAQPage({ ref, showExpanded, borderStyle }: FAQPageProps) {
  const varBorderRadius =
    borderStyle === 'rounded'
      ? 'rounded-xl'
      : borderStyle === 'squircle'
        ? 'rounded-[45px]'
        : 'rounded-none';

  const varBorderBottomRadius =
    borderStyle === 'rounded'
      ? 'rounded-b-xl'
      : borderStyle === 'squircle'
        ? 'rounded-b-full'
        : 'rounded-b-none';

  const faqItems = [
    {
      question: 'What is Design Frontiers?',
      answer:
        'Design Frontiers is a design sprint event where UCSD designers ideate and iterate on innovative solutions.'
    },
    {
      question: 'Who can participate?',
      answer: 'Anyone with a passion for design and innovation can participate in Design Frontiers.'
    },
    {
      question: 'How big can my team be?',
      answer: 'Answer 3'
    },
    {
      question: 'When is the deadline to register?',
      answer: 'Answer 4'
    },
    {
      question: 'Where is the Design & Innovation Building?',
      answer: 'Answer 5'
    },
    {
      question: 'How should I prepare for Design Frontiers if I have no design experience?',
      answer: 'Answer 6'
    },
    {
      question: 'What should I bring to Design Frontiers?',
      answer: 'Answer 7'
    }
  ];

  function renderFAQ() {
    console.log(borderStyle);
    return (
      <>
        {faqItems.map((item, index) => (
          <Accordion type="single" collapsible className="w-full max-w-[90%] gap-4" key={index}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className={varBorderRadius}>
                <p className="text-start text-lg md:max-w-[66%]">{item.question}</p>
              </AccordionTrigger>
              <AccordionContent borderStyle={borderStyle}>
                <p className="text-md text-start">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </>
    );
  }

  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] w-full pt-[200px] transition-opacity ease-in-out`}
    >
      <div className="flex h-full w-full flex-col items-center">
        {/*Page title and Subtitle*/}
        <PageTitle title="ABOUT" subtitle="Frequently Asked Questions" />
        {/*Accordion*/}
        <div className="md:w-max-[90%] flex h-full w-full flex-col items-center gap-5 pt-[5%] lg:max-w-[60%]">
          {renderFAQ()}
        </div>
      </div>
    </section>
  );
}
