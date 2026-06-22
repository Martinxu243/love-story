import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "button";
}

export default function GlassCard({
  children,
  className = "",
  onClick,
  as = "div",
}: GlassCardProps) {
  const Component = as;
  return (
    <Component
      onClick={onClick}
      className={`glass rounded-card transition-all duration-200 ${
        onClick ? "cursor-pointer active:scale-[0.98] hover:brightness-110" : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}
