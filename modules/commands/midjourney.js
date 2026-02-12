const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const noobcore = "https://raw.githubusercontent.com/noobcore404/NC-STORE/main/NCApiUrl.json";

async function getMJApi() {
  const res = await axios.get(noobcore, { timeout: 10000 });
  if (!res.data?.mj) throw new Error("MJ API not found in JSON");
  return res.data.mj;
}

module.exports = {
  config: {
    name: "mj",
    aliases: ["midjan", "jan"],
    version: "1.0",
    credits: "rx + modified by ChatGPT",
    hasPermssion: 0,
    countDown: 5,
    shortDescription: "Generate image with MidJanuary AI",
    commandCategory: "AI",
    usages: ".mj <prompt>"
  },

  run: async function ({ api, event, args }) {
    const { threadID } = event;
    const prompt = args.join(" ").trim();

    if (!prompt) {
      return api.sendMessage("❌ Provide a prompt!\nExample: `.mj a futuristic city at sunset`", threadID);
    }

    const loading = await api.sendMessage("⏳ Generating image...", threadID);
    const imgPath = path.join(__dirname, "cache", `${Date.now()}_mj.png`);

    try {
      const BASE_URL = await getMJApi();

      // Try fallback endpoints
      const urlsToTry = [
        `${BASE_URL}?prompt=${encodeURIComponent(prompt)}`,
        `${BASE_URL}/generate?prompt=${encodeURIComponent(prompt)}`,
        `${BASE_URL}/api?prompt=${encodeURIComponent(prompt)}`
      ];

      let response = null;
      for (let url of urlsToTry) {
        try {
          response = await axios.get(url, {
            responseType: "arraybuffer",
            timeout: 180000
          });
          if (response && response.data) break;
        } catch {}
      }

      if (!response?.data) throw new Error("No data from API");

      await fs.ensureDir(path.dirname(imgPath));
      await fs.writeFile(imgPath, Buffer.from(response.data));

      await api.unsendMessage(loading.messageID);

      await api.sendMessage(
        {
          body: `🎨 **MidJanuary AI Image**\nPrompt: ${prompt}`,
          attachment: fs.createReadStream(imgPath)
        },
        threadID
      );

    } catch (err) {
      console.error("MJ Error:", err.message);
      await api.unsendMessage(loading.messageID);
      api.sendMessage("❌ Failed to generate image. The API might expect a different endpoint or parameters.", threadID);
    } finally {
      if (fs.existsSync(imgPath)) await fs.remove(imgPath);
    }
  }
};
