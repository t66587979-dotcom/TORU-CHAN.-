module.exports.config = {
  name: "stop",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Hridoy",
  description: "Force stop all running spam commands",
  commandCategory: "System",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {

  if (global.activeIntervals) {
    global.activeIntervals.forEach(i => clearInterval(i));
    global.activeIntervals = [];
  }

  if (global.activeTimeouts) {
    global.activeTimeouts.forEach(t => clearTimeout(t));
    global.activeTimeouts = [];
  }

  return api.sendMessage(
    "✅ All running spam commands have been stopped.",
    event.threadID
  );
};
