import { ExperienceTimeline } from "../components/work-experience/ExperienceTimeline";
import { siteContent } from "../content/siteContent";
import {
  eyebrowClass,
  featureLeadPlainClass,
  panelClass,
  panelInnerClass,
  revealClass,
} from "./sectionStyles";

export function WorkExperienceSection() {
  return (
    <section className={`${panelClass} !items-start panel-surface`} id="work-experience">
      <div className={`${panelInnerClass} py-[clamp(4rem,10vh,8rem)]`}>
        <div className={revealClass}>
          <p className={eyebrowClass}>{siteContent.workExperience.eyebrow}</p>
          <p className={`${featureLeadPlainClass} mt-6`}>{siteContent.workExperience.title}</p>
        </div>

        <ExperienceTimeline items={siteContent.workExperience.items} />
      </div>
    </section>
  );
}
