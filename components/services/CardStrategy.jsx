import styles from "../ServicesSection.module.css";
import CardShell from "./CardShell";
import { StrategyIcon } from "./icons";

const growth = [
  { month: "Jan", value: "+10%" },
  { month: "Feb", value: "+18%" },
  { month: "Mar", value: "+28%" },
  { month: "Apr", value: "+25%" },
  { month: "May", value: "+33%" }
];

const growthWithLevels = (() => {
  const percents = growth.map((item) => Number(item.value.replace(/[^\d.]/g, "")) || 0);
  const maxPercent = Math.max(...percents, 1);
  return growth.map((item, index) => {
    const percent = Number(item.value.replace(/[^\d.]/g, "")) || 0;
    return {
      ...item,
      level: (percent / maxPercent) * 100,
      delay: index * 0.03
    };
  });
})();

export default function CardStrategy({ content }) {
  const title = content?.title || "Web Product Strategy & Conversion";
  const description =
    content?.description || "Conversion-focused websites with measurable outcomes from copy to funnel analytics.";

  return (
    <CardShell
      icon={StrategyIcon}
      title={title}
      description={description}
      className={styles.cardStrategy}
      markers={["active", "active", "active", "active"]}
    >
      <div className={`${styles.featureUI} ${styles.growthFeatureUI} ${styles.growthWrap}`}>
        {growthWithLevels.map((g) => (
          <article
            key={g.month}
            className={styles.growthCell}
            style={{ "--growth-level": `${g.level}%`, "--growth-delay": `${g.delay}s` }}
            tabIndex={0}
            aria-label={`${g.month} growth ${g.value}`}
          >
            <div className={styles.growthBarTrack} aria-hidden="true">
              <span className={styles.growthBarFill} />
            </div>
            <div className={styles.growthMeta}>
              <span className={styles.growthMonth}>{g.month}</span>
              <span className={styles.growthValue}>{g.value}</span>
            </div>
          </article>
        ))}
      </div>
    </CardShell>
  );
}
