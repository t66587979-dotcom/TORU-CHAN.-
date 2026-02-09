module.exports.run = async function ({ api, event, args, Users, Threads }) {
 const { threadID, messageID } = event;
 const request = global.nodemodule["request"];
 const fs = global.nodemodule["fs-extra"];
 const moment = require("moment-timezone");

 const { configPath } = global.client;
 delete require.cache[require.resolve(configPath)];
 const config = require(configPath);

 const { commands } = global.client;
 const threadSetting = (await Threads.getData(String(threadID))).data || {};
 const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

 const uptime = process.uptime();
 const hours = Math.floor(uptime / 3600);
 const minutes = Math.floor((uptime % 3600) / 60);
 const seconds = Math.floor(uptime % 60);

 const totalUsers = global.data.allUserID.length;
 const totalThreads = global.data.allThreadID.length;

 // 🔥 LOADING ANIMATION START
 const loadingSteps = [
  "█░░░░░░░░░ 10%",
  "███░░░░░░░ 30%",
  "█████░░░░░ 50%",
  "███████░░░ 70%",
  "█████████░ 90%",
  "██████████ 100% ✨"
 ];

 let loadMsg = await api.sendMessage("🔄 Loading...\n\n" + loadingSteps[0], threadID);

 for (let i = 1; i < loadingSteps.length; i++) {
  await new Promise(resolve => setTimeout(resolve, 500));
  await api.editMessage(
   "🔄 Loading...\n\n" + loadingSteps[i],
   loadMsg.messageID
  );
 }
 // 🔥 LOADING ANIMATION END

 const msg = `╭⭓ ⪩ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 ⪨
│
├─ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ✦ 𝙏𝙊𝙍𝙐 𝘾𝙃𝘼𝙉 ✦
├─ ☢️ 𝗣𝗿𝗲𝗳𝗶𝘅 : ${config.PREFIX}
├─ ♻️ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗕𝗼𝘅 : ${prefix}
├─ 🔶 𝗠𝗼𝗱𝘂𝗹𝗲𝘀 : ${commands.size}
├─ 🔰 𝗣𝗶𝗻𝗴 : ${Date.now() - event.timestamp}ms
│
╰───────⭓

╭⭓ ⪩ 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗜𝗘𝗦 ⪨
│
├─ ⏳ 𝗔𝗰𝘁𝗶𝘃𝗲 𝗧𝗶𝗺𝗲 : ${hours}h ${minutes}m ${seconds}s
├─ 📣 𝗚𝗿𝗼𝘂𝗽𝘀 : ${totalThreads}
├─ 🧿 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀 : ${totalUsers}
╰───────⭓

❤️ 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 🌺
`;

 const imgLink = "https://i.imgur.com/oEh5VEx.jpeg";

 const callback = () => {
  api.deleteMessage(loadMsg.messageID);
  api.sendMessage({
   body: msg,
   attachment: fs.createReadStream(__dirname + "/cache/info.jpg")
  }, threadID, () => fs.unlinkSync(__dirname + "/cache/info.jpg"));
 };

 return request(encodeURI(imgLink))
  .pipe(fs.createWriteStream(__dirname + "/cache/info.jpg"))
  .on("close", callback);
};
