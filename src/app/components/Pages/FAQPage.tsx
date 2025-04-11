import { Ref } from 'react';
import PageTitle from '../PageTitle';

type FAQPageProps = {
  ref: Ref<HTMLDivElement>;
  isExpanded: boolean;
};

export default function FAQPage({ ref, isExpanded }: FAQPageProps) {
  return (
    <section
      ref={ref}
      className={`${isExpanded ? 'opacity-100' : 'opacity-0'} h-screen w-full transition-opacity duration-[0.2s] ease-in-out`}
    >
      <PageTitle title="FAQ" subtitle="Frequently Asked Questions" />
    </section>
  );
}
