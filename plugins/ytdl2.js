const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js');

cmd({
  pattern: 'mp4',
  alias: ['ytv', 'video'],
  react: '🎥',
  desc: 'Download Youtube song',
  category: 'main',
  use: '.song < Yt url or Name >',
  filename: __filename
}, async (client, m, text, { from, prefix, quoted, q, reply }) => {
  try {
    if (!q) return await reply('*𝐏ℓєαʂє 𝐏ɼ๏νιɖє A Yʈ Uɼℓ ๏ɼ Vιɖє๏ Ναмє..*');
    
    const search = await ytsearch(q);
    if (search.results.length < 1) return reply('No results found!');

    let video = search.results[0];
    let api = 'https://apis.davidcyriltech.my.id/download/ytmp4?url=' + encodeURIComponent(video.url);
    let res = await fetch(api);
    let json = await res.json();

    if (json.status !== 200 || !json.result || !json.result.downloadUrl)
      return reply('Failed to fetch the video. Please try again later.');

    let caption = `╔═══〔 *𝐘𝐀𝐍𝐑𝐀 𝐌𝐃* 〕═══❒
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
    }, { quoted: m });

    await client.sendMessage(from, {
      video: { url: json.result.downloadUrl },
      mimetype: 'video/mp4'
    }, { quoted: m });

    await client.sendMessage(from, {
      document: { url: json.result.downloadUrl },
      mimetype: 'video/mp4',
      fileName: json.result.title + '.mp4',
      caption: `*${video.title}*\n> *© 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐊𝐞𝐫𝐦 𝐦𝐝🎐*`
    }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply('An error occurred. Please try again later.');
  }
});

cmd({
  pattern: 'play',
  alias: ['yta', 'audio'],
  react: '🎶',
  desc: 'Download Youtube song',
  category: 'main',
  use: '.song < Yt url or Name >',
  filename: __filename
}, async (client, m, text, { from, prefix, quoted, q, reply }) => {
  try {
    if (!q) return await reply('*𝐏ℓєαʂє 𝐏ɼ๏νιɖє A Yʈ Uɼℓ ๏ɼ S๏ƞ͛g Ναмє..*');

    const search = await ytsearch(q);
    if (search.results.length < 1) return reply('No results found!');

    let song = search.results[0];
    let api = 'https://apis.davidcyriltech.my.id/youtube/mp3?url=' + encodeURIComponent(song.url);
    let res = await fetch(api);
    let json = await res.json();

    if (json.status !== 200 || !json.result || !json.result.download_url)
      return reply('Failed to fetch the audio. Please try again later.');

    let caption = `╔═══〔 *𝐘𝐀𝐍𝐑𝐀 𝐌𝐃* 〕═══❒
║╭───────────────◆  
║│ *𝐘𝐀𝐍𝐑𝐀 𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ ⿻ *ᴛɪᴛʟᴇ:*  ${song.title}
║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${song.timestamp}
║ ⿻ *ᴠɪᴇᴡs:*  ${song.views}
║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${song.author.name}
║ ⿻ *ʟɪɴᴋ:*  ${song.url}
╚══════════════════❒
*ғꪮʀ ʏꪮꪊ ғꪮʀ ᴀʟʟ ꪮғ ᴀꜱ 🍉*`;

    await client.sendMessage(from, {
      image: { url: json.result.thumbnail || '' },
      caption
    }, { quoted: m });

    await client.sendMessage(from, {
      audio: { url: json.result.download_url },
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (e) {
    console.log(e);
    reply('An error occurred. Please try again later.');
  }
});
