module.exports.config = {
  name: "aviator",
  version: "1.0.0",
  credits: "Hridoy Hossen",
  description: "Aviator mini game for economy",
  commandCategory: "Game",
  usages: "aviator <bet amount>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users, Currencies }) {
  const bet = parseInt(args[0]);
  if (!bet || bet <= 0) return api.sendMessage("💰 Bet amount দিন।", event.threadID);

  // Check if user has enough balance (Mirai economy)
  const userMoney = (await Currencies.getData(event.senderID)).money || 0;
  if (bet > userMoney) return api.sendMessage("💸 আপনার কাছে এত টাকা নেই!", event.threadID);

  // Deduct bet
  await Currencies.decreaseMoney(event.senderID, bet);

  // Frames for plane animation
  const frames = [
    "✈️───────────────  120m",
    "─✈️──────────────  260m",
    "──✈️─────────────  410m",
    "───✈️────────────  580m",
    "────✈️───────────  760m",
    "─────✈️──────────  940m",
    "──────✈️─────────  1.1km",
    "───────✈️────────  1.3km",
    "────────✈️───────  1.6km",
    "─────────✈️──────  1.9km",
    "──────────✈️─────  2.3km",
    "───────────✈️────  2.8km",
    "────────────✈️───  3.4km",
    "─────────────✈️──  4.1km",
    "──────────────✈️─  5.0km 🚀"
  ];

  // Random crash point
  const crashIndex = Math.floor(Math.random() * frames.length);

  let msg;

  for (let i = 0; i <= crashIndex; i++) {
    await new Promise(r => setTimeout(r, 350));
    const text = `🛫 Aviator Game\n\n${frames[i]}`;
    if (i === 0) {
      msg = await api.sendMessage(text, event.threadID);
    } else {
      api.editMessage(text, msg.messageID);
    }
  }

  // Plane crashed
  const crashDistance = frames[crashIndex].match(/\d+(\.\d+)?/)[0]; // distance number
  const multiplier = 2; // double your prediction
  const winAmount = bet * multiplier;

  await Currencies.increaseMoney(event.senderID, winAmount);

  api.editMessage(
    `💥 Plane crashed at ${crashDistance}!\n🎉 You won: ${winAmount} 💰`,
    msg.messageID
  );
};
