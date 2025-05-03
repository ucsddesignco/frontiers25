import { APPLY_LINK } from '../constants';
import { SectionId } from '../ExpandedCard/ExpandedCard';

type HeroPageProps = {
  scrollToSection: (id: SectionId) => void;
  showExpanded: boolean;
  CardLogo: React.ReactNode;
};

const NAV_BUTTONS = [
  { id: 'faq', label: 'FAQ' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'judges', label: 'Judges' }
];

export default function HeroPage({ scrollToSection, showExpanded, CardLogo }: HeroPageProps) {
  return (
    <section
      className={`${showExpanded ? 'opacity-100' : 'opacity-0'} hero-page mx-auto flex h-[100dvh] min-h-[100dvh] w-full max-w-[80%] flex-col items-center transition-none md:max-w-[40rem] md:justify-center md:pb-24`}
    >
      <div className="w-full pt-32 md:pt-0">{CardLogo}</div>
      <div className="flex h-full w-full flex-col justify-between md:block md:h-auto">
        <div className="flex w-full flex-col justify-between gap-[2.4rem] pt-6 md:flex-row">
          <div className="flex justify-between">
            <div>
              <p className="date w-fit transition-transform duration-card ease-in-out">May 9-10</p>
              <p className="location w-fit transition-transform duration-card ease-in-out">
                DIB 208
              </p>
            </div>
            {/* Mobile time */}
            <p className="mobile-time flex h-fit w-fit flex-col transition-transform duration-card ease-in-out md:hidden">
              <span className="mobile-time-1 w-fit">by UCSD</span>
              <span className="mobile-time-2 w-fit">Design Co</span>
            </p>
          </div>
          <p className="time hidden flex-col transition-transform duration-card ease-in-out md:flex">
            <span className="time-1 w-fit">by UCSD</span>
            <span className="time-2 w-fit">Design Co</span>
          </p>
          <p className="flex flex-col text-center">
            <span className="description-1 w-fit transition-transform duration-card ease-in-out">
              Create, test, & iterate on ideas
            </span>
            <span className="description-2 w-fit transition-transform duration-card ease-in-out">
              {' '}
              at our annual design-a-thon.
            </span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 pb-12 md:gap-8 md:px-36 md:pb-0 md:pt-16">
          <div className="relative flex justify-between opacity-0 md:opacity-100">
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

          <p className="mx-auto md:hidden">Scroll to see more</p>
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
