import { useEffect, useRef, useState } from "react";
import styles from "./MetrixSection.module.css";

const METRICS = [
  {
    value: "70",
    suffix: "+",
    label: "Satisfied clients",
    description:
      "AI teams launched faster and closed more deals with a landing page engineered to convert."
  },
  {
    value: "100",
    suffix: "%",
    label: "Satisfaction rate",
    description: "5-star post-launch ratings backed by NPS/CSAT—clean edits, zero vendor lock-in"
  },
  {
    value: "11",
    suffix: "+",
    label: "Years of experience",
    description: "Years in AI SaaS & agency work distilled into sections that turn traffic into demos."
  },
  {
    value: "80",
    suffix: "k+",
    label: "Industry recognition",
    description: "Featured in leading design galleries and AI roundups—social proof that builds trust."
  }
];

const DEFAULT_SECTION = {
  label: "Expertise",
  title: "Why Companies Choose Vector Veda",
  description: "Technical founder execution with measurable outcomes across AI, mobile, and web products.",
  items: METRICS
};

export default function MetrixSection({ section = DEFAULT_SECTION }) {
  const data = { ...DEFAULT_SECTION, ...section };
  const metrics = Array.isArray(data.items) && data.items.length ? data.items : METRICS;
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [animatedValues, setAnimatedValues] = useState(() => metrics.map(() => 0));

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return undefined;

    const sectionNode = sectionRef.current;
    if (!sectionNode) return undefined;

    const targets = metrics.map((item) => Number(item.value));
    const durationMs = 1200;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        const nextValues = targets.map((target) => Math.round(target * eased));
        setAnimatedValues(nextValues);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionNode);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [metrics]);

  return (
    <section ref={sectionRef} className={styles.section} id="metrix" aria-label="Metrix">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.headingMeta}>
            <p className={styles.headingMetaSlash}>//</p>
            <p className={styles.headingMetaText}>
              <span>{data.label}</span>
            </p>
          </div>
          <div className={styles.headingMain}>
            <div className={styles.headingTitleWrap}>
              <h2 className={styles.headingTitle}>
                <span>{data.title}</span>
              </h2>
            </div>
            <div className={styles.headingBody}>
              <p className={styles.headingDescription}>{data.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {metrics.map((item, index) => (
            <article key={item.label} className={styles.card} data-border="true">
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <p className={styles.cardNumber}>{`//0${index + 1}`}</p>
                  <div className={styles.progressDots} aria-hidden="true">
                    {Array.from({ length: 4 }).map((_, dotIndex) => (
                      <span
                        key={`metric-${index}-${dotIndex}`}
                        className={`${styles.dot} ${dotIndex <= index ? styles.dotActive : ""}`}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.cardSpacer} />
                <div className={styles.cardBottom}>
                  <div className={styles.numberRow}>
                    <p className={styles.value}>{animatedValues[index]}</p>
                    <p className={styles.suffix}>
                      <span>{item.suffix}</span>
                    </p>
                  </div>
                  <h3 className={styles.label}>{item.label}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
