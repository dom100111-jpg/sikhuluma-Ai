export default function handler(req, res) {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'sikhuluma_token_2025';

  // Step 1: Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ WEBHOOK VERIFIED');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Verification failed');
      res.status(403).end();
    }
  }

  // Step 2: Handle webhook notifications (POST)
  else if (req.method === 'POST') {
    console.log('📩 Webhook event received:', req.body);
    res.status(200).end();
  }

  // Step 3: Invalid method
  else {
    res.status(405).end();
  }
}
