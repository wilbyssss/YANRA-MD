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

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
  pattern: 'song',
  alias: ['audio'],
  desc: 'Search and download audio from YouTube',
  category: 'music',
  react: '🎧',
  filename: __filename
}, async (client, message, m, { from, args, q, reply }) => {
  try {
    if (!q) return reply('*𝐏ℓєα𝐬֟፝є 𝐏ʀ๏νιɖє A S๏ƞ͛g 𝐍αмє..*');

    let videoUrl = q;

    // Si ce n’est pas une URL YouTube, on cherche la vidéo avec yts
    if (!q.includes('youtube.com') && !q.includes('youtu.be')) {
      reply('_🎐 Your song is downloading..._');
      const search = await yts(q);
      if (!search.videos.length) return reply('No results found for your query.');
      videoUrl = search.videos[0].url;
    }

    const apiUrl = 'https://apis.davidcyriltech.my.id/youtube/mp3?url=' + videoUrl;
    const response = await axios.get(apiUrl);

    if (
      !response.data ||
      !response.data.result ||
      !response.data.result.downloadUrl
    ) {
      return reply('Failed to fetch the audio. Try again later.');
    }

    await client.sendMessage(from, {
      audio: { url: response.data.result.downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      caption: `🎵 *Title:* ${response.data.result.title}\n🔗 *Link:* ${videoUrl}`
    }, { quoted: message });

  } catch (err) {
    console.error('Error in play command:', err);
    reply('An error occurred while processing your request.');
  }
});
