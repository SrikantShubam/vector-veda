import Button from "../components/Button";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { getSiteContent } from "../lib/siteContent";
import parentStyles from "../styles/HomePhase4.module.css";
import styles from "../styles/NotFoundPage.module.css";

export default function NotFoundPage({ navigation, footer }) {
  return (
    <div className={`${parentStyles.phase4Root} ${styles.pageShell}`}>
      <Navbar navigation={navigation} />
      <main className={styles.main} aria-label="Not Found">
        <header className={styles.hero} id="404-header">
          <div className={styles.container}>
            <section className={styles.panel}>
              <div className={styles.heading}>
                <div className={styles.kicker}>
                  <span className={styles.kickerSlash}>//</span>
                  <span className={styles.kickerText}>404 / Not Found</span>
                </div>
                <p className={styles.errorCode}>ERROR 404</p>
                <h1 className={styles.title}>
                  <span>This page</span>
                  <span>is missing.</span>
                </h1>
                <p className={styles.subtitle}>
                  The route may have changed or the page may no longer exist.
                </p>
              </div>
              <div className={styles.actions}>
                <Button href="/" ariaLabel="Return to Home">
                  Return Home
                </Button>
                <a className={styles.secondaryLink} href="#contact">
                  Contact us
                </a>
              </div>
            </section>
            <div className={styles.metaLine}>
              <span className={styles.metaDot} aria-hidden="true" />
              <p className={styles.metaText}>Use the main navigation or footer links to continue browsing.</p>
            </div>
          </div>
          <div className={styles.background} aria-hidden="true">
            <div className={styles.bgGradientA} />
            <div className={styles.bgGradientB} />
            <div className={styles.bgGradientC} />
            <div className={styles.bgMask} />
          </div>
        </header>
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
