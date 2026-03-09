"use client";

import { useState } from "react";
import { FaEnvelope, FaGlobe, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/router";
import { resolveSiteHref } from "../lib/resolveHref";
import styles from "./FooterSection.module.css";

const DEFAULT_NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#contact", label: "Contact" }
];

const DEFAULT_RESOURCE_LINKS = [
  { href: "./privacy-policy", label: "Privacy Policy" },
  { href: "./legals/terms-of-service", label: "Terms Of Service" },
  { href: "./404", label: "404 Page" }
];

const ICON_MAP = {
  Globe: FaGlobe,
  Envelope: FaEnvelope,
  Phone: FaPhone,
  Whatsapp: FaWhatsapp
};

const DEFAULT_SOCIALS = [
  { href: "mailto:vector.veda.dev@gmail.com", label: "Email", icon: "Envelope" },
  { href: "tel:6202130675", label: "Call", icon: "Phone" },
  { href: "https://wa.me/916202130675?text=Hey%20I%20am%20coming%20from%20your%20website", label: "WhatsApp", icon: "Whatsapp" }
];

const HONEYPOT_FIELDS = [
  "website",
  "company",
  "message",
  "subject",
  "title",
  "description",
  "feedback",
  "notes",
  "details",
  "remarks",
  "comments"
];

export default function FooterSection({
  brandName = "Vector Veda",
  brandTagline = "Building intelligent, scalable AI solutions from first principles.",
  copyrightText = "(c) 2026, Vector Veda.",
  navLinks = DEFAULT_NAV_LINKS,
  resourceLinks = DEFAULT_RESOURCE_LINKS,
  socialLinks = DEFAULT_SOCIALS
}) {
  const router = useRouter();
  const [subscribeState, setSubscribeState] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = router.pathname || "/";
  const resolvedNavLinks = navLinks.map((item) => ({
    ...item,
    resolvedHref: resolveSiteHref(item.href, pathname)
  }));
  const resolvedResourceLinks = resourceLinks.map((item) => ({
    ...item,
    resolvedHref: resolveSiteHref(item.href, pathname)
  }));

  async function handleSubscribe(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    setIsSubmitting(true);
    setSubscribeState({ type: "", message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const result = await response.json();

      if (!response.ok) {
        setSubscribeState({
          type: "error",
          message: result.error || "Unable to save your email right now."
        });
        return;
      }

      form.reset();
      setSubscribeState({
        type: "success",
        message: "Newsletter subscribed."
      });
    } catch (_) {
      setSubscribeState({
        type: "error",
        message: "Network error. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer id="footer" className={styles.footer} aria-label="Footer">
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <article className={styles.card}>
            <a href="/" className={styles.logoLink} aria-label="Vector Veda Home">
              <img className={styles.logoImage} src="/logo-vector-veda.png" alt="Vector Veda logo" />
              <span className={styles.logoText}>{brandName}</span>
            </a>
            <p className={styles.infoText}>{brandTagline}</p>
            <div className={styles.socialRow}>
              {socialLinks.map((item) => {
                const Icon = ICON_MAP[item.icon] || FaGlobe;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className={styles.socialButton}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Navigation</h3>
            <ul className={styles.linkList}>
              {resolvedNavLinks.map((item) => {
                const chars = Array.from(item.label);
                const spread = chars.length > 1 ? chars.length - 1 : 1;
                return (
                  <li key={item.href}>
                    <a href={item.resolvedHref} className={styles.link} aria-label={item.label}>
                      <span className={styles.linkRoll} aria-hidden="true">
                        {chars.map((char, index) => (
                          <span
                            key={`${item.href}-${index}`}
                            className={styles.linkGlyph}
                            style={{
                              "--char-delay": `${((0.4 * 0.35) / spread) * index}s`
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Resources</h3>
            <ul className={styles.linkList}>
              {resolvedResourceLinks.map((item) => {
                const chars = Array.from(item.label);
                const spread = chars.length > 1 ? chars.length - 1 : 1;
                return (
                  <li key={item.href}>
                    <a href={item.resolvedHref} className={styles.link} aria-label={item.label}>
                      <span className={styles.linkRoll} aria-hidden="true">
                        {chars.map((char, index) => (
                          <span
                            key={`${item.href}-${index}`}
                            className={styles.linkGlyph}
                            style={{
                              "--char-delay": `${((0.4 * 0.35) / spread) * index}s`
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Subscribe</h3>
            <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
              <label className={styles.subscribeInputLabel}>
                <div className={styles.subscribeInputWrapper}>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    aria-label="Your Email"
                    className={styles.subscribeInput}
                  />
                </div>
              </label>
              <div className={styles.subscribeButtonContainer}>
                <button
                  type="submit"
                  aria-label="Form Button"
                  className={styles.subscribeButton}
                  disabled={isSubmitting}
                >
                  <div className={styles.subscribeButtonIconWrap}>
                    <svg
                      className={`${styles.subscribeIcon} ${styles.subscribeIconPrimary}`}
                      role="presentation"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="m18 12-6 6-1.4-1.4 3.6-3.6H6v-2h8.2l-3.6-3.6L12 6z" />
                    </svg>
                    <svg
                      className={`${styles.subscribeIcon} ${styles.subscribeIconSecondary}`}
                      role="presentation"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="m18 12-6 6-1.4-1.4 3.6-3.6H6v-2h8.2l-3.6-3.6L12 6z" />
                    </svg>
                  </div>
                  <div className={styles.subscribeButtonGradient} aria-hidden="true" />
                  <div className={styles.subscribeButtonBackground} aria-hidden="true" />
                </button>
              </div>
              {HONEYPOT_FIELDS.map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  tabIndex={-1}
                  autoComplete="one-time-code"
                  aria-hidden="true"
                  data-1p-ignore="true"
                  data-lpignore="true"
                  data-form-type="other"
                  data-bwignore="true"
                  className={styles.honeypot}
                />
              ))}
              {subscribeState.message ? (
                <p
                  className={`${styles.subscribeStatus} ${
                    subscribeState.type === "success" ? styles.subscribeStatusSuccess : styles.subscribeStatusError
                  }`}
                  role="status"
                >
                  {subscribeState.message}
                </p>
              ) : null}
            </form>
          </article>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copy}>{copyrightText}</p>
          <p className={styles.tbd}>Designed by Vector Veda</p>
        </div>
      </div>
    </footer>
  );
}
