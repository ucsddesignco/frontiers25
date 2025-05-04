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

  function renderAccentTriangles() {
    if (borderStyle !== 'beveled') return null;
    return (
      <>
        <div className="accent-triangle absolute left-[-0.5px] top-[-0.5px] z-10"></div>
        <div className="accent-triangle absolute right-[-0.5px] top-[-0.5px] z-10 rotate-90"></div>
        <div className="accent-triangle absolute bottom-[-0.5px] left-[-0.5px] z-10 rotate-[270deg]"></div>
        <div className="accent-triangle absolute bottom-[-0.5px] right-[-0.5px] z-10 rotate-180"></div>
      </>
    );
  }

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

  function renderDay1() {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-5">
        <div className="absolute left-1/2 top-0 z-0 h-[85%] w-[4px] bg-[var(--card-accent-color)]"></div>
        <div
          className={`z-10 flex h-[80%] w-[85%] flex-col items-center justify-between gap-10 ${varBorderRadius}`}
        >
          {/* Item 1 */}
          <div className={`relative mb-[15%] bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">7:00 PM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Event Kickoff
              </h1>
              <p>
                Designers will begin with registration and sign-in, an introduction to the event,
                and energizing lighting talks.
              </p>
            </div>
          </div>
          {/* Item 2 */}
          <div className={`relative mb-[15%] bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">8:00 PM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Sprint Starts
              </h1>
              <p>
                Prompt is revealed and participants begin designing to address the prompt and
                prepare to present their solution.
              </p>
            </div>
          </div>
          {/* Item 3 */}
          <div className={`relative mb-[15%] bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">9:00 PM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Day 1 Wrap-up
              </h1>
              <p>
                After some closing announcements, participants will leave to get some rest and
                prepare for day 2!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDay2() {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-5">
        <div className="absolute left-1/2 top-0 z-0 h-[85%] w-[4px] bg-[var(--card-accent-color)]"></div>
        <div
          className={`z-10 flex h-[80%] w-[85%] flex-col items-center justify-between gap-10 ${varBorderRadius}`}
        >
          {/* Item 1 */}
          <div className={`relative mb-[1%] w-full bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">10:00 AM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Event Kickoff
              </h1>
              <p>
                Designers will begin with registration and sign-in, an introduction to the event,
                and energizing lighting talks.
              </p>
            </div>
          </div>
          {/* Item 2 */}
          <div className={`relative mb-[20%] w-full bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">10:30 AM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Sprint Starts
              </h1>
              <p>
                Prompt is revealed and participants begin designing to address the prompt and
                prepare to present their solution.
              </p>
            </div>
          </div>
          {/* Item 3 */}
          <div className={`relative mb-[5%] w-full bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">2:00 PM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Sprint Ends
              </h1>
              <p>Teams will present their designs to our panel of judges.</p>
            </div>
          </div>
          {/* Item 4 */}
          <div className={`relative mb-[5%] w-full bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">3:00 PM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Finalist Revealed
              </h1>
              <p>Finalist presentations will begin.</p>
            </div>
          </div>
          {/* Item 5 */}
          <div className={`relative mb-[5%] w-full bg-[var(--card-primary-color)]`}>
            {renderAccentTriangles()}
            <div
              className={`items-center overflow-clip border-[4px] border-[var(--card-accent-color)] p-10 text-center ${varBorderRadius}`}
            >
              <p className="text-center text-[1.3rem] font-bold uppercase">3:30 PM</p>
              <h1 className="text-center text-[2rem] font-bold uppercase leading-[1.25] lg:text-[3rem]">
                Closing Ceremony
              </h1>
              <p>3 winners will be announced and prizes will be announced.</p>
            </div>
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
      <div className="flex h-full w-full flex-col items-center pt-5">
        {/* Days */}
        <div className="h-[200px] w-full flex-row justify-center p-5 sm:max-w-[90%] md:max-w-[50%]">
          <button
            className={`${activeDay === 1 ? 'relative bg-[var(--card-button-color)] duration-500 ease-in-out' : 'bg-transparent duration-500 ease-in-out'} h-[150px] w-1/2 ${varBorderRadius}`}
            onClick={() => setActiveDay(1)}
          >
            {renderPrimaryTriangles()}
            <h1 className="text-center text-[2rem] font-bold uppercase lg:text-[3rem]">DAY 1</h1>
            <p>7:00pm - 11:00pm</p>
          </button>
          <button
            className={`${activeDay === 2 ? 'relative bg-[var(--card-button-color)] duration-500 ease-in-out' : 'bg-transparent duration-500 ease-in-out'} h-[150px] w-1/2 ${varBorderRadius}`}
            onClick={() => setActiveDay(2)}
          >
            {renderPrimaryTriangles()}
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
