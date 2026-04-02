export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { email } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  const API_KEY = process.env.VITE_MAILCHIMP_API_KEY
  const AUDIENCE_ID = process.env.VITE_MAILCHIMP_AUDIENCE_ID
  const SERVER = process.env.VITE_MAILCHIMP_SERVER
  const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['waitlist'],
        merge_fields: { SOURCE: 'paisa-clarity-website' },
      }),
    })
    const data = await response.json()
    if (response.status === 200 || response.status === 201) {
      return res.status(200).json({ success: true })
    }
    if (data.title === 'Member Exists') {
      return res.status(200).json({ success: true, existing: true })
    }
    return res.status(400).json({ error: data.detail || 'Signup failed' })
  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
}
