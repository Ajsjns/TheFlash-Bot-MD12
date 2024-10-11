import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) {
    throw "> *مرحبًا، أنا خدمة `Black Box Ai`، خدمة قادرة على برمجة الأكواد ومساعدتك في حياتك اليوميه المثال :*\n\n- #برمجة كيفية إنشاء صفحة تسجيل دخول باستخدام `html`";
  }

  try {
    const apiURL = `https://artst-three.vercel.app/blackbox?text=${text}`;
    const response = await fetch(apiURL);
    const result = await response.json();

    if (result.result && text.trim().length > 0) {
      let captionn = result.result;  // النص الذي سيتم إرساله مع الصورة أو الرد

      // إرسال الصورة مع الزر
      await conn.sendButton(m.chat, captionn, ' > gojo | 🐼❤️', null, [['🔄 جرب مرة أخرى 🔄', `.بلاك ${text}`]], m);

    } else {
      throw '> *خطأ ⚠️: لم يتم العثور على نتيجة.*';
    }

  } catch (error) {
    console.error(error);
    throw '> *خطأ ⚠️: حدث خطأ أثناء الاتصال بالخدمة.*';
  }
};

handler.command = /^(بلاك|بوكسي)$/i;
handler.help = ['ai'];
handler.tags = ['tool'];
export default handler;
