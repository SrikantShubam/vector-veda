import Head from "next/head";
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

const SITE_TITLE = "Vector Veda | AI Product Design & Engineering";
const SITE_DESCRIPTION =
  "Vector Veda designs sharp product experiences and builds practical AI systems for fintech, web, mobile, and automation teams.";
const DEFAULT_SITE_URL = "https://vectorveda.online";

export default function MirrorRoutePage({ navigation, footer, homepage, siteUrl }) {
  const canonicalUrl = siteUrl || DEFAULT_SITE_URL;
  const logoUrl = `${canonicalUrl}/logo-vector-veda.png`;
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vector Veda",
    url: canonicalUrl,
    logo: logoUrl,
    description: SITE_DESCRIPTION,
    email: "vector.veda.dev@gmail.com",
    telephone: "+916202130675",
    areaServed: "Global",
    knowsAbout: [
      "AI automation",
      "AI product design",
      "Fintech website design",
      "Flutter app development",
      "Mining federation website strategy",
      "Document intelligence workflows"
    ]
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vector Veda",
    url: canonicalUrl,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: "Vector Veda",
      url: canonicalUrl
    }
  };

  return (
    <div className={styles.phase4Root}>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vector Veda" />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:image:secure_url" content={logoUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="408" />
        <meta property="og:image:height" content="612" />
        <meta property="og:image:alt" content="Vector Veda logo" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={logoUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </Head>
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
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

  return {
    props: {
      navigation,
      footer,
      homepage,
      siteUrl
    }
  };
}
