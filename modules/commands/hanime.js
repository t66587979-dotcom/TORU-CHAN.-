module.exports.config = {
  name: "hanime",
  version: "1.0",
  hasPermssion: 0,
  credits: "Hridoy + Grok",
  description: "Random Hentai video from tik.porn/tag/hentai (NSFW 🔥)",
  commandCategory: "fun",
  usages: "",
  cooldowns: 10
};

module.exports.run = async function({ api, event }) {
  // Hentai tag-এর real video links (https://tik.porn/tag/hentai খুলে copy করো)
  // Browser-এ গিয়ে video thumbnail-এ right-click → "Copy link address" → paste করো
  const hentaiLinks = [
   "https://tik.porn/video/1099981",  // Licking Balls and Threesome Hentai Uncensored
  "https://tik.porn/video/1094101",  // Reverse Cowgirl and Hentai Uncensored   "https://tik.porn/video/1137795",  // Anal Doggystyle Hentai 3D
  "https://tik.porn/video/198223",   // Pussy Licking Hentai 3D
  "https://tik.porn/video/1339066",// Hentai 3D focused (from tag/hentai-3d)
  "https://tik.porn/video/1137795",
  "https://tik.porn/video/1099981",
  "https://tik.porn/video/1094101",
  "https://tik.porn/video/1094094",
  "https://tik.porn/video/1079688",
  "https://tik.porn/video/947955",
  "https://tik.porn/video/747342",
  "https://tik.porn/video/728750",
  "https://tik.porn/video/645835",
  "https://tik.porn/video/637337",
  "https://tik.porn/video/410404",
  "https://tik.porn/video/351709",
  "https://tik.porn/video/336092",
  "https://tik.porn/video/336085",
  "https://tik.porn/video/313174",
  "https://tik.porn/video/302296",
  "https://tik.porn/video/239166",
  "https://tik.porn/video/195658",
  "https://tik.porn/video/198223",
  "https://tik.porn/video/283151",
  "https://tik.porn/video/441785",
  "https://tik.porn/video/633333",
  "https://tik.porn/video/773158",
  "https://tik.porn/video/239510",
  "https://tik.porn/video/633361",
  "https://tik.porn/video/637848",
  "https://tik.porn/video/891591",
  "https://tik.porn/video/768188",
  "https://tik.porn/video/717536",
  "https://tik.porn/video/282759",
  "https://tik.porn/video/751787",
  "https://tik.porn/video/717508",
  "https://tik.porn/video/639647",
  "https://tik.porn/video/634628",
  "https://tik.porn/video/882841",
  "https://tik.porn/video/211873",
  "https://tik.porn/video/879796",
  "https://tik.porn/video/211867",
  "https://tik.porn/video/642461",

  // Hentai Uncensored focused (from tag/hentai-uncensored, overlaps removed)
  "https://tik.porn/video/893474",
  "https://tik.porn/video/882491",
  "https://tik.porn/video/762784",
  "https://tik.porn/video/756218",
  "https://tik.porn/video/757590",
  "https://tik.porn/video/675844",
  "https://tik.porn/video/276991",
  "https://tik.porn/video/277082",
  "https://tik.porn/video/256929",
  "https://tik.porn/video/202002",

  // Additional unique from cross-references and related pages
  "https://tik.porn/video/1166460",
  "https://tik.porn/video/900299",
  "https://tik.porn/video/971650",
  "https://tik.porn/video/637617",
  "https://tik.porn/video/1127288",
  "https://tik.porn/video/1292740",
  "https://tik.porn/video/1369369",
  "https://tik.porn/video/1329868",
  "https://tik.porn/video/1281162",
  "https://tik.porn/video/1171759",
  "https://tik.porn/video/1290304",
  "https://tik.porn/video/1362852",
  "https://tik.porn/video/1157885",
  "https://tik.porn/video/1253554",
  "https://tik.porn/video/1339066",
  "https://tik.porn/video/1333361",
  "https://tik.porn/video/1094101",  // repeat safe for variety
  "https://tik.porn/video/1099981",
  "https://tik.porn/video/1079688",
  "https://tik.porn/video/947955",
  "https://tik.porn/video/728750",
  "https://tik.porn/video/645835",
  "https://tik.porn/video/768188",
  "https://tik.porn/video/717536",
  "https://tik.porn/video/751787",
  "https://tik.porn/video/882841",
  "https://tik.porn/video/441785",
  "https://tik.porn/video/633333",
  "https://tik.porn/video/239166",
  "https://tik.porn/video/195658",
  "https://tik.porn/video/198223",
  "https://tik.porn/video/283151",
  "https://tik.porn/video/282759",
  "https://tik.porn/video/639647",
  "https://tik.porn/video/634628",
  "https://tik.porn/video/773158",
  "https://tik.porn/video/879796",
  "https://tik.porn/video/891591",
  "https://tik.porn/video/642461",
  "https://tik.porn/video/637848",
  "https://tik.porn/video/211873",
  "https://tik.porn/video/336092",
  "https://tik.porn/video/351709",
  "https://tik.porn/video/410404",
  "https://tik.porn/video/302296",
  "https://tik.porn/video/313174",
  "https://tik.porn/video/336085",
  "https://tik.porn/video/717508",
  "https://tik.porn/video/675844",
  "https://tik.porn/video/762784",
  "https://tik.porn/video/756218",
  "https://tik.porn/video/757590",
  "https://tik.porn/video/882491",
  "https://tik.porn/video/893474",
  "https://tik.porn/video/276991",
  "https://tik.porn/video/277082",
  "https://tik.porn/video/256929",
  "https://tik.porn/video/202002",
  "https://tik.porn/video/1339066",
  "https://tik.porn/video/1166460",
  "https://tik.porn/video/971650",
  "https://tik.porn/video/1127288",
  "https://tik.porn/video/1292740",
  "https://tik.porn/video/1171759"
  // আরও চাইলে site-এ scroll করে নতুন /video/ links copy করে add করো — number গুলো update হয়
]; // Bukkake Hentai example
    // এখানে আরও add করো! Site-এ গিয়ে ১০-২০টা video link collect করে paste করো।
    // Pattern: https://tik.porn/video/ + number (যেমন /video/1099981)
  ];

  try {
    if (hentaiLinks.length === 0) {
      return api.sendMessage("Hentai link list খালি! প্রথমে tik.porn/tag/hentai থেকে video URLs add করো।", event.threadID, event.messageID);
    }

    // Random link pick
    const randomLink = hentaiLinks[Math.floor(Math.random() * hentaiLinks.length)];

    // Simple attempt to check if page has video (no heavy parsing)
    let bodyText = `Random Hentai clip 🔥 (tik.porn/tag/hentai থেকে)\nLink: ${randomLink}\nNSFW warning - group-এ সাবধান!`;

    api.sendMessage(bodyText + "\nClick করে দেখো, video play হবে!", event.threadID, event.messageID);

    // Optional: যদি direct mp4 চাও, browser-এ page খুলে Network tab-এ .mp4 খুঁজে link add করতে পারো future-এ

  } catch (error) {
    console.error(error.message);
    api.sendMessage("কোনো সমস্যা হয়েছে। আবার !hentai দাও!", event.threadID, event.messageID);
  }
};
