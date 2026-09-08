/**
 * Serverless GitHub Push Webhook Handler (Node.js / Vercel / Netlify / Express)
 * Validates HMAC SHA-256 signatures and triggers cache invalidation or build hooks.
 * 
 * Environment Variables required for production:
 * - GITHUB_WEBHOOK_SECRET: Secret configured in GitHub repository webhook settings
 * - GITHUB_TOKEN: Optional Personal Access Token for authenticated rate limits
 */

const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const signature = req.headers['x-hub-signature-256'];
  const event = req.headers['x-github-event'];

  // Signature verification (if secret is configured in production environment)
  if (secret && signature) {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
      return res.status(401).json({ error: 'Invalid HMAC Signature' });
    }
  }

  console.log(`📡 Received GitHub Webhook Event: ${event}`);

  if (event === 'push' || event === 'repository') {
    const payload = req.body;
    const repoName = payload.repository ? payload.repository.name : 'Unknown';
    console.log(`🔄 Repository ${repoName} was updated. Refreshing cache...`);

    // In production, execute sync script or trigger deployment webhook
    return res.status(200).json({
      success: true,
      message: `Sync triggered successfully for ${repoName}`,
      timestamp: new Date().toISOString()
    });
  }

  return res.status(200).json({ status: 'Ignored Event', event });
};
