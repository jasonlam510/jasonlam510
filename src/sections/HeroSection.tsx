import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
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
  const { t } = useTranslation();

  return (
    <section className={panelClass} id="hero">
      <div className={`${panelInnerClass} grid gap-8`}>
        <div
          className={`flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center ${revealClass}`}
        >
          <p className={eyebrowClass}>{t("hero.eyebrow")}</p>
          <div className="flex flex-wrap items-center gap-[0.6rem]">
            <ThemeSwitcher onToggle={onToggleTheme} resolvedTheme={resolvedTheme} />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="max-w-[980px]">
          <h1
            className={`m-0 max-w-[11ch] text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.05em] ${revealClass}`}
          >
            {t("hero.title")}
          </h1>
          <p className={`mt-[1.8rem] max-w-[44rem] ${bodyTextClass} ${revealClass}`}>
            {t("hero.description")}
          </p>
          <div
            className={`mt-8 flex flex-wrap gap-x-6 gap-y-[0.85rem] text-[0.94rem] text-[color-mix(in_srgb,var(--color-text-primary)_84%,transparent)] ${revealClass}`}
          >
            <span>{t("hero.meta.location")}</span>
            <span>{t("hero.meta.stack")}</span>
            <span>{t("hero.meta.prompt")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
