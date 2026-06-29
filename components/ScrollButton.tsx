"use client";

export default function ScrollButton({
  children,
  targetId = "waitlist",
  className,
}: {
  children: React.ReactNode;
  targetId?: string;
  className?: string;
}) {
  return (
    <button
      onClick={() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
      }
      className={className}
    >
      {children}
    </button>
  );
}
