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
  await conn.sendMessage(m.chat, { react: { text: '📂', key: m.key } })
  const zack = 'https://qu.ax/KiYlK.jpg'
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
> ˼🤖˹↜ الــبــوت↶
╮───────────────────⟢ـ
┆⚙️ ↜اسـم الـبـوت↶﹝رزان﹞
┆🪄 ↜الـمـطـور ↶﹝ＳＴＩＶＥＮ﹞
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
                                    title: '⌈🛡╎المهام╎🛡⌋',
                                    sections: [
                                        {
                                            title: 'مــرحـ🛡ـبــا بــك فـي مــ☑هــام رزان بـ🤖ـوت',
                                            highlight_label: 'RAZAN_BOT',
                                            rows: [
                                                {
                                                    header: 'الــقـ👑ـســم الـاول',
                                                    title: 'استدعاء_قسم_الاعضاء #الاعضاء',
                                                    description: '',
                                                    id: '.ق1'
                                                },
                                                {
                                                    header: 'الــقـ👨🏻‍💻ـســم الــثــانــي',
                                                    title: 'استدعاء_قسم_المشرفين #المشرفين',
                                                    description: '',
                                                    id: '.ق10'
                                                },
                                                {
                                                    header: 'الــقـ🕋ـســم الــثــالــث',
                                                    title: 'استدعاء_قسم_الدين #الدين',
                                                    description: '',
                                                    id: '.ق2'
                                                },
                                                {
                                                    header: 'الــقـ👑ـســم الــرابــع',
                                                    title: 'استدعاء_قسم_المطور #المطور',
                                                    description: '',
                                                    id: '.ق3'
                                                },
                                                {
                                                    header: 'الــقـ🛡ـســم الــخــامــس',
                                                    title: 'استدعاء_قسم_التنزيلات #التنزيلات',
                                                    description: '',
                                                    id: '.ق4'
                                                },
                                                {
                                                    header: 'الــقـ🕹ـســم الــســادس',
                                                    title: 'استدعاء_قسم_الالعاب #الالعاب',
                                                    description: '',
                                                    id: '.ق5'
                                                },
                                                {
                                                    header: 'الــقـ🌀ـســم الــســابــع',
                                                    title: 'استدعاء_قسم_التحويلات #التحويلات',
                                                    description: '',
                                                    id: '.ق6'
                                                },
                                                {
                                                    header: 'الــقـ🤖ـســم الــتــاســع',
                                                    title: 'استدعاء_قسم_الذكاء #الذكاء',
                                                    description: '',
                                                    id: '.ق7'
                                                },
                                                {
                                                    header: 'الــقـ🚨ـســم الــعــاشــر',
                                                    title: 'استدعاء_قسم_الدعم #الدعم',
                                                    description: '',
                                                    id: '.ق8'
                                                },
                                                {
                                                                                                        header: 'الــقـ🏦ـســم الــثــانــي عــشــر',
                                                    title: 'استدعاء_قسم_البنك #بنكك',
                                                    description: '',
                                                    id: '.بنكك'
                                                },
                                                {
                                                    header: 'الــقـ🎟️ـســم الــثــالــث عــشــر',
                                                    title: 'استدعاء_قسم_الانمي #الانمي',
                                                    description: '',
                                                    id: '.ق12' 
                                               }
                                            ]
                                        }
                                    ]
                                }),
                  messageParamsJson: ''
                     },
                     {
              name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🎗╎فــعــالــيــات╎🎗⌋","id":".الفعاليات"}'
                     },
                     {
              name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🙌╎الاستخدام╎🙌⌋","id":".الاستخدام"}'
                     },
                     {
name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🙌╎الشرح╎🙌⌋","id":".الشرح"}'
                     },
                     {
name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🙌╎تقيم البوت╎🙌⌋","id":".تقيم"}'
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
handler.command = ['ppppp', 'مهام', 'pppp','قائمة','القائمة']

export default handler;
