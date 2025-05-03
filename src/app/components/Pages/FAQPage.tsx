import { Ref } from 'react';
import PageTitle from '../PageTitle';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

type FAQPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
};

export default function FAQPage({ ref, showExpanded }: FAQPageProps) {
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
    return (
      <>
        {faqItems.map((item, index) => (
          <Accordion
            type="single"
            collapsible
            className="relative w-full max-w-[90%] gap-4"
            key={index}
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                <p className="text-start text-lg md:max-w-[66%]">{item.question}</p>
              </AccordionTrigger>
              <AccordionContent>
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
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] w-full transition-opacity ease-in-out`}
    >
      <div className="flex h-full w-full flex-col items-center">
        {/*Page title and Subtitle*/}
        <PageTitle title="ABOUT" subtitle="Frequently Asked Questions" />
        {/*Accordion*/}
        <div className="md:w-max-[90%] flex h-full w-full flex-col items-center gap-5 pt-[5%] md:max-w-[60%]">
          {renderFAQ()}
        </div>
      </div>
    </section>
  );
}
