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
        <div className="primary-triangle absolute left-[-1px] top-[-1px]"></div>
        <div className="primary-triangle absolute right-[-1px] top-[-1px] rotate-90"></div>
        <div className="primary-triangle absolute bottom-[-1px] left-[-1px] rotate-[270deg]"></div>
        <div className="primary-triangle absolute bottom-[-1px] right-[-1px] rotate-180"></div>
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
      fist: 'Judge 1',
      last: 'last 1',
      position: 'Position 1 @ UCSD',
      image: '/JudgeImage.jpg'
    },
    {
      first: 'Judge 2',
      last: 'last 2',
      position: 'Position 2 @ UCSD',
      image: '/JudgeImage.jpg'
    },
    {
      first: 'Judge 3',
      last: 'last 3',
      position: 'Position 3 @ UCSD',
      image: '/JudgeImage.jpg'
    },
    {
      first: 'Judge 4',
      last: 'last 4',
      position: 'Position 4 @ UCSD',
      image: '/JudgeImage.jpg'
    },
    {
      first: 'Judge 5',
      last: 'last 5',
      position: 'Position 5 @ UCSD',
      image: '/JudgeImage.jpg'
    },
    {
      first: 'Judge 6',
      last: 'last 6',
      position: 'Position 6 @ UCSD',
      image: '/JudgeImage.jpg'
    }
  ];

  function renderJudges() {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {judges.map((judge, index) => (
          <div key={index} className={`flex flex-col items-center`}>
            <div className={`relative bg-[var(--card-accent-color)] ${varBorderRadius}`}>
              {renderPrimaryTriangles()}
              <Image
                width={200}
                height={250}
                src={judge.image}
                alt={`${judge.first} ${judge.last}`}
                className={`h-[250px] w-[200px] pb-2 ${varBorderRadius}`}
              />
            </div>
            <p className="text-sm">{judge.position}</p>
            <h3 className="text-lg font-bold">{`${judge.first} ${judge.last}`}</h3>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] w-full pt-[200px] transition-opacity ease-in-out`}
    >
      <PageTitle title="Judges" subtitle="Judges" />
      <div className="flex h-full w-full flex-col items-center pt-[5%]">
        <div className="md:w-max-[90%] flex flex-col items-center gap-5 lg:max-w-[60%]">
          {renderJudges()}
        </div>
      </div>
    </section>
  );
}
