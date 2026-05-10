import { useTranslation } from "react-i18next";
import {
  bodyTextClass,
  eyebrowClass,
  headingClass,
  panelClass,
  panelInnerClass,
  revealClass,
} from "./sectionStyles";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className={`${panelClass} panel-surface`} id="contact">
      <div
        className={`${panelInnerClass} grid items-start gap-8 md:grid-cols-2 md:gap-[clamp(2rem,5vw,5rem)]`}
      >
        <div className={revealClass}>
          <p className={eyebrowClass}>{t("contact.eyebrow")}</p>
          <h2 className={headingClass}>{t("contact.title")}</h2>
        </div>
        <div
          className={`glass-card flex min-h-[320px] flex-col justify-center gap-[0.9rem] rounded-[24px] border border-border-subtle p-6 ${revealClass}`}
        >
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-text-muted)_92%,transparent)]">
            {t("contact.emailLabel")}
          </p>
          <a
            className="text-text-primary text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.04em] no-underline"
            href="mailto:jason@example.com"
          >
            jason@example.com
          </a>
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-text-muted)_92%,transparent)]">
            {t("contact.focusLabel")}
          </p>
          <p className={bodyTextClass}>{t("contact.focusValue")}</p>
        </div>
      </div>
    </section>
  );
}
