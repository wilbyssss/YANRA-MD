/*
_  ______   _____ _____ _____ _   _
| |/ / ___| |_   _| ____/___ | | | |
| ' / |  _    | | |  _|| |   | |_| |
| . \ |_| |   | | | |__| |___|  _  |
|_|\_\____|   |_| |_____\____|_| |_|

ANYWAY, YOU MUST GIVE CREDIT TO MY CODE WHEN COPY IT
CONTACT ME HERE +237656520674
YT: KermHackTools
Github: Kgtech-cmr
*/


const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js');

cmd({
  pattern: 'play',
  alias: ['yta', 'audio'],
  react: '🎶',
  desc: 'Download Youtube song',
  category: 'main',
  use: '.song < Yt url or Name >',
  filename: __filename
}, async (client, msg, text, { from, prefix, quoted, q, reply }) => {
  try {
    if (!q) return await reply("*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 Yʈ 𝐔ɼℓ ๏ɼ 𝐒๏ƞ͛g Ναмє..*");

    const results = await ytsearch(q);
    if (results.results.length < 1) return reply("No results found!");

    let video = results.results[0];
    let downloadUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(video.url)}`;

    const response = await fetch(downloadUrl);
    const json = await response.json();

    if (json.status !== 200 || !json.result || !json.result.download_url) {
      return reply("Failed to fetch the audio. Please try again later.");
    }

    let caption = `╔═══〔 *𝐘𝐀𝐍𝐑𝐀 𝐌𝐃* 〕═══❒
║╭───────────────◆  
║│ *𝐘𝐀𝐍𝐑𝐀 𝐌Ɗ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ ⿻ *ᴛɪᴛʟᴇ:*  ${video.title}
║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${video.timestamp}
║ ⿻ *ᴠɪᴇᴡs:*  ${video.views}
║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${video.author.name}
║ ⿻ *ʟɪɴᴋ:*  ${video.url}
╚══════════════════❒
*ғꪮʀ ʏꪮꪊ ғꪮʀ ᴀʟʟ ꪮғ ᴀꜱ 🍉*`;

    await client.sendMessage(from, {
      image: { url: json.result.thumbnail },
      caption
    }, { quoted });

    await client.sendMessage(from, {
      audio: { url: json.result.download_url },
      mimetype: 'audio/mpeg'
    }, { quoted });
  } catch (e) {
    console.log(e);
    reply("An error occurred. Please try again later.");
  }
});

/*

cmd({
  pattern: 'mp4',
  alias: ['ytv', 'video'],
  react: '🎥',
  desc: 'Download Youtube song',
  category: 'main',
  use: '.song < Yt url or Name >',
  filename: __filename
}, async (client, msg, text, { from, prefix, quoted, q, reply }) => {
  try {
    if (!q) return await reply("*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 Yʈ 𝐔ɼℓ ๏ɼ 𝐕ιɖє๏ Ναмє..*");

    const results = await ytsearch(q);
    if (results.results.length < 1) return reply("No results found!");

    let video = results.results[0];
    let downloadUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(video.url)}`;

    const response = await fetch(downloadUrl);
    const json = await response.json();

    if (json.status !== 200 || !json.result || !json.result.downloadUrl) {
      return reply("Failed to fetch the video. Please try again later.");
    }

    let caption = `╔═══〔 *𝐊𝐄𝐑𝐌 𝐌𝐃 𝐕𝟏* 〕═══❒
║╭───────────────◆  
║│ *❍ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ ⿻ *ᴛɪᴛʟᴇ:*  ${video.title}
║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${video.timestamp}
║ ⿻ *ᴠɪᴇᴡs:*  ${video.views}
║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${video.author.name}
║ ⿻ *ʟɪɴᴋ:*  ${video.url}
╚══════════════════❒
*ғꪮʀ ʏꪮꪊ ғꪮʀ ᴀʟʟ ꪮғ ᴀꜱ 🍉*`;

    await client.sendMessage(from, {
      image: { url: json.result.thumbnail || '' },
      caption
    }, { quoted });

    await client.sendMessage(from, {
      video: { url: json.result.downloadUrl },
      mimetype: 'video/mp4'
    }, { quoted });

    await client.sendMessage(from, {
      document: { url: json.result.downloadUrl },
      mimetype: 'video/mp4',
      fileName: json.result.title + '.mp4',
      caption: `*${video.title} > *© 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐊𝐞𝐫𝐦 𝐦𝐝🎐*`
    }, { quoted });
  } catch (e) {
    console.log(e);
    reply("An error occurred. Please try again later.");
  }
});

*/
