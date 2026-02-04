const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.config = {
  name: "nekos",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "nekosapi + Sabah",
  description: "Random image from NekosAPI (works!)",
  commandCategory: "Image",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  try {
    const apiUrl = "https://api.nekosapi.com/v4/images/random";

    const res = await fetch(apiUrl);
    const data = await res.json();

    // NekosAPI response structure check
    // API return: { data: [ { url: "...", ... } ] }
    let imageUrl;
    if (data.url) {
      imageUrl = data.url; // old style
    } else if (data.data && data.data.length > 0 && data.data[0].url) {
      imageUrl = data.data[0].url; // new style
    } else {
      return api.sendMessage("❌ Image পাওয়া যায়নি API থেকে", event.threadID);
    }

    // Send image
    return api.sendMessage(
      {
        body: "", // কোনো caption নাই
        attachment: await global.utils.getStreamFromURL(imageUrl)
      },
      event.threadID
    );

  } catch (err) {
    console.log(err);
    return api.sendMessage("⚠️ Image load করা যায়নি", event.threadID);
  }
};
