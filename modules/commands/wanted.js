module.exports.config = {
  name: "wanted",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Kakash",
  description: "Mention করলে One Piece Wanted Poster বানাবে! 🏴‍☠️",
  commandCategory: "Tag Fun",
  usages: "wanted @mention",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": "",
    "jimp": ""
  }
};

module.exports.onLoad = async function () {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule.path;
  const { downloadFile } = global.utils;

  // Custom cache subfolder for canvas/posters
  const canvasDir = __dirname + "/cache/canvas/";
  if (!fs.existsSync(canvasDir)) {
    fs.mkdirSync(canvasDir, { recursive: true });
  }

  const wantedPath = path.resolve(__dirname, "cache/canvas", "wanted.png");

  // Download your provided Imgur link if not exists
  if (!fs.existsSync(wantedPath)) {
    await downloadFile("https://i.imgur.com/9f9xB2f.jpeg", wantedPath);
    console.log("[Wanted] Downloaded base poster to cache/canvas/wanted.png");
  }
};

async function getUserName(api, userID) {
  try {
    const info = await api.getUserInfo(userID);
    return info[userID]?.name || "Unknown Pirate";
  } catch (e) {
    return "Mystery Pirate";
  }
}

async function makeWantedPoster(mentionedID) {
  const Jimp = global.nodemodule.jimp;
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule.path;
  const axios = global.nodemodule.axios;

  const cachePath = path.resolve(__dirname, "cache/canvas");
  const basePoster = await Jimp.read(cachePath + "/wanted.png");

  // Get FB profile pic (high res)
  const profileUrl = `https://graph.facebook.com/${mentionedID}/picture?width=720&height=720&redirect=false`;
  let avatarUrl;
  try {
    const res = await axios.get(profileUrl);
    avatarUrl = res.data.data.url || `https://graph.facebook.com/${mentionedID}/picture?width=720&height=720`;
  } catch {
    avatarUrl = `https://graph.facebook.com/${mentionedID}/picture?width=720&height=720`;
  }

  const avatarRes = await axios.get(avatarUrl, { responseType: "arraybuffer" });
  const avatarTempPath = cachePath + `/avt_${mentionedID}.png`;
  fs.writeFileSync(avatarTempPath, Buffer.from(avatarRes.data));

  let avatar = await Jimp.read(avatarTempPath);
  avatar = avatar.resize(380, 380).circle(); // Circle if template needs, else remove .circle()

  // Composite avatar into poster - ADJUST THESE X,Y based on your image!
  // Typical: photo box starts around x=100-150, y=150-250, size 350-450
  basePoster.composite(avatar, 110, 170); // <--- TEST & CHANGE THIS (x=110, y=170 example)

  // Load fonts (Jimp default for now - bold black/white)
  const fontBig = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  const fontMedium = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

  // WANTED at top (center)
  basePoster.print(fontBig, 0, 30, {
    text: "WANTED",
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
  }, basePoster.getWidth(), 100);

  // DEAD OR ALIVE below photo
  basePoster.print(fontBig, 0, 580, {  // Adjust y if photo position changes
    text: "DEAD OR ALIVE",
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
  }, basePoster.getWidth(), 80);

  // Name below that
  const name = await getUserName(global.api, mentionedID);
  basePoster.print(fontBig, 0, 660, {
    text: name.toUpperCase(),
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
  }, basePoster.getWidth(), 100);

  // Random Bounty
  const bountyLevels = [50000000, 120000000, 300000000, 800000000, 1500000000, 3000000000, 5000000000];
  const randomBounty = bountyLevels[Math.floor(Math.random() * bountyLevels.length)];
  const bountyText = `REWARD: ${randomBounty.toLocaleString()} ₿`;
  basePoster.print(fontBig, 0, 780, {  // Adjust y
    text: bountyText,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
  }, basePoster.getWidth(), 100);

  // Bottom small text
  basePoster.print(fontSmall, 0, basePoster.getHeight() - 80, {
    text: "MARINE HEADQUARTERS - WANTED POSTER",
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
  }, basePoster.getWidth(), 50);

  const outputPath = cachePath + `/wanted_output_${mentionedID}.png`;
  await basePoster.writeAsync(outputPath);

  // Cleanup
  fs.unlinkSync(avatarTempPath);

  return outputPath;
}

module.exports.run = async function ({ event, api }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, mentions } = event;

  const mentionedID = Object.keys(mentions || {})[0];

  if (!mentionedID) {
    return api.sendMessage("কাউকে @mention করো ভাই, তাকে Wanted Pirate বানাবো! 🏴‍☠️", threadID, messageID);
  }

  try {
    const imagePath = await makeWantedPoster(mentionedID);

    const name = mentions[mentionedID].replace(/@/g, '').trim();
    api.sendMessage({
      body: `🏴‍☠️ ${name} কে Wanted ঘোষণা করলাম! Marine-এর হাতে পড়লে বিরাট বাউন্টি! 🤣💰\nBounty: Random generated!`,
      attachment: fs.createReadStream(imagePath)
    }, threadID, () => fs.unlinkSync(imagePath), messageID);
  } catch (err) {
    console.error("Wanted error:", err);
    api.sendMessage("কিছু একটা গণ্ডগোল হয়েছে... Poster print হলো না 😭 Try again!", threadID, messageID);
  }
};
