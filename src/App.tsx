import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { StarfieldCanvas } from "./components/StarfieldCanvas";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useThemePreference } from "./hooks/useThemePreference";

function App() {
  const { t } = useTranslation();
  const snapContainerRef = useRef<HTMLElement | null>(null);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const { resolvedTheme, toggleTheme } = useThemePreference();
  const projectCards = [
    {
      className: "bento-wide",
      description: t("projects.cards.macroPulse.description"),
      tag: t("projects.cards.macroPulse.tag"),
      title: t("projects.cards.macroPulse.title"),
    },
    {
      className: "",
      description: t("projects.cards.hiddenZodiac.description"),
      tag: t("projects.cards.hiddenZodiac.tag"),
      title: t("projects.cards.hiddenZodiac.title"),
    },
    {
      className: "",
      description: t("projects.cards.signalField.description"),
      tag: t("projects.cards.signalField.tag"),
      title: t("projects.cards.signalField.title"),
    },
    {
      className: "bento-tall",
      description: t("projects.cards.executiveOs.description"),
      tag: t("projects.cards.executiveOs.tag"),
      title: t("projects.cards.executiveOs.title"),
    },
    {
      className: "",
      description: t("projects.cards.designEngine.description"),
      tag: t("projects.cards.designEngine.tag"),
      title: t("projects.cards.designEngine.title"),
    },
    {
      className: "bento-wide",
      description: t("projects.cards.quantAtlas.description"),
      tag: t("projects.cards.quantAtlas.tag"),
      title: t("projects.cards.quantAtlas.title"),
    },
  ];

  useEffect(() => {
    setScrollElement(snapContainerRef.current);
  }, []);

  useEffect(() => {
    const scrollContainer = snapContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const revealNodes = Array.from(scrollContainer.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, root: scrollContainer },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const panelClass = "flex min-h-screen snap-start items-center px-5 py-6 sm:px-6 lg:px-12";
  const panelInnerClass = "mx-auto w-full max-w-[1200px]";
  const eyebrowClass = "m-0 text-[0.82rem] uppercase tracking-[0.22em] text-text-muted";
  const headingClass =
    "m-0 max-w-[10ch] text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] max-md:max-w-none";
  const bodyTextClass = "text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.7] text-text-muted";
  const revealClass = "reveal";
  const cardClass =
    "glass-card relative min-h-[220px] overflow-hidden rounded-[24px] border border-border-subtle p-6";

  return (
    <div className="relative">
      <StarfieldCanvas scrollElement={scrollElement} />

      <main
        className="relative z-10 h-screen min-h-screen snap-y snap-proximity overflow-y-auto md:snap-mandatory"
        ref={snapContainerRef}
      >
        <section className={panelClass} id="hero">
          <div className={`${panelInnerClass} grid gap-8`}>
            <div
              className={`flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center ${revealClass}`}
            >
              <p className={eyebrowClass}>{t("hero.eyebrow")}</p>
              <div className="flex flex-wrap items-center gap-[0.6rem]">
                <ThemeSwitcher onToggle={toggleTheme} resolvedTheme={resolvedTheme} />
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

        <section className={`${panelClass} panel-surface`} id="projects">
          <div className={panelInnerClass}>
            <div className={revealClass}>
              <p className={eyebrowClass}>{t("projects.eyebrow")}</p>
              <h2 className={headingClass}>{t("projects.title")}</h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {projectCards.map((card) => (
                <article
                  className={`${cardClass} ${revealClass} ${
                    card.className === "bento-wide" ? "xl:col-span-2" : ""
                  } ${card.className === "bento-tall" ? "xl:row-span-2 xl:min-h-[460px]" : ""}`.trim()}
                  key={card.title}
                >
                  <span className="text-[0.75rem] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-text-muted)_92%,transparent)]">
                    {card.tag}
                  </span>
                  <h3 className="mt-[0.6rem] mb-3 text-[1.45rem]">{card.title}</h3>
                  <p className={bodyTextClass}>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

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
      </main>
    </div>
  );
}

export default App;
