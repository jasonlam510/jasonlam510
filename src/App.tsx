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

  return (
    <div className="page-shell">
      <StarfieldCanvas scrollElement={scrollElement} />

      <main className="snap-container" ref={snapContainerRef}>
        <section className="panel panel-hero" id="hero">
          <div className="panel-inner hero-layout">
            <div className="hero-topbar reveal">
              <p className="eyebrow">{t("hero.eyebrow")}</p>
              <div className="toolbar">
                <ThemeSwitcher onToggle={toggleTheme} resolvedTheme={resolvedTheme} />
                <LanguageSwitcher />
              </div>
            </div>

            <div className="hero-copy">
              <h1 className="display reveal">{t("hero.title")}</h1>
              <p className="lede reveal">{t("hero.description")}</p>
              <div className="hero-meta reveal">
                <span>{t("hero.meta.location")}</span>
                <span>{t("hero.meta.stack")}</span>
                <span>{t("hero.meta.prompt")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="panel panel-about" id="about">
          <div className="panel-inner two-column">
            <div className="section-heading reveal">
              <p className="eyebrow">{t("about.eyebrow")}</p>
              <h2>{t("about.title")}</h2>
            </div>
            <div className="section-copy reveal">
              <p>{t("about.body.first")}</p>
              <p>{t("about.body.second")}</p>
            </div>
          </div>
        </section>

        <section className="panel panel-projects" id="projects">
          <div className="panel-inner">
            <div className="section-heading reveal">
              <p className="eyebrow">{t("projects.eyebrow")}</p>
              <h2>{t("projects.title")}</h2>
            </div>

            <div className="bento-grid">
              {projectCards.map((card) => (
                <article className={`bento-card reveal ${card.className}`.trim()} key={card.title}>
                  <span className="card-tag">{card.tag}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel panel-contact" id="contact">
          <div className="panel-inner contact-layout">
            <div className="section-heading reveal">
              <p className="eyebrow">{t("contact.eyebrow")}</p>
              <h2>{t("contact.title")}</h2>
            </div>
            <div className="contact-card reveal">
              <p className="contact-label">{t("contact.emailLabel")}</p>
              <a href="mailto:jason@example.com">jason@example.com</a>
              <p className="contact-label">{t("contact.focusLabel")}</p>
              <p>{t("contact.focusValue")}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
