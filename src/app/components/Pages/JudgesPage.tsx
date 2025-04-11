import { Ref } from 'react';
import PageTitle from '../PageTitle';

type JudgesPageProps = {
  ref: Ref<HTMLDivElement>;
  isExpanded: boolean;
};

export default function JudgesPage({ ref, isExpanded }: JudgesPageProps) {
  return (
    <section
      ref={ref}
      className={`${isExpanded ? 'opacity-100' : 'opacity-0'} h-screen w-full transition-opacity duration-[0.2s] ease-in-out`}
    >
      <PageTitle title="Judges" subtitle="Judges" />
    </section>
  );
}
