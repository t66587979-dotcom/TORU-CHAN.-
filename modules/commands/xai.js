const axios = require("axios");
require("dotenv").config();

module.exports.config = {
  name: "xai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hridoy",
  description: "Chat with xAI (Grok)",
  commandCategory: "AI",
  usages: "xai <question>",
  cooldowns: 3
};

const XAI_API_KEY = "xai-9EVNQzuTBarwHgv2yZ15lQiSuBCcKPV1whodDcl8QBmmtgb7JKeiryW20XN5TzwGYC0akz8gETQ6aYMy";

// simple memory (per user)
const sessions = {};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (!args[0]) {
    return api.sendMessage("❌ | Please ask something.", threadID, messageID);
  }

  const userMsg = args.join(" ");

  // create session if not exist
  if (!sessions[senderID]) {
    sessions[senderID] = [];
  }

  sessions[senderID].push({
    role: "user",
    content: userMsg
  });

  api.setMessageReaction("⏳", messageID, () => {}, true);

  try {
    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        model: "grok-beta",
        messages: sessions[senderID],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${XAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    sessions[senderID].push({
      role: "assistant",
      content: reply
    });

    api.setMessageReaction("✅", messageID, () => {}, true);

    return api.sendMessage(reply, threadID, messageID);

  } catch (error) {
    console.log(error.response?.data || error.message);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ | xAI API Error!", threadID, messageID);
  }
};

module.exports.handleEvent = () => {};
