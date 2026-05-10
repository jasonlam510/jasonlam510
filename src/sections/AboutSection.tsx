import { useTranslation } from "react-i18next";
import {
  bodyTextClass,
  eyebrowClass,
  headingClass,
  panelClass,
  panelInnerClass,
  revealClass,
} from "./sectionStyles";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className={`${panelClass} panel-surface`} id="about">
      <div
        className={`${panelInnerClass} grid items-start gap-8 md:grid-cols-2 md:gap-[clamp(2rem,5vw,5rem)]`}
      >
        <div className={revealClass}>
          <p className={eyebrowClass}>{t("about.eyebrow")}</p>
          <h2 className={headingClass}>{t("about.title")}</h2>
        </div>
        <div className={`pt-3 ${revealClass}`}>
          <p className={bodyTextClass}>{t("about.body.first")}</p>
          <p className={`${bodyTextClass} mt-6`}>{t("about.body.second")}</p>
        </div>
      </div>
    </section>
  );
}
