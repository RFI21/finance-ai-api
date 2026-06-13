export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'API Online',
      keyExists: !!process.env.GEMINI_API_KEY
    });
  }

  try {

    console.log("KEY EXISTS:", !!process.env.GEMINI_API_KEY);

    const { message, systemPrompt } = req.body;

    // lanjutkan fetch Gemini...

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
}