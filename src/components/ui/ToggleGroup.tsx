import type { ReactNode } from "react";

type ToggleOption<T extends string> = {
  icon?: ReactNode;
  label: string;
  value: T;
};

type ToggleGroupProps<T extends string> = {
  ariaLabel: string;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  value: T;
  visualStyle?: "icon" | "text";
};

export function ToggleGroup<T extends string>({
  ariaLabel,
  onChange,
  options,
  value,
  visualStyle = "text",
}: ToggleGroupProps<T>) {
  const baseButtonClass =
    "text-text-muted inline-flex items-center justify-center rounded-full bg-transparent transition-[background,color,transform] duration-180";
  const sizeClass =
    visualStyle === "icon"
      ? "min-h-[2.4rem] min-w-[2.4rem] px-[0.45rem] py-[0.45rem]"
      : "px-[0.9rem] py-[0.55rem]";

  return (
    <div
      aria-label={ariaLabel}
      className="flex flex-wrap gap-[0.6rem] rounded-full border border-border-subtle bg-surface-elevated p-[0.3rem] backdrop-blur-[18px]"
      role="group"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            aria-label={option.label}
            aria-pressed={isActive}
            className={`${baseButtonClass} ${sizeClass} ${
              isActive ? "translate-y-[-1px] bg-glass-highlight text-text-primary" : ""
            }`}
            key={option.value}
            onClick={() => onChange(option.value)}
            title={option.label}
            type="button"
          >
            {option.icon ? option.icon : option.label}
            {visualStyle === "icon" ? <span className="sr-only">{option.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
