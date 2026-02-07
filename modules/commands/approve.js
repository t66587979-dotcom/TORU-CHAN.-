const fs = require("fs");
const path = require("path");

module.exports.config = {
 name: "approve",
 version: "3.0",
 hasPermssion: 0, // সবাই ব্যবহার করতে পারবে
 credits: "rX - Modified by Hridoy",
 description: "Approve system disabled permanently",
 commandCategory: "Admin",
 usages: "",
 cooldowns: 5,
};

// ===== MAIN =====
module.exports.run = async ({ api, event, args }) => {
 const threadID = event.threadID;

 // যদি কেউ .approve box লেখে
 if (args[0] === "box") {
   return api.sendMessage(
`╭─‣ 𝐀𝐏𝐏𝐑𝐎𝐕𝐄 𝐒𝐘𝐒𝐓𝐄𝐌 𝐎𝐅𝐅
├‣ Approval system has been disabled.
├‣ All groups can use the bot.
╰────────────◊`,
   threadID
   );
 }

 // Default approve message
 return api.sendMessage(
`✅ 𝐀𝐏𝐏𝐑𝐎𝐕𝐄 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐒 𝐎𝐅𝐅

🔓 No need to approve any group.
♻️ Bot restart won't require approval.
🚀 Everyone can use the bot now.`,
 threadID
 );
};
