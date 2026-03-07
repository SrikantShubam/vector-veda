import Button from "./Button";
import HeroCards from "./HeroCards";
import styles from "./Hero.module.css";

const DEFAULT_HERO = {
  statusText: "Available for Work",
  titleLine1: "Beautiful Products.",
  titleLine2: "Engineered Intelligence.",
  subtitle: "We design exceptional user experiences and build custom AI systems that solve real problems.",
  primaryCtaLabel: "View Our Work",
  primaryCtaHref: "#case-studies",
  secondaryCtaLabel: "Get in touch",
  secondaryCtaHref: "#contact",
  featuredImpacts: []
};

export default function Hero({ hero = DEFAULT_HERO }) {
  const data = { ...DEFAULT_HERO, ...hero };

  return (
    <section className={styles.hero} id="header" aria-label="Hero">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>{data.statusText}</span>
        </div>

        <h1 className={styles.title}>
          <span>{data.titleLine1}</span>
          <span>{data.titleLine2}</span>
        </h1>

        <p className={styles.subtitle}>{data.subtitle}</p>

        <div className={styles.actions}>
          <Button href={data.primaryCtaHref}>{data.primaryCtaLabel}</Button>
          <Button href={data.secondaryCtaHref}>{data.secondaryCtaLabel}</Button>
        </div>
      </div>
      <HeroCards items={data.featuredImpacts} />
    </section>
  );
}
