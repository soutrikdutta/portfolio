import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve built assets
app.use(express.static(path.join(__dirname, 'dist')));

// Contact endpoint that forwards to Google Doc webhook if configured, or logs
app.post('/api/contact', async (req, res) => {
  const webhookUrl =
    process.env.GOOGLE_DOC_WEBHOOK_URL ||
    process.env.VITE_GOOGLE_DOC_WEBHOOK_URL ||
    'https://script.google.com/macros/s/AKfycbzEbZfXfImapVExTWL5l_dk3v80Bz7gxfq2r0ksCbFdv9e-m1P4zZQQ59Z4zXE46X758g/exec';

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contactInfo, message, timestamp, docId: '1Z6UBnAo7RpL5pCn9z12jKHnFl57M_tftip5NdupWHH4' })
      });
    } catch (e) {
      console.error('Failed to forward contact to webhook:', e);
    }
  } else {
    console.log('[Portfolio Contact]:', { name, contactInfo, message, timestamp });
  }

  res.json({ status: 'success' });
});

// SPA catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NeonFlux Portfolio server running on port ${PORT}`);
});
