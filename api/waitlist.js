import nodemailer from "nodemailer"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getRequestBody(req) {
  if (!req.body) {
    return {}
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return req.body
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ message: "Method not allowed." })
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const recipient = process.env.WAITLIST_TO_EMAIL || gmailUser

  if (!gmailUser || !gmailAppPassword || !recipient) {
    return res.status(500).json({
      message: "Waitlist email service is not configured.",
    })
  }

  const body = getRequestBody(req)
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const source = typeof body.source === "string" ? body.source.trim() : "unknown"
  const page = typeof body.page === "string" ? body.page.trim() : "unknown"
  const website = typeof body.website === "string" ? body.website.trim() : "unknown"
  const submittedAt =
    typeof body.submittedAt === "string" ? body.submittedAt.trim() : new Date().toISOString()

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "A valid email is required." })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })

  const safeEmail = escapeHtml(email)
  const safeSource = escapeHtml(source)
  const safePage = escapeHtml(page)
  const safeWebsite = escapeHtml(website)
  const safeSubmittedAt = escapeHtml(submittedAt)

  try {
    await transporter.sendMail({
      from: `"Swaasthyaa Waitlist" <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: "New Swaasthyaa waitlist signup",
      text: [
        "A new waitlist submission was received.",
        `Email: ${email}`,
        `Source: ${source}`,
        `Website: ${website}`,
        `Page: ${page}`,
        `Submitted at: ${submittedAt}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2 style="margin-bottom:16px">New Swaasthyaa waitlist signup</h2>
          <table style="border-collapse:collapse;width:100%;max-width:680px">
            <tbody>
              <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Email</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Source</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${safeSource}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Website</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${safeWebsite}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Page</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${safePage}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600">Submitted at</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${safeSubmittedAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Waitlist email send failed", error)
    return res.status(500).json({ message: "Could not send waitlist email." })
  }
}
