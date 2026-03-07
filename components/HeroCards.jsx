import styles from "./HeroCards.module.css";

const HERO_ROW_ONE = [
  { title: "AI-Powered Document Analysis", metric: "95% Extraction Accuracy" },
  { title: "Protein Variant Intelligence", metric: "75% Expert Alignment" }
];

const HERO_ROW_TWO = [
  { title: "Mobile App with Voice Interface", metric: "40K+ Daily Active Users" },
  { title: "Corporate Website Redesign", metric: "3.2X Lead Generation" }
];

function HeroCard({ title, metric }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardInner}>
        <span className={styles.logo} aria-hidden="true">
          <span className={styles.logoGlyph} />
        </span>

        <div className={styles.textWrap}>
          <p className={styles.title}>{title}</p>
          <p className={styles.metric}>{metric}</p>
        </div>

        <span className={styles.grip} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
    </article>
  );
}

function expandForMarquee(source, minimumCount = 6) {
  if (!Array.isArray(source) || source.length === 0) {
    return [];
  }
  const result = [];
  while (result.length < minimumCount) {
    result.push(...source);
  }
  return result.slice(0, minimumCount);
}

function MarqueeRow({ items, reverse, rowId }) {
  return (
    <div className={styles.rowMask}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {items.map((item, index) => (
          <HeroCard key={`${rowId}-${index}`} title={item.title} metric={item.metric} />
        ))}
        {items.map((item, index) => (
          <HeroCard key={`${rowId}-dup-${index}`} title={item.title} metric={item.metric} />
        ))}
      </div>
    </div>
  );
}

export default function HeroCards({ items = [] }) {
  const safeItems = Array.isArray(items) && items.length ? items : [...HERO_ROW_ONE, ...HERO_ROW_TWO];
  const midpoint = Math.ceil(safeItems.length / 2);
  const rowOne = expandForMarquee(safeItems.slice(0, midpoint), 6);
  const rowTwo = expandForMarquee(safeItems.slice(midpoint), 6);

  return (
    <div className={styles.root} aria-hidden="true">
      <MarqueeRow items={rowOne.length ? rowOne : HERO_ROW_ONE} rowId="row-1" reverse={false} />
      <MarqueeRow items={rowTwo.length ? rowTwo : HERO_ROW_TWO} rowId="row-2" reverse={true} />
    </div>
  );
}
