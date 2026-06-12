export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { model, messages, system } = req.body;
    if (!model) return res.status(400).json({ error: 'model is required' });
    if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages is required' });

    const chatMessages = system
      ? [{ role: 'system', content: system }, ...messages]
      : messages;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://github.com/conicjr/openrouter-debate',
        'X-Title': 'OpenRouter Debate'
      },
      body: JSON.stringify({
        model,
        messages: chatMessages,
        max_tokens: 2000,
        plugins: [{ id: 'web' }]
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    const text = data.choices?.[0]?.message?.content || '';
    if (!text) return res.status(500).json({ error: '응답 생성에 실패했습니다.' });

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
