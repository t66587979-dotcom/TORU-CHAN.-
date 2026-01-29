const fs = require("fs-extra");
const path = require("path");

const SPECIAL_UID = "100003673251961"; // Your UID

module.exports.config = {
  name: "send",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Hridoy",
  description: "Give or set money (special ID only)",
  commandCategory: "Game",
  usages: ".send <UID> <amount> | .setmoney <UID> <amount>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const uid = event.senderID;
  const cachePath = path.join(__dirname, "../../cache/currencies.json");

  if (!fs.existsSync(cachePath)) fs.writeJSONSync(cachePath, {});

  let data = fs.readJSONSync(cachePath);

  if (uid !== SPECIAL_UID) return api.sendMessage("❌ You are not allowed to use this command!", event.threadID);

  const subCommand = args[0];
  const target = args[1];
  const amount = parseInt(args[2]);

  if (!subCommand || !target || isNaN(amount)) {
    return api.sendMessage("Usage:\n.give <UID> <amount>\n.setmoney <UID> <amount>", event.threadID);
  }

  if (!data[target]) data[target] = { balance: 0, daily: 0 };

  if (subCommand.toLowerCase() === "give") {
    data[target].balance += amount;
    fs.writeJSONSync(cachePath, data, { spaces: 2 });
    return api.sendMessage(`✅ Given ${amount}$ to ${target}\n💰 New Balance: ${data[target].balance}$`, event.threadID);
  }

  if (subCommand.toLowerCase() === "setmoney") {
    data[target].balance = amount;
    fs.writeJSONSync(cachePath, data, { spaces: 2 });
    return api.sendMessage(`✅ Set balance of ${target} to ${amount}$`, event.threadID);
  }

  return api.sendMessage("❌ Invalid subcommand!", event.threadID);
};
