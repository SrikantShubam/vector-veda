import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { renderMarkdownToHtml } from "../lib/markdown";
import { getSiteContent } from "../lib/siteContent";
import styles from "../styles/LegalPage.module.css";

const GUARDIAN_DATA_DELETION_MARKDOWN = `
**Last updated:** April 2, 2026

Guardian allows users to request deletion of their personal data.

## Who can request deletion

You may request deletion if you are:

- the child / guardian account holder
- the parent / elder account holder
- a person authorized to act on behalf of an account holder, where permitted by law

## What deletion means

When we process a valid deletion request, we will delete or de-identify personal data associated with your Guardian account, except where we must retain certain information for legal, security, fraud-prevention, billing, dispute-resolution, or compliance purposes.

Data that may be deleted includes:

- account profile information
- family-linking records
- medication schedules and adherence records
- health reading entries and uploaded images
- protection and alert history
- manually submitted screenshots or text
- app-related stored records associated with your account

Data that may be retained for a limited period where required:

- transaction or subscription records required for accounting or tax purposes
- security, abuse-prevention, and fraud-investigation logs
- records needed to comply with legal obligations
- limited backup copies that are deleted on a rolling schedule

## How to request deletion

To request deletion, email us at:  
[privacy@vectorveda.com](mailto:privacy@vectorveda.com)

Use the subject line:  
**Guardian Data Deletion Request**

Please include:

- your full name
- the email address or phone number associated with your Guardian account
- whether you are the child / guardian or parent / elder user
- if relevant, the linked family member name
- a short statement confirming that you want your Guardian data deleted

We may ask you to verify your identity before completing the request.

## How long it takes

We aim to respond within **10 business days** and complete valid deletion requests within the period required by applicable law.

## Important effects of deletion

If your data is deleted:

- your Guardian account may be permanently closed
- linked family connections may stop working
- medication reminders, alerts, and safety features may stop functioning
- deleted data may not be recoverable

## In-app deletion

If Guardian later adds an in-app account deletion feature, that feature may also be used where available. Until then, email is the supported deletion channel unless otherwise stated in the app.

## Contact

If you have questions about deletion requests, contact:

**Vector Veda**  
**Privacy:** [privacy@vectorveda.com](mailto:privacy@vectorveda.com)  
**Support:** [support@vectorveda.in](mailto:support@vectorveda.in)
`;

export default function GuardianDataDeletionPage({ navigation, footer, page }) {
  return (
    <div className={styles.pageShell}>
      <Navbar navigation={navigation} />
      <main className={styles.page} aria-label="Delete Your Guardian Data">
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
  const page = {
    title: "Delete Your Guardian Data",
    body: GUARDIAN_DATA_DELETION_MARKDOWN,
    html: renderMarkdownToHtml(GUARDIAN_DATA_DELETION_MARKDOWN)
  };

  return {
    props: {
      navigation,
      footer,
      page
    }
  };
}
