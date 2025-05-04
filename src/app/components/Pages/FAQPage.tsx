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
      answer: `Design Frontiers is Design Co's annual designathon—a two-day sprint where teams tackle real-world challenges with creative design solutions. Final projects are presented to a panel of industry professionals who offer feedback and select standout work.`
    },
    {
      question: 'Who can participate?',
      answer: `UCSD students of all levels and backgrounds are encouraged to apply! Additionally, teams are not assigned, so we encourage you to form your own groups in advance! Teams can be up to four members.`
    },
    {
      question: 'What will the event look like?',
      answer: `This year, Design Frontiers will be split over the course of two days. The event kicks off Friday night with lightning talks, an overview of the event, and the start of the design sprint. On Day 2, teams will continue working before presenting to the judges panel at 2:00 PM. The event will conclude with finalist presentations and a closing ceremony.`
    },
    {
      question: 'When is the registration deadline?',
      answer: `Space is limited to 80 participants, so we recommend signing up early. Waitlisted students are not guaranteed a spot, but we will keep you updated if there are any openings!`
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
