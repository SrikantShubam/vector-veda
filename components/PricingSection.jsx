"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaFireFlameCurved } from "react-icons/fa6";
import Button from "./Button";
import styles from "./PricingSection.module.css";

const PLANS = [
  {
    name: "Starter",
    tagline: "Start fast, prove value.",
    monthlyPrice: "$499",
    yearlyPrice: "$4999",
    monthlySuffix: "/ month",
    yearlySuffix: "/ annually",
    features: [
      "One pilot (auto/chat/voice)",
      "Full audit + 90-day plan",
      "Light workflow review",
      "Up to 2 integrations",
      "Core guardrails & prompts",
      "Analytics lite (usage/KPIs)",
      "Email support (48h) + 1 training"
    ]
  },
  {
    name: "Pro",
    tagline: "Scale pilots into systems.",
    monthlyPrice: "$799",
    yearlyPrice: "$7999",
    monthlySuffix: "/ month",
    yearlySuffix: "/ annually",
    popular: true,
    features: [
      "Two pilots or 1 expanded build",
      "Full audit + 90-day plan",
      "Up to 5 integrations + webhooks",
      "Guardrails + human handoff",
      "Priority support (24-48h) + Slack",
      "Two workshops + handover docs",
      "RAG setup + monitoring"
    ]
  },
  {
    name: "Enterprise",
    tagline: "Custom, secure, enterprise-grade.",
    monthlyPrice: "$999",
    yearlyPrice: "$9999",
    monthlySuffix: "/ month",
    yearlySuffix: "/ annually",
    features: [
      "Three+ solutions across teams",
      "Security & compliance review",
      "Unlimited integrations (scope)",
      "Advanced evals & ROI dashboards",
      "High-availability setup + runbooks",
      "Dedicated PM + on-call support",
      "Training program + playbooks/SOPs"
    ]
  }
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const toggleRef = useRef(null);
  const monthlyRef = useRef(null);
  const yearlyRef = useRef(null);
  const [yearly, setYearly] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toggleMetrics, setToggleMetrics] = useState({ x: 6, w: 85 });

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = toggleRef.current;
    const selected = yearly ? yearlyRef.current : monthlyRef.current;
    if (!host || !selected) return undefined;

    const compute = () => {
      // Match Framer: pill extends ~14px beyond the button on both sides.
      const x = Math.round(selected.offsetLeft - 14);
      const w = Math.round(selected.offsetWidth + 28);
      setToggleMetrics((prev) => (prev.x === x && prev.w === w ? prev : { x, w }));
    };

    const raf = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", compute);
    };
  }, [yearly]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${visible ? styles.visible : ""}`} id="pricing" aria-label="Pricing">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.headingMeta}>
            <p className={styles.headingMetaSlash}>//</p>
            <p className={styles.headingMetaText}>
              <span>Pricing</span>
            </p>
          </div>
          <div className={styles.heading}>
            <h2 className={styles.headingTitle}>
              <span>Pricing Plans</span>
            </h2>
            <p className={styles.headingDescription}>
              From first AI steps to enterprise scale - clear, flexible pricing with expert support.
            </p>
          </div>
        </div>

        <div className={styles.billingToggle} role="tablist" aria-label="Billing period" ref={toggleRef}>
          <div
            className={styles.toggleBg}
            aria-hidden="true"
            style={{ width: `${toggleMetrics.w}px`, transform: `translateX(${toggleMetrics.x}px)` }}
          />
          <button
            ref={monthlyRef}
            type="button"
            role="tab"
            aria-selected={!yearly}
            className={styles.toggleBtn}
            onClick={() => setYearly(false)}
          >
            <span>Monthly</span>
          </button>
          <button
            ref={yearlyRef}
            type="button"
            role="tab"
            aria-selected={yearly}
            className={styles.toggleBtn}
            onClick={() => setYearly(true)}
          >
            <span>Yearly (-20%)</span>
          </button>
        </div>

        <div className={styles.cards}>
          {PLANS.map((plan, index) => (
            <article
              key={plan.name}
              className={`${styles.card} ${visible ? styles.cardVisible : ""} ${plan.popular ? styles.cardPopular : ""}`}
              style={{ animationDelay: `${index * 0.11}s` }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardInfoShell}>
                  <div className={styles.titlePriceRow}>
                    <div className={styles.titleCol}>
                      <p className={styles.planName}>
                        <span>{plan.name}</span>
                      </p>
                    </div>
                    <div className={styles.priceCol}>
                      <div className={styles.priceWrap}>
                        <div className={`${styles.priceRail} ${yearly ? styles.priceRailYearly : ""}`}>
                          <div className={styles.priceRow}>
                            <h3 className={styles.price}>{plan.monthlyPrice}</h3>
                            <p className={styles.priceSuffix}>{plan.monthlySuffix}</p>
                          </div>
                          <div className={styles.priceRow}>
                            <h3 className={styles.price}>{plan.yearlyPrice}</h3>
                            <p className={styles.priceSuffix}>{plan.yearlySuffix}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className={styles.tagline}>{plan.tagline}</p>

                  <Button href="#contact" className={styles.cta}>
                    Get in touch
                  </Button>
                </div>

                {plan.popular ? (
                  <div className={styles.badge}>
                    <FaFireFlameCurved className={styles.badgeIcon} aria-hidden="true" />
                    <span>Popular</span>
                  </div>
                ) : null}

                <div className={styles.featurePanel}>
                  <ul className={styles.features}>
                    {plan.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        <span className={styles.featureIconWrap} aria-hidden="true">
                          <FaCheck className={styles.featureIcon} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
