type PageTitleProps = {
  title: string;
  subtitle: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <>
      <h2 className="text-center text-[5rem] font-bold uppercase">{title}</h2>
      <p className="text-center text-base">{subtitle}</p>
    </>
  );
}
