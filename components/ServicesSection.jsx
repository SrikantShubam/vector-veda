import CardChatbot from "./services/CardChatbot";
import CardIntegrations from "./services/CardIntegrations";
import CardStrategy from "./services/CardStrategy";
import CardWorkflows from "./services/CardWorkflows";
import styles from "./ServicesSection.module.css";

const DEFAULT_SECTION = {
  label: "Services",
  title: "What We Build",
  description: "We design thoughtful interfaces and engineer custom AI systems.",
  cards: []
};

export default function ServicesSection({ section = DEFAULT_SECTION }) {
  const data = { ...DEFAULT_SECTION, ...section };
  const cards = Array.isArray(data.cards) ? data.cards : [];

  return (
    <section className={styles.section} id="services" aria-label="Services">
      <div className={styles.inner}>
        <header className={styles.headingRow}>
          <div className={styles.headingLeft}>
            <div className={styles.headingLabel}>
              <span className={styles.headingSlash}>//</span>
              <span className={styles.headingText}>{data.label}</span>
            </div>
            <h2 className={styles.headingTitle}>{data.title}</h2>
          </div>
          <p className={styles.headingDescription}>{data.description}</p>
        </header>

        <div className={styles.grid}>
          <CardChatbot content={cards[0]} />
          <CardIntegrations content={cards[1]} />
          <CardWorkflows content={cards[2]} />
          <CardStrategy content={cards[3]} />
        </div>
      </div>
    </section>
  );
}
