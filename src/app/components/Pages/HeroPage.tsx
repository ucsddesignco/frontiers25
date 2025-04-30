import { APPLY_LINK } from '../constants';
import { SectionId } from '../ExpandedCard/ExpandedCard';

type HeroPageProps = {
  scrollToSection: (id: SectionId) => void;
  showExpanded: boolean;
};

const NAV_BUTTONS = [
  { id: 'faq', label: 'FAQ' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'judges', label: 'Judges' }
];

export default function HeroPage({ scrollToSection, showExpanded }: HeroPageProps) {
  return (
    <section
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} hero-page mx-auto flex h-[100dvh] w-full max-w-[80%] flex-col items-center transition-none lg:max-w-[40rem] lg:justify-center lg:pb-24`}
    >
      <div className="w-full pt-32 lg:pt-0">
        <svg
          className="svg transition-transform duration-card ease-in-out"
          width="100%"
          viewBox="0 0 263 99"
          fill="var(--card-accent-color)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.32753 98.3984C1.10477 98.3984 0.493394 97.7871 0.493394 96.5643V2.43673C0.493394 1.21398 1.10477 0.602606 2.32753 0.602606H47.0803C48.2541 0.602606 49.2324 0.993888 50.0149 1.77645L64.688 16.4495C65.5194 17.281 65.9352 18.2592 65.9352 19.3841V79.5436C65.9352 80.7174 65.5194 81.6956 64.688 82.4782L50.0149 97.1512C49.2324 97.9827 48.2541 98.3984 47.0803 98.3984H2.32753ZM24.9974 78.8099H38.4232C40.4774 78.8099 41.5046 77.4404 41.5046 74.7015V24.2996C41.5046 21.5117 40.4774 20.1178 38.4232 20.1178H24.9974V78.8099ZM84.8038 98.3984C83.581 98.3984 82.9697 97.7871 82.9697 96.5643V2.43673C82.9697 1.21398 83.581 0.602606 84.8038 0.602606H135.059C136.282 0.602606 136.893 1.21398 136.893 2.43673V18.2836C136.893 19.5064 136.282 20.1178 135.059 20.1178H107.4V44.6217H131.391C132.613 44.6217 133.225 45.2331 133.225 46.4559V62.3028C133.225 63.5255 132.613 64.1369 131.391 64.1369H107.4V96.5643C107.4 97.7871 106.789 98.3984 105.566 98.3984H84.8038ZM146.983 98.3984C145.76 98.3984 145.149 97.7871 145.149 96.5643L145.076 72.7206C145.076 72.2315 145.173 71.8402 145.369 71.5468C145.565 71.2044 145.834 70.8131 146.176 70.3729L169.359 42.1273V27.2342L146.176 18.2836C145.442 18.0391 145.076 17.3054 145.076 16.0827V2.43673C145.076 1.21398 145.687 0.602606 146.91 0.602606H165.471C166.156 0.602606 166.694 0.700425 167.085 0.896063C167.476 1.09171 167.917 1.3118 168.406 1.55635L192.616 12.1943C193.252 12.4389 193.619 12.7812 193.717 13.2214C193.815 13.6616 193.863 14.2974 193.863 15.1289V46.8227C193.863 47.3118 193.741 47.6786 193.497 47.9232C193.301 48.1188 193.008 48.4856 192.616 49.0236L169.653 76.9758V79.9104H195.918C197.14 79.9104 197.752 80.5218 197.752 81.7445V96.5643C197.752 97.7871 197.14 98.3984 195.918 98.3984H146.983ZM205.608 98.3984C204.385 98.3984 203.773 97.7871 203.773 96.5643V81.8913C203.773 80.6685 204.385 80.0571 205.608 80.0571H238.329V59.2948H205.608C204.385 59.2948 203.773 58.6834 203.773 57.4606L203.847 2.43673C203.847 1.21398 204.458 0.602606 205.681 0.602606H260.998C262.221 0.602606 262.832 1.21398 262.832 2.43673V17.1098C262.832 18.3325 262.221 18.9439 260.998 18.9439H228.351V39.7063H260.998C262.221 39.7063 262.832 40.3176 262.832 41.5404V79.6903C262.832 80.5707 262.539 81.3533 261.952 82.038L246.399 97.5181C245.861 98.105 245.103 98.3984 244.124 98.3984H205.608Z" />
        </svg>
      </div>
      <div className="flex h-full w-full flex-col justify-between lg:block lg:h-auto">
        <div className="flex w-full flex-col justify-between gap-[2.4rem] pt-6 lg:flex-row">
          <div className="flex justify-between">
            <div>
              <p className="date w-fit transition-transform duration-card ease-in-out">Wed May 8</p>
              <p className="location w-fit transition-transform duration-card ease-in-out">
                DIB Room 208
              </p>
            </div>
            {/* Mobile time */}
            <div className="lg:hidden">
              <p className="mobile-time h-fit w-fit transition-transform duration-card ease-in-out">
                9am-5pm
              </p>
            </div>
          </div>
          <p className="time hidden h-fit w-fit transition-transform duration-card ease-in-out lg:block">
            9am-5pm
          </p>
          <p
            data-expanded-description
            className="description transition-transform duration-card ease-in-out"
          >
            A 2-day sprint where UCSD designers ideate and iterate.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 pb-12 lg:gap-8 lg:px-36 lg:pb-0 lg:pt-16">
          <div className="relative flex justify-between opacity-0 lg:opacity-100">
            <button className="learn-more bg-[var(--card-button-color] invisible absolute left-0 top-0 w-full rounded-full p-2">
              Learn More
            </button>
            {NAV_BUTTONS.map(({ id, label }) => (
              <button
                key={'expanded-button-' + id}
                onClick={() => scrollToSection(id as SectionId)}
                className="relative cursor-pointer rounded-[51px] bg-[var(--card-button-color)] px-6 py-2 outline-dashed outline-[2px] outline-[var(--card-accent-color)]"
              >
                <span
                  className={`${id}-bg absolute inset-0 z-[0] rounded-full bg-[var(--card-button-color)] transition-[transform,width] duration-card ease-in-out`}
                ></span>
                <span
                  className={`${id}-text relative z-[1] mx-auto block w-fit transition-transform duration-card ease-in-out`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          <p className="mx-auto lg:hidden">Scroll to see more</p>
          <button
            onClick={() => {
              window.open(APPLY_LINK, '_blank');
            }}
            className="relative cursor-pointer rounded-full p-2 transition-transform duration-card ease-in-out"
          >
            <span className="apply-bg absolute inset-0 z-[0] h-full w-full rounded-full bg-[var(--card-accent-color)] transition-[transform,width] duration-card ease-in-out"></span>
            <span className="apply-text relative z-[1] mx-auto block w-fit text-[var(--card-primary-color)] transition-transform duration-card ease-in-out">
              Apply
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
