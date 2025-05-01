import { Ref } from 'react';
import PageTitle from '../PageTitle';

type FAQPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
};

export default function FAQPage({ ref, showExpanded }: FAQPageProps) {
  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] h-screen w-full transition-opacity ease-in-out`}
    >
      <PageTitle title="FAQ" subtitle="Frequently Asked Questions" />
    </section>
  );
}
