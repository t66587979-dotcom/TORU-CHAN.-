const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "balance",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hridoy",
  description: "Show your balance",
  commandCategory: "Game",
  usages: ".bal | .money | .balance",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const uid = event.senderID;
  const cachePath = path.join(__dirname, "../../cache/currencies.json");

  if (!fs.existsSync(cachePath)) fs.writeJSONSync(cachePath, {});

  let data = fs.readJSONSync(cachePath);

  if (!data[uid]) data[uid] = { balance: 0, daily: 0 };

  const bal = data[uid].balance;

  const msg = `💰 𝐘𝐨𝐮𝐫 𝐁𝐚𝐥𝐚𝐧𝐜𝐞 💰\n━━━━━━━━━━\n🪙 Balance: ${bal}$`;
  return api.sendMessage(msg, event.threadID);
};
