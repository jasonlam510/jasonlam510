import { siteContent } from "../content/siteContent";
import profileImage from "../../assets/images/me.webp";
import {
  bodyTextClass,
  eyebrowClass,
  featureLeadClass,
  panelClass,
  panelInnerClass,
  revealClass,
} from "./sectionStyles";

export function AboutSection() {
  return (
    <section className={`${panelClass} panel-surface`} id="about">
      <div
        className={`${panelInnerClass} grid items-start gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[clamp(2rem,5vw,5rem)]`}
      >
        <div className={revealClass}>
          <p className={`${eyebrowClass} mb-4`}>{siteContent.about.eyebrow}</p>
          <div className="glass-card relative overflow-hidden rounded-[28px] border border-border-subtle">
            <img
              alt="My profile pic:)"
              className="block aspect-[4/5] h-full w-full object-cover object-center"
              height={1537}
              loading="lazy"
              src={profileImage}
              width={1023}
            />
          </div>
        </div>
        <div className={`pt-2 md:pt-6 ${revealClass}`}>
          <p className={featureLeadClass}>{siteContent.about.title}</p>
          <p className={`${bodyTextClass} mt-6`}>{siteContent.about.body.second}</p>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.7] text-text-muted marker:text-text-muted">
            {siteContent.about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
