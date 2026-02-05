const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "waifu",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "waifu.im × Hard Fix by Hridoy",
    description: "Random waifu image দেয়",
    commandCategory: "anime",
    usages: "waifu",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID } = event;

    api.setMessageReaction("⏳", messageID, () => {}, true);

    try {
        // 1️⃣ Call API
        const res = await axios.get("https://api.waifu.im/search");

        if (!res.data?.images?.length) {
            throw new Error("No image data");
        }

        const imageURL = res.data.images[0].url;

        // 2️⃣ Download image as buffer
        const imgRes = await axios.get(imageURL, {
            responseType: "arraybuffer"
        });

        // 3️⃣ Save temp file
        const imgPath = path.join(__dirname, "waifu.jpg");
        fs.writeFileSync(imgPath, imgRes.data);

        // 4️⃣ Send image
        api.sendMessage(
            {
                body: "💖 Waifu Found!",
                attachment: fs.createReadStream(imgPath)
            },
            threadID,
            () => {
                api.setMessageReaction("✅", messageID, () => {}, true);
                fs.unlinkSync(imgPath); // cleanup
            }
        );

    } catch (err) {
        console.error("WAIFU ERROR:", err);
        api.setMessageReaction("❌", messageID, () => {}, true);
        api.sendMessage(
            "⚠️ Waifu image আনতে সমস্যা হয়েছে (API/IMAGE ERROR)।",
            threadID,
            messageID
        );
    }
};
