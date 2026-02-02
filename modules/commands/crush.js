module.exports.config = {
  name: "crush",
  version: "7.3.2",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Get Pair From Mention",
  commandCategory: "love",
  usages: "[@mention]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": "",
    "jimp": ""
  }
};

const crushCaptions = [
  "প্রেমে যদি অপূর্ণতাই সুন্দর হয়, তবে পূর্ণতার সৌন্দর্য কোথায়?❤️",
  "যদি বৃষ্টি হতাম… তোমার দৃষ্টি ছুঁয়ে দিতাম! চোখে জমা বিষাদটুকু এক নিমেষে ধুয়ে দিতাম🤗",
  "তোমার ভালোবাসার প্রতিচ্ছবি দেখেছি বারে বার💖",
  "তোমার সাথে একটি দিন হতে পারে ভালো, কিন্তু তোমার সাথে সবগুলি দিন হতে পারে ভালোবাসা🌸",
  "এক বছর নয়, কয়েক জন্ম শুধু তোমার প্রেমে পরতে পরতে ই চলে যাবে😍",
  "কেমন করে এই মনটা দেব তোমাকে… বেসেছি যাকে ভালো আমি, মন দিয়েছি তাকে🫶",
  "পিছু পিছু ঘুরলে কি আর প্রেম হয়ে যায়… কাছে এসে বাসলে ভালো, মন পাওয়া যায়❤️‍🩹",
  "তুমি থাকলে নিজেকে এমন সুখী মনে হয়, যেনো আমার জীবনে কোনো দুঃখই নেই😊",
  "তোমার হাতটা ধরতে পারলে মনে হয় পুরো পৃথিবীটা ধরে আছি🥰",
  "তোমার প্রতি ভালো লাগা যেনো প্রতিনিয়ত বেড়েই চলছে😘"
];

async function makeImage({ one, two }) {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const axios = global.nodemodule["axios"];
  const jimp = global.nodemodule["jimp"];

  const cacheDir = path.join(__dirname, "cache");
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

  // 🔥 ONLINE TEMPLATE IMAGE
  const baseImage = await jimp.read(
    "https://i.imgur.com/PlVBaM1.jpg"
  );

  const avatarOnePath = path.join(cacheDir, `avt_${one}.png`);
  const avatarTwoPath = path.join(cacheDir, `avt_${two}.png`);
  const outPath = path.join(cacheDir, `crush_${one}_${two}.png`);

  const avatar1 = (await axios.get(
    `https://graph.facebook.com/${one}/picture?width=512&height=512`,
    { responseType: "arraybuffer" }
  )).data;

  const avatar2 = (await axios.get(
    `https://graph.facebook.com/${two}/picture?width=512&height=512`,
    { responseType: "arraybuffer" }
  )).data;

  fs.writeFileSync(avatarOnePath, avatar1);
  fs.writeFileSync(avatarTwoPath, avatar2);

  const circleOne = await jimp.read(await circle(avatarOnePath));
  const circleTwo = await jimp.read(await circle(avatarTwoPath));

  baseImage
    .composite(circleOne.resize(191, 191), 93, 111)
    .composite(circleTwo.resize(190, 190), 434, 107);

  await baseImage.writeAsync(outPath);

  fs.unlinkSync(avatarOnePath);
  fs.unlinkSync(avatarTwoPath);

  return outPath;
}

async function circle(image) {
  const jimp = require("jimp");
  const img = await jimp.read(image);
  img.circle();
  return await img.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions);

  if (!mention[0])
    return api.sendMessage("একজনকে মেনশন করো!", threadID, messageID);

  const one = senderID;
  const two = mention[0];
  const caption =
    crushCaptions[Math.floor(Math.random() * crushCaptions.length)];

  const imgPath = await makeImage({ one, two });

  return api.sendMessage(
    {
      body: `✧•❁𝐂𝐫𝐮𝐬𝐡❁•✧\n\n${caption}`,
      attachment: fs.createReadStream(imgPath)
    },
    threadID,
    () => fs.unlinkSync(imgPath),
    messageID
  );
};
