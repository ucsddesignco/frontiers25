import { Ref } from 'react';
import PageTitle from '../PageTitle';

type AgendaPageProps = {
  ref: Ref<HTMLDivElement>;
  isExpanded: boolean;
};

export default function AgendaPage({ ref, isExpanded }: AgendaPageProps) {
  return (
    <section
      ref={ref}
      className={`${isExpanded ? 'opacity-100' : 'opacity-0'} h-screen w-full transition-opacity duration-[0.2s] ease-in-out`}
    >
      <PageTitle title="Agenda" subtitle="What’s the timeline of our design sprint?" />
    </section>
  );
}
