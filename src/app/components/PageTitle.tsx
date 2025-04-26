type PageTitleProps = {
  title: string;
  subtitle: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <>
      <h2 className="text-center text-[4rem] font-bold uppercase lg:text-[5rem] leading-[1.25]">{title}</h2>
      <p className="text-center text-base">{subtitle}</p>
    </>
  );
}
