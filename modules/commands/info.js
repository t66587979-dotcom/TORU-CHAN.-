const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "info",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "rX Abdullah",
  description: "Admin and Bot info with gif (local cache).",
  commandCategory: "System",
  cooldowns: 1
};

module.exports.run = async function ({ api, event }) {
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);

  const currentTime = moment
    .tz("Asia/Dhaka")
    .format("『D/MM/YYYY』 【HH:mm:ss】");

  const message =
`𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡
━━━━━━━━━━━━━━━━━━━━━━━
▶ 𝗡𝗮𝗺𝗲: 𝗞𝗮𝗸𝗮𝘀𝗵𝗶 𝗛𝗮𝘁𝗮𝗸𝗲
▶ 𝗔𝗴𝗲: 20
▶ 𝗣𝗼𝘀𝗶𝘁𝗶𝗼𝗻: 𝗢𝘄𝗻𝗲𝗿
▶ 𝗟𝗼𝗰𝗮𝗶𝗼𝗻: 𝗝𝗮𝘀𝗵𝗼𝗿𝗲
▶ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: https://m.me/61587127028066
▶ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: @dukkho____bilash
▶ 𝗪𝗵𝗮𝘁𝘀𝗮𝗽𝗽: 014**-******
▶ 𝗧𝗶𝗺𝗲: ${currentTime}
▶ 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}h ${minutes}m ${seconds}s
━━━━━━━━━━━━━━━━━━━━━━━`;

  // ✅ FIXED CACHE PATH
  const cacheDir = path.join(__dirname, "cache");
  const cacheFile = path.join(cacheDir, "kakashi.gif");

  try {
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    if (!fs.existsSync(cacheFile)) {
      return api.sendMessage(
        "❌ gif ফাইল পাওয়া যায়নি!",
        event.threadID
      );
    }

    await api.sendMessage(
      {
        body: message,
        attachment: fs.createReadStream(cacheFile)
      },
      event.threadID,
      (err, info) => {
        if (!err) {
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, 10000); // 10 sec auto unsend
        }
      }
    );

  } catch (error) {
    console.error(error);
    api.sendMessage("❌ GIF পাঠানো ব্যর্থ হয়েছে।", event.threadID);
  }
};
