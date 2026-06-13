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

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ],
          systemInstruction: {
            parts: [
              {
                text: systemPrompt || ""
              }
            ]
          }
        })
      }
    );

    const data = await geminiResponse.json();

    console.log("GEMINI RESPONSE:", data);

    return res.status(geminiResponse.status).json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }
}