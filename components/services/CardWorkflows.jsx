import styles from "../ServicesSection.module.css";
import CardShell from "./CardShell";
import { WorkflowIcon } from "./icons";
import {
  FaBolt,
  FaChartLine,
  FaDatabase,
  FaFileLines,
  FaLink,
  FaRobot
} from "react-icons/fa6";

const outcomes = [
  { title: "Data Cleanup & Sync", metric: "22% churn rate decreased", icon: FaDatabase },
  { title: "Post-Meeting Action Items", metric: "3X recurring revenue", icon: FaFileLines },
  { title: "Content to Social Captions", metric: "26% conversion increased", icon: FaChartLine },
  { title: "Lead Routing Bot", metric: "18% response time reduced", icon: FaRobot },
  { title: "CRM Sync Bridge", metric: "31% ops efficiency increase", icon: FaLink },
  { title: "Revenue Nudges", metric: "24% conversion increased", icon: FaBolt }
];

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgb(153,153,153)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.outcomeArrow}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function CardWorkflows({ content }) {
  const title = content?.title || "Mobile Product Development";
  const description =
    content?.description || "Production-grade Flutter applications with reliability, localization, and monetization built in.";
  const dynamicOutcomes =
    Array.isArray(content?.bullets) && content.bullets.length
      ? content.bullets.map((bullet, index) => ({
          title: bullet,
          metric: "Production-ready execution",
          icon: outcomes[index % outcomes.length].icon
        }))
      : outcomes;
  const loopedOutcomes = [...dynamicOutcomes, ...dynamicOutcomes];

  return (
    <CardShell
      icon={WorkflowIcon}
      title={title}
      description={description}
      className={styles.cardWorkflows}
      markers={["active", "active", "active", "muted"]}
    >
      <div className={`${styles.featureUI} ${styles.outcomeList}`}>
        <div className={styles.outcomeTicker} aria-label="Workflow outcomes">
          <div className={styles.outcomeTrack}>
            {loopedOutcomes.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={`${item.title}-${index}`} className={styles.outcomeItem}>
                  <div className={styles.outcomeItemInner}>
                    <div className={styles.outcomeRow}>
                      <div className={styles.outcomeLogoBox} aria-hidden="true">
                        <Icon className={styles.outcomeLogoIcon} />
                      </div>
                      <div className={styles.outcomeHeading}>
                        <h4>{item.title}</h4>
                        <p>{item.metric}</p>
                      </div>
                    </div>
                    <ChevronRight />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CardShell>
  );
}
