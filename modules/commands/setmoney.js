module.exports.config = {
    name: "setmoney",
    version: "1.2.0",
    hasPermssion: 2,
    credits: "Hridoy × Mirai Stable",
    description: "Admin money control (safe & stable)",
    commandCategory: "Economy",
    usages: "me | @tag | uid <id> <amount> | del @tag",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const { threadID, messageID, senderID, mentions } = event;

    if (!args[0]) {
        return api.sendMessage(
`❌ Usage:
.setmoney me <amount>
.setmoney @user <amount>
.setmoney uid <id> <amount>
.setmoney del @user`,
            threadID,
            messageID
        );
    }

    /* ========= DELETE FIRST ========= */
    if (args[0] === "del") {
        if (Object.keys(mentions).length === 0)
            return api.sendMessage("❌ Please tag a user to clear balance", threadID, messageID);

        const uid = Object.keys(mentions)[0];
        const data = await Currencies.getData(uid);
        const money = data.money || 0;

        await Currencies.decreaseMoney(uid, money);
        return api.sendMessage(`🗑 Balance cleared (${money}$)`, threadID, messageID);
    }

    /* ========= ME ========= */
    if (args[0] === "me") {
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount <= 0)
            return api.sendMessage("❌ Invalid amount", threadID, messageID);

        await Currencies.increaseMoney(senderID, amount);
        return api.sendMessage(`✅ Added ${amount}$ to your balance`, threadID, messageID);
    }

    /* ========= UID ========= */
    if (args[0] === "uid") {
        const uid = args[1];
        const amount = parseInt(args[2]);

        if (!uid || isNaN(amount) || amount <= 0)
            return api.sendMessage("❌ Usage: .setmoney uid <id> <amount>", threadID, messageID);

        await Currencies.increaseMoney(uid, amount);

        let name = uid;
        try {
            const u = await Users.getData(uid);
            name = u.name || uid;
        } catch {}

        return api.sendMessage(`✅ Added ${amount}$ to ${name}`, threadID, messageID);
    }

    /* ========= TAG ========= */
    if (Object.keys(mentions).length > 0) {
        const uid = Object.keys(mentions)[0];
        const amount = parseInt(args[args.length - 1]);

        if (isNaN(amount) || amount <= 0)
            return api.sendMessage("❌ Invalid amount", threadID, messageID);

        await Currencies.increaseMoney(uid, amount);
        const name = mentions[uid].replace("@", "");

        return api.sendMessage(`✅ Added ${amount}$ to ${name}`, threadID, messageID);
    }

    return api.sendMessage("❌ Invalid syntax", threadID, messageID);
};
