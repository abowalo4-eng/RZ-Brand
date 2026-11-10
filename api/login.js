export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    
    // ئەگەر جارا ناڤدیر بێت و body وەکو نص (String) بهێت، وەربگێڕە بۆ JSON
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const password = body ? body.password : undefined;
    const correctPassword = process.env.SITE_PASSWORD;

    if (password === correctPassword) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON request' });
  }
}
