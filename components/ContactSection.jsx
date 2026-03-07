"use client";

import { useState } from "react";
import { FaCircleCheck, FaEnvelope, FaLocationDot, FaPhone, FaTriangleExclamation } from "react-icons/fa6";
import Button from "./Button";
import styles from "./ContactSection.module.css";

const CONTACT_INFO = [
  {
    id: "office",
    label: "Office:",
    value: "100 Georgi S. Rakovski Street, Sofia, Bulgaria",
    href: "https://maps.google.com/?q=100+Georgi+S.+Rakovski+Street,+Sofia"
  },
  {
    id: "email",
    label: "Email Us",
    value: "vector.veda.dev@gmail.com",
    href: "mailto:vector.veda.dev@gmail.com"
  },
  {
    id: "phone",
    label: "Call Us",
    value: "6202130675",
    href: "tel:6202130675"
  }
];

function iconFor(id) {
  if (id === "office") return <FaLocationDot aria-hidden="true" />;
  if (id === "email") return <FaEnvelope aria-hidden="true" />;

  return <FaPhone aria-hidden="true" />;
}

const DEFAULT_SECTION = {
  label: "Contact",
  title: "Ready to Build?",
  description:
    "45-minute discovery call. No pitch, just an honest assessment of your problem and what to build next.",
  submitLabel: "Get in touch",
  details: CONTACT_INFO
};

export default function ContactSection({ section = DEFAULT_SECTION }) {
  const data = { ...DEFAULT_SECTION, ...section };
  const details = Array.isArray(data.details) && data.details.length ? data.details : CONTACT_INFO;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    setIsSubmitting(true);
    setSubmitState({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitState({
          type: "error",
          message: result.error || "Unable to send your message right now."
        });
        return;
      }

      form.reset();
      setSubmitState({
        type: "success",
        message: result.warning || "Message sent. We will reply soon."
      });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: "Network error. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.section} id="contact" aria-label="Contact">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.headingMeta}>
            <p className={styles.headingMetaSlash}>//</p>
            <p className={styles.headingMetaText}>
              <span>{data.label}</span>
            </p>
          </div>

          <div className={styles.heading}>
            <h2 className={styles.headingTitle}>
              <span>{data.title}</span>
            </h2>
            <p className={styles.headingDescription}>{data.description}</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.infoGrid}>
            {details.map((item) => (
              <article
                key={item.id}
                className={`${styles.infoCard} ${item.id === "office" ? styles.infoCardWide : ""}`}
              >
                <div className={styles.infoIcon}>{iconFor(item.id)}</div>
                <div className={styles.infoBody}>
                  <h3 className={styles.infoLabel}>{item.label}</h3>
                  <a href={item.href} target="_blank" rel="noreferrer" className={styles.infoValue}>
                    {item.value}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <form className={styles.formCard} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="email" placeholder="your@email.com" required />
              </label>
            </div>

            <label className={styles.field}>
              <span>Company</span>
              <input type="text" name="company" placeholder="Company name" />
            </label>

            <label className={styles.field}>
              <span>Message</span>
              <textarea name="message" rows={6} placeholder="Tell us about your project..." required />
            </label>

            <Button type="submit" className={`${styles.submitButton} ${styles.contactSubmitButton}`}>
              {isSubmitting ? "Sending..." : data.submitLabel}
            </Button>
            {submitState.message ? (
              <div
                className={`${styles.formStatus} ${
                  submitState.type === "success" ? styles.formStatusSuccess : styles.formStatusError
                }`}
                role="status"
                aria-live="polite"
              >
                <span className={styles.formStatusIcon} aria-hidden="true">
                  {submitState.type === "success" ? <FaCircleCheck /> : <FaTriangleExclamation />}
                </span>
                {submitState.message}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
