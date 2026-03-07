import CaseStudiesSection from "../components/CaseStudiesSection";
import ContactSection from "../components/ContactSection";
import FaqSection from "../components/FaqSection";
import FooterSection from "../components/FooterSection";
import Hero from "../components/Hero";
import MetrixSection from "../components/MetrixSection";
import Navbar from "../components/Navbar";
import ProcessSection from "../components/ProcessSection";
import ReviewsSection from "../components/ReviewsSection";
import ServicesSection from "../components/ServicesSection";
import { getSiteContent } from "../lib/siteContent";
import styles from "../styles/HomePhase4.module.css";

export default function MirrorRoutePage({ navigation, footer, homepage }) {
  return (
    <div className={styles.phase4Root}>
      <Navbar navigation={navigation} />
      <Hero hero={homepage.hero} />
      <ServicesSection section={homepage.services} />
      <CaseStudiesSection section={homepage.caseStudies} />
      <ProcessSection section={homepage.process} />
      <MetrixSection section={homepage.metrics} />
      <ReviewsSection section={homepage.reviews} />
      <FaqSection section={homepage.faq} />
      <ContactSection section={homepage.contact} />
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
  const { navigation, footer, homepage } = getSiteContent();
  return {
    props: {
      navigation,
      footer,
      homepage
    }
  };
}
