import { Ref } from 'react';
import PageTitle from '../PageTitle';

type AgendaPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
};

export default function AgendaPage({ ref, showExpanded }: AgendaPageProps) {
  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} h-screen w-full transition-opacity duration-[0.2s] ease-in-out`}
    >
      <PageTitle title="Agenda" subtitle="What’s the timeline of our design sprint?" />
    </section>
  );
}
