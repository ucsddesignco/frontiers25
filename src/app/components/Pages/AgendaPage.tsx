import { Ref, useState } from 'react';
import PageTitle from '../PageTitle';

type AgendaPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
  borderStyle?: string;
};

export default function AgendaPage({ ref, showExpanded, borderStyle }: AgendaPageProps) {
  const [activeDay, setActiveDay] = useState(1);

  const varBorderRadius =
    borderStyle === 'rounded'
      ? 'rounded-xl'
      : borderStyle === 'squircle'
        ? 'rounded-full'
        : 'rounded-none';

  function renderDay1() {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-5">
        <div className="absolute left-1/2 top-0 z-0 h-[90%] w-[4px] bg-[var(--card-accent-color)]"></div>
        <div
          className={`z-10 flex h-[80%] w-[85%] flex-col items-center justify-between gap-10 ${varBorderRadius}`}
        >
          {/* Item 1*/}
          <div className={`relative bg-[var(--card-primary-color)]`}>
            {/* Triangles in corners */}
            <div className="triangle absolute left-0 top-0"></div>
            <div className="triangle absolute right-0 top-0 rotate-90"></div>
            <div className="triangle absolute bottom-0 left-0 rotate-[270deg]"></div>
            <div className="triangle absolute bottom-0 right-0 rotate-180"></div>
            {/* Content wrapper with padding */}
            <div
              className={`border-[4px] border-[var(--card-accent-color)] p-5 text-center ${varBorderRadius}`}
            >
              <p>7:00 PM</p>
              <h1>Event Kickoff</h1>
              <p>
                Designers will begin with registration and sign-in, an introduction to the event,
                and energizing lighting talks.
              </p>
            </div>
          </div>
          {/* Item 2 */}
          <div
            className={`border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>7:30 PM</p>
            <h1>Lighting Talks</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
          {/* Item 3 */}
          <div
            className={`border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>8:00 PM</p>
            <h1>Sprint Starts</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
          {/* Item 4 */}
          <div
            className={`mt-[15%] border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>11:00 PM</p>
            <h1>Closing Remarks</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderDay2() {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-5">
        <div className="absolute left-1/2 top-0 z-0 h-[90%] w-[4px] bg-[var(--card-accent-color)]"></div>
        <div
          className={`z-10 flex h-[80%] w-[85%] flex-col items-center justify-between gap-10 ${varBorderRadius}`}
        >
          {/* Item 1*/}
          <div
            className={`mb-[15%] border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>7:00 PM</p>
            <h1>Evenet Kickoff</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
          {/* Item 2 */}
          <div
            className={`border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>7:30 PM</p>
            <h1>Lighting Talks</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
          {/* Item 3 */}
          <div
            className={`border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>8:00 PM</p>
            <h1>Sprint Starts</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
          {/* Item 4 */}
          <div
            className={`border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] p-5 text-center ${varBorderRadius}`}
          >
            <p>11:00 PM</p>
            <h1>Closing Remarks</h1>
            <p>
              Designers will begin with registration and sign-in, an introduction to the event, and
              energizing lighting talks.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} duration-[0.2s] w-full pt-[200px] transition-opacity ease-in-out`}
    >
      <PageTitle title="Agenda" subtitle="What’s the timeline of our design sprint?" />
      <div className="flex h-full w-full flex-col items-center pt-[5%]">
        {/* Days */}
        <div className="flex h-[15%] w-full flex-row justify-center p-5 sm:max-w-[90%] md:max-w-[50%]">
          <button
            className={`${activeDay === 1 ? 'bg-[var(--card-button-color)] duration-500 ease-in-out' : 'bg-transparent duration-500 ease-in-out'} h-full w-1/2 ${varBorderRadius}`}
            onClick={() => setActiveDay(1)}
          >
            <h1 className="text-center text-[2rem] font-bold uppercase lg:text-[3rem]">DAY 1</h1>
            <p>7:00pm - 11:00pm</p>
          </button>
          <button
            className={`${activeDay === 2 ? 'bg-[var(--card-button-color)] duration-500 ease-in-out' : 'bg-transparent duration-500 ease-in-out'} h-full w-1/2 ${varBorderRadius}`}
            onClick={() => setActiveDay(2)}
          >
            <h1 className="text-center text-[2rem] font-bold uppercase lg:text-[3rem]">DAY 2</h1>
            <p>7:00pm - 11:00pm</p>
          </button>
        </div>
        {/* Time Line*/}
        <div
          className={`duration-2000 ease-in-out ${activeDay === 1 ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        >
          {activeDay === 1 && renderDay1()}
        </div>
        <div
          className={`duration-2000 ease-in-out ${activeDay === 2 ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        >
          {activeDay === 2 && renderDay2()}
        </div>
      </div>
    </section>
  );
}
