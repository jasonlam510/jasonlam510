import hospitalAuthorityLogo from "../../../assets/images/hospital-authority-logo.jpg";
import ourskyLogo from "../../../assets/images/oursky-logo.jpg";

type ExperienceTimelineDotProps =
  | {
      emoji: string;
      iconAlt?: never;
      iconKey?: never;
    }
  | {
      emoji?: never;
      iconAlt: string;
      iconKey: "hospitalAuthority" | "oursky";
    };

const logoByIconKey = {
  hospitalAuthority: hospitalAuthorityLogo,
  oursky: ourskyLogo,
} as const;

export function ExperienceTimelineDot(props: ExperienceTimelineDotProps) {
  if (props.emoji !== undefined) {
    return (
      <div className="glass-card relative z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated p-1.5 before:hidden sm:h-12 sm:w-12 sm:rounded-2xl sm:p-2">
        <span aria-hidden="true" className="text-[1.4rem] leading-none sm:text-[1.65rem]">
          {props.emoji}
        </span>
      </div>
    );
  }

  return (
    <img
      alt={props.iconAlt}
      className="relative z-10 h-10 w-10 object-contain sm:h-12 sm:w-12"
      height={48}
      loading="lazy"
      src={logoByIconKey[props.iconKey]}
      width={48}
    />
  );
}
