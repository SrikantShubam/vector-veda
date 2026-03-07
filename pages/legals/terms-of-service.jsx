import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";
import { getPageContent } from "../../lib/pageContent";
import { getSiteContent } from "../../lib/siteContent";
import styles from "../../styles/LegalPage.module.css";

export default function TermsOfServicePage({ navigation, footer, page }) {
  return (
    <div className={styles.pageShell}>
      <Navbar navigation={navigation} />
      <main className={styles.page} aria-label="Terms Of Service">
        <header className="vectorveda-1vkaxk9" data-vectorveda-name="Legals" id="legals-header">
          <div className="vectorveda-16n7zj8" data-vectorveda-name="Container">
            <div className="vectorveda-1h3qi3d" data-vectorveda-name="Heading">
              <div
                className="vectorveda-1l4jd6s"
                data-vectorveda-name="Heading H2"
                data-vectorveda-component-type="RichTextContainer"
              >
                <h1 className="vectorveda-text vectorveda-styles-preset-1ci6j2u">{page.title}</h1>
              </div>
              <div
                className="vectorveda-6vd47s"
                data-vectorveda-name="Text Main"
                data-vectorveda-component-type="RichTextContainer"
              >
                <div dangerouslySetInnerHTML={{ __html: page.html }} />
              </div>
            </div>
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
  const page = getPageContent("terms-of-service");
  return {
    props: {
      navigation,
      footer,
      page
    }
  };
}
