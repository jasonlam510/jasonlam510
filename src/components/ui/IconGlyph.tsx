import type { ReactNode } from "react";

type IconGlyphProps = {
  children: ReactNode;
};

export function IconGlyph({ children }: IconGlyphProps) {
  return (
    <span aria-hidden="true" className="text-base leading-none">
      {children}
    </span>
  );
}
