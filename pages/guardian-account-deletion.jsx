import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { renderMarkdownToHtml } from "../lib/markdown";
import { getSiteContent } from "../lib/siteContent";
import styles from "../styles/LegalPage.module.css";

const GUARDIAN_ACCOUNT_DELETION_MARKDOWN = `
**Last updated:** April 2, 2026

Guardian allows users to request deletion of their account and associated personal data.

This page applies to the Guardian app operated by **Vector Veda**.

## Who can request account deletion

You may request account deletion if you are:

- the child / guardian account holder
- the parent / elder account holder
- a person legally authorized to act on behalf of the account holder, where permitted by applicable law

## How to request account deletion

To request account deletion, email us at:

[privacy@vectorveda.com](mailto:privacy@vectorveda.com)

Use the subject line:  
**Guardian Account Deletion Request**

Please include:

- your full name
- the email address or phone number linked to your Guardian account
- whether you are the child / guardian or parent / elder user
- if applicable, the linked family member name
- a short statement confirming that you want your Guardian account deleted

We may ask you to verify your identity before processing the request.

## What happens when your account is deleted

If your account deletion request is approved and completed:

- your Guardian account will be permanently closed
- linked child / parent relationships may be removed
- medication reminders, alerts, and other Guardian features will stop working
- your access to the app and associated account records may end permanently

## What data is deleted

We will delete or de-identify personal data associated with your account, which may include:

- account profile information
- email address and phone number
- family linking and pairing records
- medication schedules and adherence records
- health reading entries and uploaded images
- protection alerts and event history
- manually submitted screenshots or text
- app-related stored content associated with your account

## What data may be kept

Some information may be retained for a limited period where necessary for:

- legal compliance
- fraud prevention and abuse detection
- security investigations
- billing, tax, accounting, or dispute-resolution obligations
- backup and disaster recovery processes with rolling deletion schedules

If any data is retained, it will be retained only for as long as reasonably necessary or legally required.

## Retention timing

We aim to respond to valid deletion requests within **10 business days** and complete deletion within the time required by applicable law.

In some cases, limited residual copies may remain in secure backups for a short retention period before permanent deletion.

## Deleting your account versus deleting some data

This page is for full account deletion.

If you want to request deletion of specific data without deleting your entire account, contact:
[privacy@vectorveda.com](mailto:privacy@vectorveda.com)

## Contact

If you have questions about account deletion, contact:

**Vector Veda**  
**Privacy:** [privacy@vectorveda.com](mailto:privacy@vectorveda.com)  
**Support:** [support@vectorveda.in](mailto:support@vectorveda.in)
`;

export default function GuardianAccountDeletionPage({ navigation, footer, page }) {
  return (
    <div className={styles.pageShell}>
      <Navbar navigation={navigation} />
      <main className={styles.page} aria-label="Delete Your Guardian Account">
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
    title: "Delete Your Guardian Account",
    body: GUARDIAN_ACCOUNT_DELETION_MARKDOWN,
    html: renderMarkdownToHtml(GUARDIAN_ACCOUNT_DELETION_MARKDOWN)
  };

  return {
    props: {
      navigation,
      footer,
      page
    }
  };
}
