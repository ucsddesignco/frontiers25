import { Ref } from 'react';
import PageTitle from '../PageTitle';
import Image from 'next/image';

type JudgesPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
};

export default function JudgesPage({ ref, showExpanded }: JudgesPageProps) {
  const judges = [
    {
      first: 'Judge 1',
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {judges.map((judge, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={judge.image}
              alt={`${judge.first} ${judge.last}`}
              width="200"
              height="250"
              className="pb-2"
            />
            <h3 className="flex flex-col items-center text-lg font-bold">
              <span>{judge.first}</span>
              <span> {judge.last}</span>
            </h3>
            <p className="text-sm">{judge.position}</p>
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
      <PageTitle title="Judges" subtitle="Meet our judges" />
      <div className="flex h-full w-full flex-col items-center pt-[5%]">
        <div className="md:w-max-[90%] flex flex-col items-center gap-5 md:max-w-[60%]">
          {renderJudges()}
        </div>
      </div>
    </section>
  );
}
