import { Ref } from 'react';
import PageTitle from '../PageTitle';
import '../ExpandedCard/ExpandedCard.scss';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { BorderStyle } from '@/app/stores/customizationStore';
import BevelTriangles from '../BevelTriangles/BevelTriangles';

type FAQPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
  borderStyle?: BorderStyle;
  borderRadius: string;
};

export default function FAQPage({ ref, showExpanded, borderStyle, borderRadius }: FAQPageProps) {
  const faqItems = [
    {
      question: 'What is Design Frontiers?',
      answer: `Design Frontiers is Design Co's annual designathon—a two-day sprint where teams tackle real-world challenges with creative design solutions. Final projects are presented to a panel of industry professionals who offer feedback and select standout work.`
    },
    {
      question: 'Who can participate?',
      answer:
        'UCSD students of all levels and backgrounds are encouraged to apply! Additionally, teams are not assigned, so we encourage you to form your own groups in advance! Teams can be up to four members.'
    },
    {
      question: 'What will the event look like?',
      answer:
        'This year, Design Frontiers will be split over the course of two days. The event kicks off Friday night with lightning talks, an overview of the event, and the start of the design sprint. On Day 2, teams will continue working before presenting to the judges panel at 2:00 PM. The event will conclude with finalist presentations and a closing ceremony.'
    },
    {
      question: 'When is the deadline to register?',
      answer:
        'May 7th @ 11:59 PM - Space is limited to 80 participants, so we recommend signing up early. Waitlisted students are not guaranteed a spot, but we will keep you updated if there are any openings!'
    },
    {
      question: 'Where is the Design and Innovation Building (DIB)?',
      answer:
        'DIB is located next to the Pepper Canyon Trolley Station, with entrances located across from the Structural Materials and Engineering building or next to the Regents Loop shuttle stop. Design Frontiers will be hosted in Room 208 on the second floor.'
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
            style={
              {
                '--triangle-primary-color': 'var(--card-primary-color)',
                '--triangle-accent-color': 'var(--card-button-color)'
              } as React.CSSProperties
            }
          >
            {borderStyle === 'beveled' && <BevelTriangles />}
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className={borderRadius}>
                <p className="max-w-[80%] text-start text-[22px]">{item.question}</p>
              </AccordionTrigger>
              <AccordionContent borderStyle={borderStyle}>
                <p className="">{item.answer}</p>
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
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] w-full scroll-m-24 transition-opacity ease-in-out`}
    >
      <div className="flex h-full w-full flex-col items-center">
        <PageTitle title="ABOUT" subtitle="Frequently Asked Questions" />
        <div className="md:w-max-[90%] flex h-full w-full flex-col items-center gap-5 pt-12 lg:max-w-[60%]">
          {renderFAQ()}
        </div>
      </div>
    </section>
  );
}
