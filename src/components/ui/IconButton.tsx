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
      className="icon-button"
      onClick={onClick}
      title={title || ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
}
