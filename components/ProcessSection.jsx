"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import styles from "./ProcessSection.module.css";

const STEPS = [
  {
    number: "//01",
    title: "Subscribe",
    description: "Choose your plan and launch in minutes\n—upgrade, pause, or cancel anytime."
  },
  {
    number: "//02",
    title: "Analyze",
    description:
      "We begin by auditing your workflows to pinpoint where AI can streamline and elevate operations."
  },
  {
    number: "//03",
    title: "Build & Implement",
    description:
      "Next, our engineers craft bespoke AI solutions for your company with clear quality and safety checks."
  },
  {
    number: "//04",
    title: "Test & Optimise",
    description:
      "You approve or request revisions - we iterate fast, polishing each build until it performs."
  }
];

export default function ProcessSection({ section }) {
  const defaultSection = {
    label: "Process",
    title: "Our Approach",
    description: "From automation to advanced analytics, we bring your vision to life with custom AI.",
    ctaLabel: "View Our Work",
    ctaHref: "#case-studies",
    steps: STEPS
  };
  const data = { ...defaultSection, ...(section || {}) };
  const steps = Array.isArray(data.steps) && data.steps.length ? data.steps : STEPS;

  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const section = sectionRef.current;
    if (!section) return undefined;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height + viewport;
      const raw = (viewport - rect.top) / total;
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const parallaxAxis = scrollProgress * 2 - 1;

  return (
    <section ref={sectionRef} className={styles.section} id="process" aria-label="Process">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.leftCol}>
            <div className={styles.headingMeta}>
              <p className={styles.headingMetaSlash}>//</p>
              <p className={styles.headingMetaText}>
                <span>{data.label}</span>
              </p>
            </div>

            <h2 className={styles.headingTitle}>
              <span>{data.title}</span>
            </h2>

            <p className={styles.headingDescription}>{data.description}</p>

            <Button href={data.ctaHref} className={styles.cta}>
              {data.ctaLabel}
            </Button>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.grid}>
              {steps.map((step, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                const amplitude = 22 - index * 2;
                return (
                  <article
                    key={step.number}
                    className={styles.card}
                    style={{
                      transform: `translateY(${Math.round(parallaxAxis * amplitude * direction)}px)`
                    }}
                  >
                    <div className={styles.cardTop}>
                      <p className={styles.number}>{step.number}</p>
                      <div className={styles.progressDots} aria-hidden="true">
                        {Array.from({ length: 4 }).map((_, dotIndex) => (
                          <span
                            key={`${step.number}-${dotIndex}`}
                            className={`${styles.dot} ${dotIndex <= index ? styles.dotActive : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={styles.cardSpacer} />
                    <div className={styles.cardBottom}>
                      <h3 className={styles.title}>{step.title}</h3>
                      <p className={styles.description}>{step.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
