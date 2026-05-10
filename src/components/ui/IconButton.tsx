import type { ReactNode } from "react";

type IconButtonProps = {
  ariaLabel: string;
  children: ReactNode;
  onClick: () => void;
  title?: string;
};

export function IconButton({ ariaLabel, children, onClick, title }: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className="text-text-primary inline-flex min-h-[2.9rem] min-w-[2.9rem] items-center justify-center rounded-full border border-border-subtle bg-surface-elevated px-[0.55rem] py-[0.55rem] backdrop-blur-[18px] transition-[background,transform,border-color] duration-180 hover:-translate-y-px hover:bg-glass-highlight"
      onClick={onClick}
      title={title || ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
}
