export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models');
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    const models = (data.data || [])
      .filter(m => m.id.endsWith(':free') && m.pricing?.prompt === '0' && m.pricing?.completion === '0')
      .map(m => ({
        id: m.id,
        name: m.name.replace(/\s*\(free\)\s*$/i, '').trim()
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json({ models });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
