import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { revealClass } from "../../sections/sectionStyles";
import { CompanyExperienceCard } from "./CompanyExperienceCard";
import { ExperienceTimelineDot } from "./ExperienceTimelineDot";
import { ExperienceTimelinePeriod } from "./ExperienceTimelinePeriod";

export type ExperienceItem = {
  company: string;
  description: string;
  period: string;
  role: string;
  tags: readonly string[];
} & (
  | {
      emoji: string;
      iconAlt?: never;
      iconKey?: never;
    }
  | {
      emoji?: never;
      iconAlt: string;
      iconKey: "hospitalAuthority" | "oursky";
    }
);

type ExperienceTimelineProps = {
  items: readonly ExperienceItem[];
};

const connectorSx = {
  backgroundColor: "color-mix(in srgb, var(--app-text) 28%, transparent)",
  width: "2px",
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <Timeline
      position="right"
      sx={{
        "--experience-count": items.length,
        m: 0,
        mt: 3,
        p: 0,
        "& .MuiTimelineItem-root": {
          minHeight: "calc(clamp(32rem, 58vh, 48rem) / var(--experience-count))",
        },
        "& .MuiTimelineItem-root:before": { display: "none" },
      }}
    >
      {items.map((item, index) => (
        <TimelineItem
          className={revealClass}
          key={`${item.company}-${item.period}`}
          sx={{ alignItems: "stretch" }}
        >
          <TimelineOppositeContent
            sx={{
              alignItems: "flex-start",
              display: "flex",
              flex: "0 0 clamp(3.6rem, 18vw, 6.8rem)",
              justifyContent: "center",
              px: 0,
              pt: 1.5,
              pb: 0,
            }}
          >
            <ExperienceTimelinePeriod period={item.period} />
          </TimelineOppositeContent>

          <TimelineSeparator sx={{ alignItems: "center", minHeight: "100%" }}>
            <TimelineConnector
              sx={{
                ...connectorSx,
                flexGrow: 0,
                height: "0.75rem",
                opacity: index === 0 ? 0 : 1,
              }}
            />
            <TimelineDot
              sx={{
                backgroundColor: "transparent",
                border: 0,
                boxShadow: "none",
                display: "grid",
                height: { xs: "2.5rem", sm: "3rem" },
                m: 0,
                p: 0,
                placeItems: "center",
                width: { xs: "2.5rem", sm: "3rem" },
              }}
            >
              <ExperienceTimelineDot {...item} />
            </TimelineDot>
            <TimelineConnector
              sx={{
                ...connectorSx,
                flexGrow: 1,
                opacity: index === items.length - 1 ? 0 : 1,
              }}
            />
          </TimelineSeparator>

          <TimelineContent sx={{ py: 0, pr: 0 }}>
            <CompanyExperienceCard
              company={item.company}
              description={item.description}
              role={item.role}
              tags={item.tags}
            />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
