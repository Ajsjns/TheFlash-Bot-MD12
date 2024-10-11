/*
╮────────────────────╭
*│ By :* *`✪┋𝐓𝐀𝐑𝐁𝐎𝐎┋✪`*

*│ `Channel Tarboo` :* https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45

 *`تغييرك للحقوق دليل على فشلك ، حاول تتطور وحط حقوقك`* 🤡. 
*╯────────────────────╰*
*/

import axios from 'axios';
import { load } from 'cheerio';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys")).default;

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) throw `⚠️ عذرًا، لازم تكتب اسم الفيلم أو المسلسل اللي بتدور عليه.\nاكتب: ${usedPrefix + command} عشان تقدر تبحث 🎬`;

  let نتائج;

  try {
    نتائج = await searchC(text);
  } catch {
    نتائج = await searchTMDB(text);
  }

  if (نتائج.length === 0) throw `⚠️ مع الأسف مش لاقي حاجة تطابق بحثك 😔`;

  let cards = [];
  for (let i = 0; i < Math.min(نتائج.length, 5); i++) {
    const result = نتائج[i];
    const صورة = result.poster_path ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` : 'https://elcomercio.pe/resizer/RJM30xnujgfmaODGytH1rRVOrAA=/400x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BJ2L67XNRRGHTFPKPDOEQ2AH5Y.jpg'; // استخدام بوستر الفيلم أو صورة بديلة

    const imageMessage = await generateWAMessageContent({
      image: { url: صورة }
    }, { upload: conn.waUploadToServer });
    
    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*🎬 • العنوان:* ${result.title}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: "🔎 Cine Search"
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: imageMessage.imageMessage
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [{
          name: "cta_url",
          buttonParamsJson: `{"display_text":"رابط الفيلم 📫","Url":"${result.link}"}`
        }]
      })
    });
  }

  const interactiveMessage = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `🎬 نتائج البحث عن: ${text}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "🔎 Cine Search"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: cards
          })
        })
      }
    }
  }, { quoted: m });

  await conn.relayMessage(m.chat, interactiveMessage.message, { messageId: interactiveMessage.key.id });
};

handler.command = ['كيوفانا', 'بليس-بلس'];
handler.level = 1;
handler.register = true;
export default handler;

const safeLoad = async (url, options = {}) => {
  try {
    const { data: pageData } = await axios.get(url, options);
    const $ = load(pageData);
    return $;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.statusText);
    }
    throw err;
  }
};

async function searchC(query, numberPage = 1) {
  const $ = await safeLoad(`https://cuevana3.mu/page/${numberPage}/`, {
    params: { s: query }
  });
  const resultSearch = [];
  $('.results-post > article').each((_, e) => {
    const element = $(e);
    const title = element.find('header > h2').text();
    const link = element.find('.lnk-blk').attr('href');
    resultSearch.push({ title: title, link: link });
  });
  return resultSearch;
}

async function searchTMDB(query, page = 1) {
  const apiKey = '737e5a009698e5a21fb916bb7e75f776';
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: apiKey,
      query: query,
      page: page
    }
  });
  const resultSearch = response.data.results.map(movie => ({
    title: movie.title,
    link: `https://www.themoviedb.org/movie/${movie.id}`,
    poster_path: movie.poster_path
  }));
  return resultSearch;
}