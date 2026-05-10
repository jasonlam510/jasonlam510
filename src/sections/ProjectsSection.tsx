import { siteContent } from "../content/siteContent";
import {
  bodyTextClass,
  cardClass,
  eyebrowClass,
  headingClass,
  panelClass,
  panelInnerClass,
  revealClass,
} from "./sectionStyles";

export function ProjectsSection() {
  const projectCards = [
    {
      className: "bento-wide",
      description: siteContent.projects.cards.macroPulse.description,
      tag: siteContent.projects.cards.macroPulse.tag,
      title: siteContent.projects.cards.macroPulse.title,
    },
    {
      className: "",
      description: siteContent.projects.cards.hiddenZodiac.description,
      tag: siteContent.projects.cards.hiddenZodiac.tag,
      title: siteContent.projects.cards.hiddenZodiac.title,
    },
    {
      className: "",
      description: siteContent.projects.cards.signalField.description,
      tag: siteContent.projects.cards.signalField.tag,
      title: siteContent.projects.cards.signalField.title,
    },
    {
      className: "bento-tall",
      description: siteContent.projects.cards.executiveOs.description,
      tag: siteContent.projects.cards.executiveOs.tag,
      title: siteContent.projects.cards.executiveOs.title,
    },
    {
      className: "",
      description: siteContent.projects.cards.designEngine.description,
      tag: siteContent.projects.cards.designEngine.tag,
      title: siteContent.projects.cards.designEngine.title,
    },
    {
      className: "bento-wide",
      description: siteContent.projects.cards.quantAtlas.description,
      tag: siteContent.projects.cards.quantAtlas.tag,
      title: siteContent.projects.cards.quantAtlas.title,
    },
  ];

  return (
    <section className={`${panelClass} panel-surface`} id="projects">
      <div className={panelInnerClass}>
        <div className={revealClass}>
          <p className={eyebrowClass}>{siteContent.projects.eyebrow}</p>
          <h2 className={headingClass}>{siteContent.projects.title}</h2>
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
  );
}
