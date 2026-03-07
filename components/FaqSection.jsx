"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";

const FAQ_ITEMS = [
  {
    question: "What does the membership include?",
    answer:
      "The membership gives you unlimited access to our AI tools, regular updates, priority support, and expert resources to help you achieve your business goals."
  },
  {
    question: "How do I get started with your services?",
    answer:
      "Start by selecting a plan and sharing your goals. We run a quick discovery pass, define priorities, and move into build with clear milestones."
  },
  {
    question: "Can I cancel my membership anytime?",
    answer:
      "Yes. You can pause or cancel anytime. We also provide handoff notes so your team keeps momentum if you change plans."
  },
  {
    question: "Do I need technical expertise to use your tools?",
    answer:
      "Not at all. Our systems are built for operators and teams, not just engineers. We include onboarding guidance and practical training."
  },
  {
    question: "Are there additional costs beyond the membership fee?",
    answer:
      "Only when scope expands beyond your selected plan, such as extra integrations or custom infrastructure. Any add-on is approved with you first."
  },
  {
    question: "How often do you release updates?",
    answer:
      "We ship improvements continuously and provide regular checkpoints. Critical fixes are prioritized immediately, while feature updates follow roadmap cadence."
  }
];

const DEFAULT_SECTION = {
  label: "Questions",
  title: "Frequently Asked Questions",
  description: "Clear answers to common client questions about execution, scope, and support.",
  items: FAQ_ITEMS
};

export default function FaqSection({ section = DEFAULT_SECTION }) {
  const data = { ...DEFAULT_SECTION, ...section };
  const items = Array.isArray(data.items) && data.items.length ? data.items : FAQ_ITEMS;
  const [openIndex, setOpenIndex] = useState(3);

  return (
    <section className={styles.section} id="faqs" aria-label="FAQs">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.heading}>
            <div className={styles.headingMeta}>
              <p className={styles.headingMetaSlash}>//</p>
              <p className={styles.headingMetaText}>
                <span>{data.label}</span>
              </p>
            </div>

            <h2 className={styles.headingTitle}>
              <span>{data.title}</span>
            </h2>
          </div>

          <p className={styles.headingDescription}>{data.description}</p>
        </div>

        <div className={styles.faqList}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.questionButton}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex((curr) => (curr === index ? -1 : index))}
                >
                  <h3 className={styles.question}>{item.question}</h3>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <span className={styles.iconHorizontal} />
                    <span className={styles.iconVertical} />
                  </span>
                </button>

                <div className={styles.answerWrap}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
