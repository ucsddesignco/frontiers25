type PageTitleProps = {
  title: string;
  subtitle: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <>
      <h2 className="text-center text-[4rem] font-bold uppercase leading-[1.25] md:text-[5rem]">
        {title}
      </h2>
      <p className="text-center text-base">{subtitle}</p>
    </>
  );
}
