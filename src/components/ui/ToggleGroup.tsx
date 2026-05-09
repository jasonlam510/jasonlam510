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
  return (
    <div aria-label={ariaLabel} className="segmented-control" role="group">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            aria-label={option.label}
            aria-pressed={isActive}
            className={`control-chip control-chip-${visualStyle}`}
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
