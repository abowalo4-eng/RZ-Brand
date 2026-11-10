export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const password = body ? body.password : undefined;
    const correctPassword = process.env.SITE_PASSWORD;

    // لێرەدا مە پەیاما خەلەتیێ گۆڕی بۆ ئەوەی بزانین سێرڤەر چ بەهایەکی وەرگریت
    if (password === correctPassword) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ 
        success: false, 
        received: password, 
        expectedSet: !!correctPassword 
      });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON request' });
  }
}
