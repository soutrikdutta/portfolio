export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contactInfo, message, timestamp } = req.body || {};

  const webhookUrl =
    process.env.GOOGLE_DOC_WEBHOOK_URL ||
    process.env.VITE_GOOGLE_DOC_WEBHOOK_URL ||
    'https://script.google.com/macros/s/AKfycbzEbZfXfImapVExTWL5l_dk3v80Bz7gxfq2r0ksCbFdv9e-m1P4zZQQ59Z4zXE46X758g/exec';

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contactInfo,
          message,
          timestamp: timestamp || new Date().toISOString(),
          docId: '1Z6UBnAo7RpL5pCn9z12jKHnFl57M_tftip5NdupWHH4'
        })
      });
    } catch (e) {
      console.error('Failed to forward contact to webhook:', e);
    }
  }

  return res.status(200).json({ status: 'success' });
}
