////////𝒃𝒚 𝒔𝒉𝒂𝒏𝒌𝒔
///////https://whatsapp.com/channel/0029VaoIlUJ1NCrMSnP8hB1K
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const handler = async (m, { conn, text }) => {
    // تحقق من أن الرسالة التي يتم الرد عليها موجودة
    if (!m.quoted) {
        return conn.reply(m.chat, '❌ يرجى الرد على رسالة لتحويلها إلى ملف.', m);
    }

    // الحصول على نص الرسالة المردود عليها
    let messageContent = m.quoted.text;

    if (!messageContent) {
        return conn.reply(m.chat, '❌ الرسالة المردود عليها فارغة أو لا تحتوي على نص.', m);
    }

    // التحقق من وجود اسم وامتداد الملف بعد الأمر
    if (!text || !text.includes('.')) {
        return conn.reply(m.chat, '❌ يرجى تحديد اسم وامتداد الملف، مثل: `.js shanks.js` أو `.js example.html`.', m);
    }

    // استخراج اسم الملف من النص المدخل بعد الأمر
    let fileName = text.trim();

    let dir = './files/'; // استخدام مجلد محلي

    // تحقق مما إذا كان المجلد موجودًا، إذا لم يكن موجودًا يتم إنشاؤه
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    // حفظ النص كملف بالاسم المحدد من قبل المستخدم
    writeFileSync(`${dir}${fileName}`, messageContent);

    // إرسال الملف المحفوظ
    await conn.sendMessage(m.chat, { document: { url: `${dir}${fileName}` }, mimetype: 'text/plain', fileName }, { quoted: m });

    // الرد بتأكيد عملية التحويل
    conn.reply(m.chat, `✔️ تم تحويل الرسالة إلى ملف: ${fileName}`, m);
};

handler.help = ['مقدم من شانكس'];
handler.tags = ['الادوات'];
handler.command = /^لملف$/i;

export default handler;