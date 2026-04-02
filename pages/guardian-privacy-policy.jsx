import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";
import { renderMarkdownToHtml } from "../lib/markdown";
import { getSiteContent } from "../lib/siteContent";
import styles from "../styles/LegalPage.module.css";

const GUARDIAN_POLICY_MARKDOWN = `
**Last updated:** April 2, 2026

Guardian ("Guardian", "we", "our", or "us") provides remote care, medication support, safety alerts, and related protection features for families supporting older adults.

This Privacy Policy explains what information we collect, how we use it, when we share it, and the choices available to users of the Guardian mobile application and related services.

## 1. Who this policy applies to

This Privacy Policy applies to:

- child / guardian users who create or manage a Guardian account
- parent / elder users who use Guardian for reminders, alerts, and safety features
- any person whose information is submitted through the app in connection with a family care relationship

**Operator:** Vector Veda  
**Contact:** [support@vectorveda.in](mailto:support@vectorveda.in)  
**Business Address:** Bengaluru, India

## 2. Information we collect

We may collect the following categories of information, depending on which features are used:

### Account and identity information

- name or display name
- email address
- phone number
- account identifiers
- authentication and login details

### Family linking and relationship information

- pairing codes
- linked family account relationships
- child / parent role selection
- contact details needed to connect family members

### Medication and care information

- medication names, dosage, schedule, and adherence history
- medication inventory information
- reminder and escalation settings
- health reading entries, notes, and uploaded images
- related care-support activity recorded through the app

### Protection and safety information

- suspicious message text submitted manually by the user
- screenshots or images submitted for review
- link and payment-risk review results
- protection event logs
- notification-derived signals and app-usage-derived signals, where enabled by the user and supported by device permissions

### Device and technical information

- device type, operating system, app version, language, and approximate diagnostic metadata
- push notification token
- crash logs, performance logs, and basic analytics events
- local offline queue and sync state

### Subscription and billing information

- subscription tier and purchase status
- billing verification metadata from platform providers
- we do not store full payment card numbers

## 3. Permissions and sensitive access

Depending on the features enabled, Guardian may request access to device capabilities such as:

- notifications
- exact alarms / reminder scheduling
- image capture or photo selection
- notification access
- app usage access
- accessibility settings access
- storage of app-related files on the device

We only seek access when needed for app features, and some permissions may be optional or available only in certain versions, plans, or jurisdictions.

## 4. How we use information

We use information to:

- create and maintain user accounts
- pair child and parent users
- send reminders, alerts, and escalation notifications
- support medication adherence and care coordination
- process health reading records and uploaded evidence
- detect, assess, and present safety or scam-related warnings
- provide child dashboard visibility into configured care events
- maintain app security, prevent misuse, and investigate abuse
- provide customer support
- improve reliability, performance, and feature quality
- verify subscriptions and manage plan entitlements
- comply with legal obligations

## 5. Manual review and safety features

If a user submits text, screenshots, or other content for safety review, Guardian may process that content to identify suspicious patterns, risky links, payment-related warning signals, or other safety indicators.

If certain device permissions are enabled, Guardian may also process limited notification, app-usage, or accessibility-related signals to support protective features. These features may be limited, disabled, or changed depending on platform policy, user permission settings, market, or subscription tier.

## 6. How we share information

We do not sell personal information.

We may share information only in the following circumstances:

- with service providers that help us operate the app, such as cloud hosting, authentication, storage, crash reporting, analytics, or notification delivery providers
- with platform providers such as Google Play, Firebase, or other infrastructure providers as needed to operate app features
- with linked family members within the Guardian experience, according to the app's family relationship model and the user's actions
- if required by law, regulation, legal process, or enforceable governmental request
- to protect the rights, safety, and security of users, Guardian, or others
- in connection with a merger, acquisition, financing, or sale of assets, subject to appropriate safeguards

## 7. Data retention

We keep information only as long as reasonably necessary for:

- providing the service
- maintaining account records
- supporting care history and safety logs
- complying with legal, tax, fraud-prevention, or dispute-resolution requirements

Retention periods may differ by data type. Some records may be deleted or anonymized earlier, and some may be retained longer where legally required or operationally necessary.

## 8. Security

We use reasonable administrative, technical, and organizational safeguards designed to protect personal information, including encryption in transit where supported. No method of storage or transmission is completely secure, and we cannot guarantee absolute security.

## 9. Children's privacy

Guardian is intended for adult users and older adults in a family-care context. It is not directed to children under 13. We do not knowingly collect personal information directly from children under 13 as independent users. If you believe a child has provided personal information inappropriately, contact us and we will review the request.

## 10. User choices and rights

Depending on your location and applicable law, you may have rights to:

- access personal information
- correct inaccurate information
- delete certain information
- withdraw consent where processing is based on consent
- object to or restrict certain processing
- request a copy of certain information

You may also be able to change permissions in your device settings or within the app.

To exercise privacy rights or request deletion, contact:  
[privacy@vectorveda.com](mailto:privacy@vectorveda.com)

## 11. Cross-border processing

Your information may be processed or stored in countries other than the country where you live. Where required, we will apply appropriate safeguards for cross-border transfers.

## 12. Health and safety disclaimer

Guardian is a support and coordination tool. It is not a substitute for professional medical advice, diagnosis, treatment, emergency services, or financial, legal, or law-enforcement advice. Users should use their own judgment and consult qualified professionals where appropriate.

## 13. Changes to this Privacy Policy

We may update this Privacy Policy from time to time. If we make material changes, we will update the "Last updated" date and may provide additional notice where required.

## 14. Contact us

If you have questions about this Privacy Policy or Guardian's data practices, contact:

**Vector Veda**  
**Support:** [support@vectorveda.in](mailto:support@vectorveda.in)  
**Privacy:** [privacy@vectorveda.com](mailto:privacy@vectorveda.com)  
**Business Address:** Bengaluru, India

## Delete your data

[Delete your data here](/guardian-data-deletion)
`;

export default function GuardianPrivacyPolicyPage({ navigation, footer, page }) {
  return (
    <div className={styles.pageShell}>
      <Navbar navigation={navigation} />
      <main className={styles.page} aria-label="Guardian Privacy Policy">
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
    title: "Privacy Policy - Guardian",
    body: GUARDIAN_POLICY_MARKDOWN,
    html: renderMarkdownToHtml(GUARDIAN_POLICY_MARKDOWN)
  };

  return {
    props: {
      navigation,
      footer,
      page
    }
  };
}
