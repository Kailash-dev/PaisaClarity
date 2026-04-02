export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    method: req.method,
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
  })
}

