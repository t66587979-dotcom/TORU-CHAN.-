module.exports.config = {
    name: "setmoney",
    version: "0.0.1",
    hasPermssion: 2,  // Admin only
    credits: "Raiden Makoto × Hridoy (English by Grok)",
    description: "Change the money balance of yourself or a tagged user",
    commandCategory: "Game",
    usages: "<me / tag / uid> [amount / del]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
    const { threadID, messageID, senderID, mentions, body } = event;
    const prefix = ";";  // Change this if your bot prefix is different

    if (args.length === 0) {
        return api.sendMessage("[SETMONEY] → Incorrect syntax. Usage: setmoney <me/tag/uid> [amount/del]", threadID, messageID);
    }

    // Helper to send message with callback
    const sendAndUpdate = async (msg, callback) => {
        api.sendMessage(msg, threadID, async () => {
            try {
                await callback();
            } catch (err) {
                console.error("Money update error:", err);
                api.sendMessage("[SETMONEY] → Failed to update balance!", threadID, messageID);
            }
        }, messageID);
    };

    // Case 1: setmoney me <amount>
    if (args[0] === "me") {
        if (args.length < 2) return api.sendMessage("[SETMONEY] → Please provide an amount to add!", threadID, messageID);
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount <= 0) return api.sendMessage("[SETMONEY] → Invalid amount!", threadID, messageID);

        return sendAndUpdate(
            `[SETMONEY] → Added ${amount} to your balance.`,
            () => Currencies.increaseMoney(senderID, amount)
        );
    }

    // Case 2: setmoney del (me / tag)
    if (args[0] === "del") {
        if (args[1] === "me") {
            const userData = await Currencies.getData(senderID);
            const current = userData.money || 0;
            if (current <= 0) return api.sendMessage("[SETMONEY] → Your balance is already 0.", threadID, messageID);

            return sendAndUpdate(
                `[SETMONEY] → Cleared your entire balance.\n💸 Amount cleared: ${current}`,
                () => Currencies.decreaseMoney(senderID, current)
            );
        }

        // del for tagged user
        if (Object.keys(mentions).length === 0) {
            return api.sendMessage("[SETMONEY] → Please tag someone to clear their balance.", threadID, messageID);
        }

        const mentionID = Object.keys(mentions)[0];
        const mentionName = mentions[mentionID].replace("@", "");
        const userData = await Currencies.getData(mentionID);
        const current = userData.money || 0;
        if (current <= 0) return api.sendMessage(`[SETMONEY] → ${mentionName}'s balance is already 0.`, threadID, messageID);

        return sendAndUpdate(
            `[SETMONEY] → Cleared ${mentionName}'s entire balance.\n💸 Amount cleared: ${current}`,
            () => Currencies.decreaseMoney(mentionID, current)
        );
    }

    // Case 3: setmoney <tag> <amount>
    if (Object.keys(mentions).length > 0) {
        if (args.length < 2) return api.sendMessage("[SETMONEY] → Please provide an amount to add!", threadID, messageID);
        const amount = parseInt(args[args.length - 1]);  // Last arg as amount
        if (isNaN(amount) || amount <= 0) return api.sendMessage("[SETMONEY] → Invalid amount!", threadID, messageID);

        const mentionID = Object.keys(mentions)[0];
        const mentionName = mentions[mentionID].replace("@", "");

        return sendAndUpdate(
            `[SETMONEY] → Added ${amount} to ${mentionName}'s balance.`,
            () => Currencies.increaseMoney(mentionID, amount)
        );
    }

    // Case 4: setmoney uid <userID> <amount>
    if (args[0] === "uid") {
        if (args.length < 3) return api.sendMessage("[SETMONEY] → Usage: setmoney uid <userID> <amount>", threadID, messageID);
        const uid = args[1];
        const amount = parseInt(args[2]);
        if (isNaN(amount) || amount <= 0) return api.sendMessage("[SETMONEY] → Invalid amount!", threadID, messageID);

        let name = "User";
        try {
            const userData = await Users.getData(uid);
            name = userData.name || "User";
        } catch (e) {}

        return sendAndUpdate(
            `[SETMONEY] → Added ${amount} to ${name}'s balance (UID: ${uid}).`,
            () => Currencies.increaseMoney(uid, amount)
        );
    }

    // Default error
    return api.sendMessage("[SETMONEY] → Incorrect syntax. Try: setmoney me <amount> | setmoney @user <amount> | setmoney del me/@user | setmoney uid <ID> <amount>", threadID, messageID);
};