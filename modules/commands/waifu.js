const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.config = {
  name: "waifu",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "waifu.im + Sabah",
  description: "Random Waifu image",
  commandCategory: "Image",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  try {
    const apiUrl = 'https://api.waifu.im/search';
    const tags = ['maid', 'neko', 'smile', 'blush', 'hug']; // random safe tags
    const tag = tags[Math.floor(Math.random() * tags.length)]; // pick 1 random tag

    const requestUrl = `${apiUrl}?included_tags=${tag}&is_nsfw=false`;

    const res = await fetch(requestUrl);
    const data = await res.json();

    if (!data.images || data.images.length === 0) {
      return api.sendMessage("❌ Waifu পাওয়া যায়নি, retry করো", event.threadID);
    }

    const imageUrl = data.images[0].url;

    return api.sendMessage(
      {
        body: `✨ Random Waifu (${tag}) ✨`,
        attachment: await global.utils.getStreamFromURL(imageUrl)
      },
      event.threadID
    );

  } catch (err) {
    console.log(err);
    return api.sendMessage("⚠️ Waifu load করা যায়নি", event.threadID);
  }
};
