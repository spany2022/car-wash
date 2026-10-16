export default function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}
