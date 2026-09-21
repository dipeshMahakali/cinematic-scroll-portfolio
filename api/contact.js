import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'dipeshmahakali@gmail.com',
    pass: 'hoozhrsseuwzhipu'
  }
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, service, message } = req.body || {}

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' })
    }

    const mailOptions = {
      from: '"Dipesh Patel Portfolio" <dipeshmahakali@gmail.com>',
      to: 'dipesh.patel1902@gmail.com, dipeshmahakali@gmail.com',
      replyTo: email,
      subject: `🚀 New Project Inquiry from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0c10; color: #ffffff; padding: 28px; border-radius: 12px; max-width: 600px;">
          <h2 style="color: #64ffda; border-bottom: 1px solid #233554; padding-bottom: 12px; margin-top: 0; font-size: 20px;">New Project Inquiry</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 16px;">
            <tr><td style="color: #8892b0; padding: 6px 0; width: 140px;"><strong>Client Name:</strong></td><td style="color: #ccd6f6; padding: 6px 0;">${name}</td></tr>
            <tr><td style="color: #8892b0; padding: 6px 0;"><strong>Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #64ffda; text-decoration: none;">${email}</a></td></tr>
            <tr><td style="color: #8892b0; padding: 6px 0;"><strong>Phone / WhatsApp:</strong></td><td style="color: #ccd6f6; padding: 6px 0;">${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #64ffda; text-decoration: none;">${phone}</a>` : 'Not provided'}</td></tr>
            <tr><td style="color: #8892b0; padding: 6px 0;"><strong>Service Required:</strong></td><td style="color: #ccd6f6; padding: 6px 0;">${service || 'Website Project'}</td></tr>
          </table>
          <div style="background: #112240; padding: 18px; border-radius: 8px; border-left: 3px solid #64ffda; margin-top: 16px;">
            <p style="margin: 0; color: #e6f1ff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message || 'No project description provided.'}</p>
          </div>
          <p style="color: #495670; font-size: 12px; margin-top: 24px; border-top: 1px solid #1e2d48; padding-top: 12px;">Sent from Dipesh Patel 3D Portfolio</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Failed to send message. Please reach out via WhatsApp or direct email.' })
  }
}

