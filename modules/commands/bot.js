const axios = require("axios");

let simsim = "";

(async () => {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/rxabdullah0007/rX-apis/main/xApis/baseApiUrl.json");
    if (res.data && res.data.rx) {
      simsim = res.data.rx;
    }
  } catch {}
})();

module.exports.config = {
  name: "baby",
  version: "1.0.7",
  hasPermssion: 0,
  credits: "rX+Hridoy",
  description: "AI auto teach with Teach & List support + Typing effect",
  commandCategory: "Utility",
  usages: "[query]",
  cooldowns: 0,
  prefix: false
};

// 🔹 BOX HELPER (ONLY FOR FIXED REPLIES)
function boxReply(senderName, text) {
  return `╭──────•◈•──────╮
    ʜᴇʏ ɪᴀᴍ ᴛᴏʀᴜ ᴄʜᴀɴ

 ✰ Hi ${senderName},
 ${text}
╰──────•◈•──────╯瀋`;
}

module.exports.run = async function ({ api, event, args, Users }) {
  const uid = event.senderID;
  const senderName = await Users.getNameUser(uid);
  const query = args.join(" ").toLowerCase();

  try {
    if (!simsim) return api.sendMessage("❌ API not loaded yet.", event.threadID, event.messageID);

    if (!query) {
      const texts = ["Hey baby 💖", "Yes, I'm here 😘"];
      const reply = texts[Math.floor(Math.random() * texts.length)];
      return api.sendMessage(reply, event.threadID);
    }

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
    return api.sendMessage(res.data.response, event.threadID);
  } catch (e) {
    return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const text = event.body?.toLowerCase().trim();
  if (!text || !simsim) return;

  const senderName = await Users.getNameUser(event.senderID);
  const triggers = ["bot"];

  // ✅ FIXED REPLIES (BOX ONLY HERE)
  if (triggers.includes(text)) {
    const replies = [
      "𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐰𝐚𝐥𝐚𝐢𝐤𝐮𝐦 ♥",
      "বলেন sir__😌",
      "𝐁𝐨𝐥𝐨 𝐣𝐚𝐧 𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢 𝐭𝐨𝐦𝐫 𝐣𝐨𝐧𝐧𝐨 🐸",
      "𝐋𝐞𝐛𝐮 𝐤𝐡𝐚𝐰 𝐝𝐚𝐤𝐭𝐞 𝐝𝐚𝐤𝐭𝐞 𝐭𝐨 𝐡𝐚𝐩𝐚𝐲 𝐠𝐞𝐬𝐨",
      "𝐆𝐚𝐧𝐣𝐚 𝐤𝐡𝐚 𝐦𝐚𝐧𝐮𝐬𝐡 𝐡𝐨 🍁",
      "𝐋𝐞𝐦𝐨𝐧 𝐭𝐮𝐬 🍋",
      "মুড়ি খাও 🫥",
      "𝐚𝐦𝐤𝐞 𝐬𝐞𝐫𝐞 𝐝𝐞𝐰 𝐚𝐦𝐢 𝐚𝐦𝐦𝐮𝐫 𝐤𝐚𝐬𝐞 𝐣𝐚𝐛𝐨!!🥺.....😗",
      "লুঙ্গি টা ধর মুতে আসি🙊🙉",
      "──‎ 𝐇𝐮𝐌..? 👉👈",
      "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🐸",
      "কি হলো, মিস টিস করচ্ছো নাকি 🤣",
      "𝐓𝐫𝐮𝐬𝐭 𝐦𝐞 𝐢𝐚𝐦 𝐭𝐨𝐫𝐮 𝐟𝐫𝐨𝐦 𝐤𝐚𝐤𝐚𝐬𝐡𝐢🧃",
      "𝗛𝗲𝘆 𝘅𝗮𝗻 𝗶𝗮𝗺 𝘁𝗼𝗿𝘂 𝗰𝗵𝗮𝗻✨
      "বেশি Bok Bok করলে leave নিবো কিন্তু😒",
      "🥛-🍍👈 -লে খাহ্..!😒",
      "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নাই🥺",
      "আমি আবাল দের সাথে কথা বলি না😒",
      "এতো ডেকো না, প্রেমে পরে যাবো 🙈",
      "বার বার ডাকলে মাথা গরম হয়ে যায়😑",
     "𝐓𝐨𝐫 𝐧𝐚𝐧𝐢𝐫 𝐮𝐢𝐝 𝐦𝐞 𝐝𝐞 𝐤𝐡𝐚𝐢 𝐝𝐢 𝐚𝐦𝐢 🦆",
    "এতো ডাকছিস কেন? গালি শুনবি নাকি? 🤬""
    ];

    const raw = replies[Math.floor(Math.random() * replies.length)];
    const boxed = boxReply(senderName, raw);

    try {
      await api.sendTypingIndicatorV2(true, event.threadID);
      await new Promise(r => setTimeout(r, 5000));
      await api.sendTypingIndicatorV2(false, event.threadID);
    } catch {}

    return api.sendMessage(boxed, event.threadID);
  }

  // ❌ EVERYTHING ELSE NORMAL (NO BOX)
  const matchPrefix = /^(baby|bby|xan|bbz|toru|kakashi)\s+/i;
  if (matchPrefix.test(text)) {
    const query = text.replace(matchPrefix, "").trim();
    if (!query) return;

    try {
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      return api.sendMessage(res.data.response, event.threadID);
    } catch (e) {
      return api.sendMessage(`❌ Error: ${e.message}`, event.threadID);
    }
  }
};
