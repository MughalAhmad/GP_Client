export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}