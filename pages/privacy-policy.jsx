import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { getSiteContent } from "../lib/siteContent";
import styles from "../styles/LegalPage.module.css";

const APP_POLICIES = [
  {
    href: "/saraswati-vandana-privacy-policy",
    eyebrow: "App Privacy Policy",
    title: "Saraswati Vandana",
    description:
      "Privacy details for reminders, usage analytics, circle participation data, and in-app devotional progress.",
    accent: "saraswati"
  },
  {
    href: "/hanuman-chalisa-11x-sankalp-privacy-policy",
    eyebrow: "App Privacy Policy",
    title: "Hanuman Chalisa: 11x Sankalp",
    description:
      "Privacy details for devotional counters, reminders, analytics, ads, device information, and optional shared feature data.",
    accent: "hanuman"
  }
];

export default function PrivacyPolicyHubPage({ navigation, footer }) {
  return (
    <div className={styles.pageShell}>
      <Navbar navigation={navigation} />
      <main className={`${styles.page} ${styles.hubPage}`} aria-label="Privacy Policy">
        <section className={styles.hubContainer}>
          <div className={styles.hubIntro}>
            <p className={styles.hubEyebrow}>Privacy</p>
            <h1 className={styles.hubTitle}>Privacy policies for the apps we are building.</h1>
            <p className={styles.hubDescription}>
              Vector Veda publishes app-specific privacy policies separately so each product can explain
              its data use clearly. Choose the app below to view the applicable policy.
            </p>
            <div className={styles.hubFeatureRow}>
              <span className={styles.hubFeaturePill}>Readable legal format</span>
              <span className={styles.hubFeaturePill}>App-specific scope</span>
              <span className={styles.hubFeaturePill}>Updated versioning</span>
            </div>
          </div>

          <div className={styles.hubDivider} aria-hidden="true" />

          <div className={styles.hubGrid}>
            {APP_POLICIES.map((policy) => (
              <a
                key={policy.href}
                href={policy.href}
                className={styles.policyCard}
                data-accent={policy.accent}
              >
                <span className={styles.policyCardEyebrow}>{policy.eyebrow}</span>
                <h2 className={styles.policyCardTitle}>{policy.title}</h2>
                <p className={styles.policyCardDescription}>{policy.description}</p>
                <span className={styles.policyCardCta}>Read policy</span>
              </a>
            ))}
          </div>

          <div className={styles.hubDivider} aria-hidden="true" />

          <div className={styles.hubNote}>
            <p className={styles.hubNoteText}>
              If you have privacy-related questions across any Vector Veda app, contact{" "}
              <a href="mailto:support@vectorveda.in">support@vectorveda.in</a>.
            </p>
          </div>
        </section>
      </main>
      <FooterSection
        brandName={footer.brandName}
        brandTagline={footer.brandTagline}
        copyrightText={footer.copyrightText}
        navLinks={footer.navLinks}
        resourceLinks={footer.resourceLinks}
        socialLinks={footer.socialLinks}
      />
    </div>
  );
}

export async function getStaticProps() {
  const { navigation, footer } = getSiteContent();
  return {
    props: {
      navigation,
      footer
    }
  };
}
