import { Ref, useState } from 'react';
import PageTitle from '../PageTitle';

type AgendaPageProps = {
  ref: Ref<HTMLDivElement>;
  showExpanded: boolean;
};

export default function AgendaPage({ ref, showExpanded }: AgendaPageProps) {
  const [activeDay, setActiveDay] = useState(1);

  function renderDay1() {
    return (
      <div className='relative h-full w-full flex flex-col justify-between items-center gap-5'>
        <div className="absolute top-0 left-1/2 h-[90%] w-[4px] bg-[var(--card-accent-color)] z-0"></div>
        <div className='h-[80%] w-[85%] flex flex-col items-center z-10 justify-between gap-10'>
          {/* Item 1*/}
          <div className='border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>7:00 PM</p>
            <h1>Evenet Kickoff</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
          {/* Item 2 */}
          <div className='border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>7:30 PM</p>
            <h1>Lighting Talks</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
          {/* Item 3 */}
          <div className='border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>8:00 PM</p>
            <h1>Sprint Starts</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
          {/* Item 4 */}
          <div className='mt-[15%] border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>11:00 PM</p>
            <h1>Closing Remarks</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
        </div>
      </div>
    );
  }

  function renderDay2(){
    return(
        <div className='relative h-full w-full flex flex-col justify-between items-center gap-5'>
        <div className="absolute top-0 left-1/2 h-[90%] w-[4px] bg-[var(--card-accent-color)] z-0"></div>
        <div className='h-[80%] w-[85%] flex flex-col items-center z-10 justify-between gap-10'>
          {/* Item 1*/}
          <div className='mb-[15%] border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>7:00 PM</p>
            <h1>Evenet Kickoff</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
          {/* Item 2 */}
          <div className='border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>7:30 PM</p>
            <h1>Lighting Talks</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
          {/* Item 3 */}
          <div className='border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>8:00 PM</p>
            <h1>Sprint Starts</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
          {/* Item 4 */}
          <div className='border-[4px] border-[var(--card-accent-color)] bg-[var(--card-primary-color)] text-center p-5'>
            <p>11:00 PM</p>
            <h1>Closing Remarks</h1>
            <p>Designers will begin with registration and sign-in, an introduction to the event, and energizing lighting talks.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={ref}
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} w-full transition-opacity duration-[0.2s] duration-300 ease-in-out`}
    >
      <PageTitle title="Agenda" subtitle="What’s the timeline of our design sprint?" />
      <div className='h-full w-full flex flex-col items-center pt-[5%]'>
        {/* Days */}
        <div className='h-[15%] w-full md:max-w-[50%] sm:max-w-[90%] flex flex-row justify-center p-5'>
          <button 
            className={`${activeDay === 1 ? 'bg-[var(--card-button-color)] duration-500 ease-in-out' : 'duration-500 ease-in-out bg-transparent'} h-full w-1/2`}
            onClick={() => setActiveDay(1)}  
          >
            <h1 className='text-center text-[2rem] font-bold uppercase lg:text-[3rem]'>DAY 1</h1>
            <p>7:00pm - 11:00pm</p>
          </button>
          <button 
            className={`${activeDay === 2 ? 'bg-[var(--card-button-color)] duration-500 ease-in-out' : 'duration-500 ease-in-out bg-transparent'} h-full w-1/2`}
            onClick={() => setActiveDay(2)}  
          >
            <h1 className='text-center text-[2rem] font-bold uppercase lg:text-[3rem]'>DAY 2</h1>
            <p>7:00pm - 11:00pm</p>
          </button>
        </div>
        {/* Time Line*/}
        <div
          className={`duration-2000 ease-in-out ${
            activeDay === 1 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        >
          {activeDay === 1 && renderDay1()}
        </div>
        <div
          className={`duration-2000 ease-in-out ${
            activeDay === 2 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        >
          {activeDay === 2 && renderDay2()}
        </div>
      </div>
    </section>
  );
}
