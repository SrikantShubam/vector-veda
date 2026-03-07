function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://vectorveda.online";
  return String(raw).replace(/\/+$/, "");
}

function buildAdminTemplate({ name, email, company, message, submittedAt, siteUrl, logoUrl }) {
  return {
    html: `
      <div style="margin:0;padding:24px;background:#f4f7f6;font-family:Arial,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #dfe7e3;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:18px 20px;background:linear-gradient(135deg,#1f4d3b,#2f6b53);color:#ecfdf5;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${logoUrl}" width="28" height="28" alt="Vector Veda" style="display:block;border:0;" />
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Vector Veda</p>
                    <h2 style="margin:4px 0 0;font-size:20px;line-height:1.3;">New Contact Form Submission</h2>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:9px 0;color:#6b7280;font-size:13px;width:140px;">Name</td>
                  <td style="padding:9px 0;color:#111827;font-size:14px;font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#6b7280;font-size:13px;">Email</td>
                  <td style="padding:9px 0;color:#111827;font-size:14px;font-weight:600;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#6b7280;font-size:13px;">Company</td>
                  <td style="padding:9px 0;color:#111827;font-size:14px;font-weight:600;">${company}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#6b7280;font-size:13px;">Submitted</td>
                  <td style="padding:9px 0;color:#111827;font-size:14px;font-weight:600;">${submittedAt}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 20px 20px;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">Message</p>
              <div style="padding:12px 14px;background:#f8faf9;border:1px solid #dfe7e3;border-radius:10px;color:#111827;font-size:14px;line-height:1.55;">
                ${message}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 20px 18px;">
              <a href="mailto:${email}" style="display:inline-block;padding:10px 14px;border-radius:999px;background:#1f4d3b;color:#ecfdf5;text-decoration:none;font-size:13px;font-weight:700;">Reply to ${name}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 20px;border-top:1px solid #dfe7e3;color:#6b7280;font-size:12px;">
              ${siteUrl}
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `New Vector Veda contact form submission

Name: ${name}
Email: ${email}
Company: ${company}
Submitted: ${submittedAt}

Message:
${message.replace(/<br \/>/g, "\n")}`
  };
}

function buildAutoReplyTemplate({ name, message, siteUrl, logoUrl }) {
  return {
    html: `
      <div style="margin:0;padding:24px;background:#f4f7f6;font-family:Arial,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dfe7e3;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:18px 20px;background:linear-gradient(135deg,#1f4d3b,#2f6b53);color:#ecfdf5;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${logoUrl}" width="28" height="28" alt="Vector Veda" style="display:block;border:0;" />
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Vector Veda</p>
                    <h2 style="margin:4px 0 0;font-size:20px;line-height:1.3;">Thanks for reaching out</h2>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0 0 10px;font-size:14px;line-height:1.6;">Hi ${name},</p>
              <p style="margin:0 0 10px;font-size:14px;line-height:1.6;">Your message has been received. We will review it and get back to you shortly.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 12px;border-collapse:separate;border-spacing:0 6px;">
                <tr>
                  <td style="font-size:14px;color:#111827;">1. We review your requirement.</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#111827;">2. We reply with a practical next step.</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#111827;">3. If useful, we schedule a short discovery call.</td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">Your message</p>
              <div style="padding:12px 14px;background:#f8faf9;border:1px solid #dfe7e3;border-radius:10px;color:#111827;font-size:14px;line-height:1.55;">
                ${message}
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:14px;">
                <tr>
                  <td>
                    <a href="${siteUrl}" style="display:inline-block;padding:10px 14px;border-radius:999px;background:#1f4d3b;color:#ecfdf5;text-decoration:none;font-size:13px;font-weight:700;">Visit Website</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-size:14px;line-height:1.6;">Regards,<br />Vector Veda</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 20px;border-top:1px solid #dfe7e3;color:#6b7280;font-size:12px;">
              ${siteUrl}
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `Hi ${name},

Your message has been received. We will get back to you shortly.

Your message:
${message.replace(/<br \/>/g, "\n")}

Regards,
Vector Veda

Website: ${siteUrl}`
  };
}

async function sendBrevoEmail(apiKey, payload) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey
    },
    body: JSON.stringify(payload)
  });
}

async function postToGoogleSheets(webhookUrl, record) {
  if (!webhookUrl) return { skipped: true };
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    throw new Error(`Google Sheets webhook failed with status ${response.status}`);
  }
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.BREVO_TO_EMAIL;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME || "Vector Veda";
  const sheetWebhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLESHEET_WEBHOOK_URL || "";
  const adminTemplateId = Number(process.env.BREVO_TEMPLATE_ID_ADMIN || 0);
  const autoReplyTemplateId = Number(process.env.BREVO_TEMPLATE_ID_AUTOREPLY || 0);

  if (!apiKey || !toEmail || !fromEmail) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const company = String(req.body?.company || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const escaped = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company || "Not provided"),
    message: escapeHtml(message).replace(/\n/g, "<br />")
  };
  const submittedAt = new Date().toISOString();
  const siteUrl = resolveSiteUrl();
  const logoUrl = `${siteUrl}/logo-vector-veda.png`;
  const heroImageUrl = `${siteUrl}/email/hero-services.jpg`;
  const portfolioImageUrl = `${siteUrl}/email/impact-case.jpg`;
  const adminTemplate = buildAdminTemplate({
    name: escaped.name,
    email: escaped.email,
    company: escaped.company,
    message: escaped.message,
    submittedAt: escapeHtml(submittedAt),
    siteUrl: escapeHtml(siteUrl),
    logoUrl: escapeHtml(logoUrl)
  });
  const autoReplyTemplate = buildAutoReplyTemplate({
    name: escaped.name,
    message: escaped.message,
    siteUrl: escapeHtml(siteUrl),
    logoUrl: escapeHtml(logoUrl)
  });

  const notificationPayload = {
    sender: { email: fromEmail, name: fromName },
    to: [{ email: toEmail }],
    replyTo: { email, name },
    subject: `New contact form submission from ${name}`,
    htmlContent: adminTemplate.html,
    textContent: adminTemplate.text
  };

  const autoReplyPayload = {
    sender: { email: fromEmail, name: fromName },
    to: [{ email, name }],
    subject: "We received your message",
    htmlContent: autoReplyTemplate.html,
    textContent: autoReplyTemplate.text
  };
  const commonTemplateParams = {
    name,
    email,
    company: company || "Not provided",
    message,
    submitted_at: submittedAt,
    site_url: siteUrl,
    logo_url: logoUrl,
    hero_image_url: heroImageUrl,
    portfolio_image_url: portfolioImageUrl
  };
  const notificationTemplatePayload = {
    sender: { email: fromEmail, name: fromName },
    to: [{ email: toEmail }],
    replyTo: { email, name },
    templateId: adminTemplateId,
    params: commonTemplateParams
  };
  const autoReplyTemplatePayload = {
    sender: { email: fromEmail, name: fromName },
    to: [{ email, name }],
    templateId: autoReplyTemplateId,
    params: commonTemplateParams
  };
  const finalNotificationPayload =
    Number.isFinite(adminTemplateId) && adminTemplateId > 0 ? notificationTemplatePayload : notificationPayload;
  const finalAutoReplyPayload =
    Number.isFinite(autoReplyTemplateId) && autoReplyTemplateId > 0 ? autoReplyTemplatePayload : autoReplyPayload;

  try {
    const [notificationResponse, autoReplyResponse, sheetResult] = await Promise.allSettled([
      sendBrevoEmail(apiKey, finalNotificationPayload),
      sendBrevoEmail(apiKey, finalAutoReplyPayload),
      postToGoogleSheets(sheetWebhookUrl, {
        timestamp: submittedAt,
        name,
        email,
        company: company || "",
        message
      })
    ]);

    if (notificationResponse.status !== "fulfilled" || autoReplyResponse.status !== "fulfilled") {
      return res.status(502).json({
        error: "Brevo request failed.",
        details: {
          notification:
            notificationResponse.status === "rejected" ? notificationResponse.reason?.message || "Failed" : "ok",
          autoReply:
            autoReplyResponse.status === "rejected" ? autoReplyResponse.reason?.message || "Failed" : "ok"
        }
      });
    }

    if (!notificationResponse.value.ok || !autoReplyResponse.value.ok) {
      const [notificationError, autoReplyError] = await Promise.all([
        notificationResponse.value.text(),
        autoReplyResponse.value.text()
      ]);

      return res.status(502).json({
        error: "Brevo request failed.",
        details: {
          notification: notificationError,
          autoReply: autoReplyError
        }
      });
    }

    const sheetWarning =
      sheetResult.status === "rejected"
        ? "Email sent, but Google Sheets sync failed."
        : null;

    return res.status(200).json({ ok: true, warning: sheetWarning });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to send message right now.",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
