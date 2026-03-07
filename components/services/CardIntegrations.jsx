import styles from "../ServicesSection.module.css";
import CardShell from "./CardShell";
import { IntegrationIcon } from "./icons";
import {
  FaBolt,
  FaChartLine,
  FaCloud,
  FaCodeBranch,
  FaDatabase,
  FaGear,
  FaGoogleDrive,
  FaHubspot,
  FaLink,
  FaRobot,
  FaSalesforce,
  FaSlack
} from "react-icons/fa6";

const integrationGlyphs = [
  FaRobot,
  FaHubspot,
  FaSlack,
  FaSalesforce,
  FaDatabase,
  FaGoogleDrive,
  FaCloud,
  FaCodeBranch,
  FaGear,
  FaLink,
  FaChartLine,
  FaBolt
];

export default function CardIntegrations({ content }) {
  const title = content?.title || "Scientific & Domain-Specific Product Design";
  const description =
    content?.description || "Interfaces for complex domains that stay powerful while becoming usable and teachable.";

  return (
    <CardShell
      icon={IntegrationIcon}
      title={title}
      description={description}
      markers={["active", "active", "muted", "muted"]}
      className={styles.cardIntegrations}
    >
      <div className={`${styles.featureUI} ${styles.integrationSurface}`}>
        <div className={styles.integrationTicker} aria-hidden="true">
          {[0, 1].map((rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className={`${styles.integrationTrack} ${rowIndex === 1 ? styles.integrationTrackReverse : ""}`.trim()}
            >
              {Array.from({ length: 12 }).map((_, cellIndex) => {
                const Icon = integrationGlyphs[rowIndex * 6 + (cellIndex % 6)];
                return (
                  <span key={`cell-${rowIndex}-${cellIndex}`} className={styles.integrationCell}>
                    <span className={styles.integrationCellDot}>
                      <Icon className={styles.integrationCellIcon} />
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}
