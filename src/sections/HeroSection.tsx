import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { siteContent } from "../content/siteContent";
import {
  bodyTextClass,
  eyebrowClass,
  panelClass,
  panelInnerClass,
  revealClass,
} from "./sectionStyles";

type HeroSectionProps = {
  onToggleTheme: () => void;
  resolvedTheme: "dark" | "light";
};

export function HeroSection({ onToggleTheme, resolvedTheme }: HeroSectionProps) {
  return (
    <section className={panelClass} id="hero">
      <div className={`${panelInnerClass} grid gap-8`}>
        <div
          className={`flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center ${revealClass}`}
        >
          <p className={eyebrowClass}>{siteContent.hero.eyebrow}</p>
          <div className="flex flex-wrap items-center gap-[0.6rem]">
            <ThemeSwitcher onToggle={onToggleTheme} resolvedTheme={resolvedTheme} />
          </div>
        </div>

        <div className="max-w-[980px]">
          <h1
            className={`m-0 max-w-[11ch] text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.92] ${revealClass}`}
          >
            {siteContent.hero.title}
          </h1>
          <p className={`mt-[1.8rem] max-w-[44rem] ${bodyTextClass} ${revealClass}`}>
            {siteContent.hero.description}{" "}
            <a
              className="text-text-primary underline decoration-[var(--color-text-muted)] underline-offset-4 transition-colors duration-180 hover:text-text-muted"
              href={siteContent.hero.meta.sourceHref}
              rel="noreferrer"
              target="_blank"
            >
              {siteContent.hero.meta.sourceLabel}
            </a>
          </p>
          <div
            className={`mt-8 flex flex-wrap gap-x-6 gap-y-[0.85rem] text-[0.94rem] text-[color-mix(in_srgb,var(--color-text-primary)_84%,transparent)] ${revealClass}`}
          >
            <span>{siteContent.hero.meta.location}</span>
            <span>{siteContent.hero.meta.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
