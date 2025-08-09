import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-vercel-protection-bypass');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.json({ 
    message: 'T-Rex Motors Backend API is running!',
    timestamp: new Date().toISOString(),
    status: 'online'
  });
}