import { bodyTextClass } from "../../sections/sectionStyles";
import { TagChip } from "../ui/TagChip";

type CompanyExperienceCardProps = {
  company: string;
  description: string;
  role: string;
  tags: readonly string[];
};

export function CompanyExperienceCard(props: CompanyExperienceCardProps) {
  return (
    <details className="group w-full">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-[18px] px-2 py-3 outline-none transition-colors hover:bg-glass-highlight/40 focus-visible:ring-2 focus-visible:ring-text-muted/40 sm:gap-4 sm:px-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="m-0 truncate text-[1.05rem] font-semibold text-text-primary sm:text-[1.25rem]">
            {props.company}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{props.role}</p>
        </div>

        <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-subtle text-text-muted group-open:text-text-primary sm:h-8 sm:w-8">
          <span className="absolute h-px w-3 rounded-full bg-current sm:w-3.5" />
          <span className="absolute h-3 w-px rounded-full bg-current group-open:hidden sm:h-3.5" />
        </span>
      </summary>

      <div className="px-2 pt-2 pb-5 sm:px-4">
        <p className={bodyTextClass}>{props.description}</p>

        <div className="flex flex-wrap gap-2 pt-6">
          {props.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </details>
  );
}
