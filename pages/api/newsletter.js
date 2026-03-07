function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const webhookUrl =
    process.env.GOOGLE_SHEETS_NEWSLETTER_WEBHOOK_URL ||
    process.env.NEWSLETTER_GOOGLE_SHEETS_WEBHOOK_URL ||
    "";

  if (!webhookUrl) {
    return res.status(500).json({ error: "Newsletter storage is not configured." });
  }

  const email = String(req.body?.email || "").trim();

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: "footer-newsletter"
      })
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(502).json({
        error: "Google Sheets webhook failed.",
        details: details ? details.slice(0, 300) : `Status ${response.status}`
      });
    }

    const raw = await response.text();
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.ok === false) {
          const scriptError = String(parsed.error || "Unknown script rejection.");
          const isDuplicate = /already subscribed|already exists|duplicate/i.test(scriptError);
          return res.status(isDuplicate ? 409 : 422).json({
            error: scriptError,
            details: parsed
          });
        }
      } catch (_) {
        // Non-JSON response is acceptable if status is 2xx.
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to save email right now.",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
