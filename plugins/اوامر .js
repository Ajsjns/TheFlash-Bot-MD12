function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let time = d.toLocaleDateString(locale, { time: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role, health, crystal, upgrader, wood } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
  await conn.sendMessage(m.chat, { react: { text: '😎', key: m.key } })
  const zack = 'https://qu.ax/EQSn.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `zack`}, body: { text: `˼⚡˹↜ مـࢪحـبـا بـك/ي @${mentionId.split('@')[0]}
> ˼🪪˹↜ مــعــلــومــاتــك ↶
╮───────────────────⟢ـ
┆⚡↜ بـريـمـيـوم↞⌊ ${user.premiumTime > 0 ? 'مــمـ🔱ـيز' : (isPrems ? 'مــمـ🔱ـيز' : 'عــ🍁ــادي') || ''} ⌉
┆⚜️↜ مـــســـتواك↞⌊ ${level} ⌉
┆💫↜ رتـبـتـك↞⌊ ${role} ⌉
┆💷↜ فــلــوســك↞⌊ ${exp} ⌉
┆🪙↜ الــذهــب↞⌊ ${limit} ⌉
┆❤↜ الــصــحــة↞⌊ ${health} ⌉
┆🧰↜ الــخــبــرة↞⌊ ${upgrader} ⌉
╯───────────────────⟢ـ

┆📌 ↜الـتـشـغـيـل ↶﹝${uptime}﹞
┆🎪 ↜الــيــوم ↶﹝${week}﹞
┆⌚ ↜الـتـاريـخ ↶﹝${time}﹞
┆🔖 ↜الــمــســتـخـدمـيـن ↶﹝${rtotalreg}﹞
╯───────────────────⟢ـ
> © 𝑅𝐴𝑍𝐴𝑁 𝐵𝑂َ𝑇`,subtitle: "zack",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: zack } }, { upload: conn.waUploadToServer }, {quoted: m}))},
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },nativeFlowMessage: { buttons: [


                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '⌈🛡╎𝐦𝐞𝐧𝐮╎🛡⌋',
                                    sections: [
                                        {
                                            title: 'مــرحـ🛡ـبــا بــك فـي اوامر رزان بـ🤖ـوت',
                                            highlight_label: 'RAZAN_BOT',
                                            rows: [
                                                {
                                                    header: 'المطور',
                                                    title: 'تشغيل  #المطور',
                                                    description: '',
                                                    id: '.المطور'
                                                },
                                                {
                                                    header: 'الدعم',
                                                    title: 'تشغيل قسم #الدعم',
                                                    description: '',
                                                    id: '.الدعم'
                                                },
                                                {
                                                    header: 'شرح',
                                                    title: 'تشغيل الشرح #شرح',
                                                    description: '',
                                                    id: '.الشرح'
                                                },
                                                {
                                                    header: 'الاستخدام',
                                                    title: 'تشغيل الاستخدام #الاستخدام',
                                                    description: '',
                                                    id: '.الاستخدام'
                                               }
                                            ]
                                        }
                                    ]
                                }),
           messageParamsJson: ''
                     },
                     {
              name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🎗╎قائمه المهام╎🎗⌋","id":".مهام"}'
                     },
                     {
name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🙌╎معلوماتك╎🙌⌋","id":".بروفايل"}'
                     },
                     {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الــبــوت╎📲⌋","url":"https://whatsapp.com/channel/0029VajXyEz1yT2Hj5Y5Eh0r","merchant_url":"https://whatsapp.com/channel/0029VajXyEz1yT2Hj5Y5Eh0r"}'
                            }
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['menu', 'menu', 'اوامر','الاوامر','أوامر','ألاوامر']

export default handler;
