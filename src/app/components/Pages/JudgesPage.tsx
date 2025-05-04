import { Ref } from 'react';
import PageTitle from '../PageTitle';
import Image from 'next/image';

type JudgesPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
  borderStyle?: string;
};

export default function JudgesPage({ ref, showExpanded, borderStyle }: JudgesPageProps) {
  function renderPrimaryTriangles() {
    if (borderStyle !== 'beveled') return null;
    return (
      <>
        <div className="primary-triangle absolute left-[-1px] top-[-1px] z-10"></div>
        <div className="primary-triangle absolute right-[-1px] top-[-1px] z-10 rotate-90"></div>
        <div className="primary-triangle absolute bottom-[-1px] left-[-1px] z-10 rotate-[270deg]"></div>
        <div className="primary-triangle absolute bottom-[-1px] right-[-1px] z-10 rotate-180"></div>
      </>
    );
  }

  const varBorderRadius =
    borderStyle === 'rounded'
      ? 'rounded-xl'
      : borderStyle === 'squircle'
        ? 'rounded-full'
        : 'rounded-none';

  const judges = [
    {
      first: 'Adam',
      last: 'Karnas',
      position: 'Staff Designer & Manager @ Google',
      image: '/AdamKarnas.png'
    },
    {
      first: 'Andrew',
      last: 'Caballero',
      position: 'Product Designer @ Microsoft',
      image: '/AndrewCaballero.png'
    },
    {
      first: 'Anindya',
      last: 'Basu',
      position: 'Senior UX Researcher @ Google',
      image: '/AnindyaBasu.png'
    },
    {
      first: 'Daxter',
      last: 'Zavalza',
      position: 'Gen AI UX Design Lead @ Deloitte',
      image: '/DexterZavalza.png'
    },
    {
      first: 'Key',
      last: 'Monette',
      position: 'Senior Product Designer @ Epic',
      image: '/KayMonette.png'
    }
  ];

  function renderJudges() {
    return (
      <div className="flex max-w-[80%] flex-wrap items-center justify-center gap-10">
        {judges.map((judge, index) => (
          <div key={index} className={`flex h-[330px] w-[200px] flex-col items-center`}>
            <div
              className={`relative h-[250px] w-[200px] bg-[var(--card-accent-color)] ${varBorderRadius}`}
            >
              {renderPrimaryTriangles()}
              <Image
                fill
                src={judge.image}
                alt={`${judge.first} ${judge.last}`}
                className={`object-cover ${varBorderRadius}`}
              />
            </div>
            <h3 className="pt-4 text-[22px] font-bold">{`${judge.first} ${judge.last}`}</h3>
            <p className="w-[90%] text-center">{judge.position}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] w-full transition-opacity ease-in-out`}
    >
      <PageTitle title="Judges" subtitle="Meet Our Judges!" />
      <div className="flex h-full w-full flex-col items-center pt-[5%]">
        <div className="md:w-max-[90%] flex flex-col items-center gap-5 lg:max-w-[60%]">
          {renderJudges()}
        </div>
      </div>
    </section>
  );
}
