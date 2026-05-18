type ExperienceTimelinePeriodProps = {
  period: string;
};

export function ExperienceTimelinePeriod({ period }: ExperienceTimelinePeriodProps) {
  const [periodStart, periodEnd] = period.split(/\s+—\s+/);

  return (
    <div className="flex flex-col items-center text-center text-[0.72rem] leading-tight text-text-muted sm:text-sm">
      <span>{periodStart}</span>
      <span aria-hidden="true" className="my-1 h-1.5 w-1.5 rounded-full bg-text-muted/70" />
      <span>{periodEnd ?? periodStart}</span>
    </div>
  );
}
