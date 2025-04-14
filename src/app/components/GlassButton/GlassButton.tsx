import './GlassButton.scss';

export default function GlassButton({
  text,
  className,
  children
}: {
  text: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button className={`cursor-pointer ${className} glass-button`}>
      <div id="top-highlight"></div>
      {children}
      <p>{text}</p>
    </button>
  );
}
