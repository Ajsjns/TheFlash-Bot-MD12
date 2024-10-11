import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.sendMessage(m.chat, { text: 'يرجى تقديم أسئلة على سبيل المثال : \n بوت معلومه سريعه عن الاسلام.' }, { quoted: m });
  const { key } = await m.reply("*wait...*");

  // API URL
  const apiUrl = "https://agungdev.us.kg/api/ai/gpt?query=" + encodeURIComponent(text);

  try {
    // Sending request to API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "accept": "application/json",
      }
    });

    const result = await response.json();

    // Check if request was successful
    if (result.status) {
      const aiResponse = result.result.message; // Get AI response from API
      await conn.sendMessage(m.chat, {
        text: "*SILANA AI*: \n" + aiResponse,
        edit: key,
      });
    } else {
      conn.sendMessage(m.chat, { text: 'Failed to get response from AI. Please try again.' }, { quoted: m });
    }
  } catch (error) {
    console.error('Error:', error);
    conn.sendMessage(m.chat, { text: 'An error occurred while trying to connect to the API.' }, { quoted: m });
  }
};

// Metadata for the handler
handler.help = ['ai'];
handler.command = ['بووت'];
handler.tags = ['ai'];

export default handler;
