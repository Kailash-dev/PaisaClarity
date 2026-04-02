// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' })
//   }
//   const { email } = req.body
//   if (!email || !email.includes('@')) {
//     return res.status(400).json({ error: 'Invalid email' })
//   }
//   const API_KEY = process.env.MAILCHIMP_API_KEY
//   const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
//   const SERVER = process.env.MAILCHIMP_SERVER
//   const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

//   console.log("ENV CHECK:", {
//     API_KEY: process.env.MAILCHIMP_API_KEY,
//     AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
//     SERVER: process.env.MAILCHIMP_SERVER,
//   })
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `apikey ${API_KEY}`,
//       },
//       body: JSON.stringify({
//         email_address: email,
//         status: 'subscribed',
//         tags: ['waitlist'],
//         merge_fields: { SOURCE: 'paisa-clarity-website' },
//       }),
//     })
//     const data = await response.json()
//     if (response.status === 200 || response.status === 201) {
//       return res.status(200).json({ success: true })
//     }
//     if (data.title === 'Member Exists') {
//       return res.status(200).json({ success: true, existing: true })
//     }
//     return res.status(400).json({ error: data.detail || 'Signup failed' })
//   } catch (err) {
//   console.error("FULL ERROR:", err)

//   return res.status(500).json({
//     error: err.message,
//     details: err.response?.data || null
//   })
// }
// }



import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email } = req.body || {}

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    // Send email instantly
    await resend.emails.send({
      from: 'onboarding@resend.dev', // default (works instantly)
      to: email,
      subject: 'You’re on the Paisa Clarity waitlist 🚀',
      html: `
        <h2>Welcome to Paisa Clarity</h2>
        <p>You’re successfully on the waitlist 🎉</p>
        <p>We’ll notify you as soon as we launch.</p>
        <br/>
        <p>– Kailash</p>
      `,
    })

    return res.status(200).json({ success: true })

  } catch (err) {
    console.error("RESEND ERROR:", err)
    return res.status(500).json({
      error: err.message
    })
  }
}