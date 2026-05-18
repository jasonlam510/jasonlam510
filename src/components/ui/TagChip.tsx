type TagChipProps = {
  label: string;
};

export function TagChip({ label }: TagChipProps) {
  return (
    <span className="rounded-full border border-border-subtle bg-surface-elevated px-3 py-1.5 text-[0.82rem] text-text-muted">
      {label}
    </span>
  );
}
