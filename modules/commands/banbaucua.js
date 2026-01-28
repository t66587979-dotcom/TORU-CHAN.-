
module.exports.config = {
    name: "banbaucua",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Bau Cua game but with multiple players",
    commandCategory: "Game",
    usages: "[create/join/leave/start/end]",
    cooldowns: 0
};

module.exports.handleEvent = async function ({
    api,
    event,
    Currencies
}) {
    const fs = require("fs-extra");
    const axios = require("axios");
    const {
        threadID,
        messageID,
        body,
        senderID
    } = event;
    if (!body) return;

    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0;
        if (w < parseInt(maxMoney)) return false;
        else return true;
    }

    async function replace(itemOne, itemTwo, itemThree) {
        var bauuu = 'https://i.imgur.com/1MZ2RUz.jpg',
            cuaaa = 'https://i.imgur.com/OrzfTwg.jpg',
            tommm = 'https://i.imgur.com/8nTJyNK.jpg',
            caaa = 'https://i.imgur.com/EOH26Am.jpg',
            naiii = 'https://i.imgur.com/sPP6Glh.jpg',
            gaaa = 'https://i.imgur.com/uV4eyKs.jpg';

        if (itemOne == "bầu") {
            var icon_1 = "🍐",
                path_1 = "bau";
            let img_bau = (await axios.get(bauuu, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_1}.png`, Buffer.from(img_bau, "utf-8"));
        }
        if (itemOne == "cua") {
            var icon_1 = "🦀",
                path_1 = "cua";
            let img_cua = (await axios.get(cuaaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_1}.png`, Buffer.from(img_cua, "utf-8"));
        }
        if (itemOne == "tôm") {
            var icon_1 = "🦞",
                path_1 = "tom";
            let img_tom = (await axios.get(tommm, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_1}.png`, Buffer.from(img_tom, "utf-8"));
        }
        if (itemOne == "cá") {
            var icon_1 = "🐟",
                path_1 = "ca";
            let img_ca = (await axios.get(caaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_1}.png`, Buffer.from(img_ca, "utf-8"));
        }
        if (itemOne == "nai") {
            var icon_1 = "🦌",
                path_1 = "nai";
            let img_nai = (await axios.get(naiii, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_1}.png`, Buffer.from(img_nai, "utf-8"));
        }
        if (itemOne == "gà") {
            var icon_1 = "🐓",
                path_1 = "ga";
            let img_ga = (await axios.get(gaaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_1}.png`, Buffer.from(img_ga, "utf-8"));
        }

        if (itemTwo == "bầu") {
            var icon_2 = "🍐",
                path_2 = "bau";
            let img_bau = (await axios.get(bauuu, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_2}.png`, Buffer.from(img_bau, "utf-8"));
        }
        if (itemTwo == "cua") {
            var icon_2 = "🦀",
                path_2 = "cua";
            let img_cua = (await axios.get(cuaaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_2}.png`, Buffer.from(img_cua, "utf-8"));
        }
        if (itemTwo == "tôm") {
            var icon_2 = "🦞",
                path_2 = "tom";
            let img_tom = (await axios.get(tommm, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_2}.png`, Buffer.from(img_tom, "utf-8"));
        }
        if (itemTwo == "cá") {
            var icon_2 = "🐟",
                path_2 = "ca";
            let img_ca = (await axios.get(caaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_2}.png`, Buffer.from(img_ca, "utf-8"));
        }
        if (itemTwo == "nai") {
            var icon_2 = "🦌",
                path_2 = "nai";
            let img_nai = (await axios.get(naiii, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_2}.png`, Buffer.from(img_nai, "utf-8"));
        }
        if (itemTwo == "gà") {
            var icon_2 = "🐓",
                path_2 = "ga";
            let img_ga = (await axios.get(gaaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_2}.png`, Buffer.from(img_ga, "utf-8"));
        }

        if (itemThree == "bầu") {
            var icon_3 = "🍐",
                path_3 = "bau";
            let img_bau = (await axios.get(bauuu, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_3}.png`, Buffer.from(img_bau, "utf-8"));
        }
        if (itemThree == "cua") {
            var icon_3 = "🦀",
                path_3 = "cua";
            let img_cua = (await axios.get(cuaaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_3}.png`, Buffer.from(img_cua, "utf-8"));
        }
        if (itemThree == "tôm") {
            var icon_3 = "🦞",
                path_3 = "tom";
            let img_tom = (await axios.get(tommm, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_3}.png`, Buffer.from(img_tom, "utf-8"));
        }
        if (itemThree == "cá") {
            var icon_3 = "🐟",
                path_3 = "ca";
            let img_ca = (await axios.get(caaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_3}.png`, Buffer.from(img_ca, "utf-8"));
        }
        if (itemThree == "nai") {
            var icon_3 = "🦌",
                path_3 = "nai";
            let img_nai = (await axios.get(naiii, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_3}.png`, Buffer.from(img_nai, "utf-8"));
        }
        if (itemThree == "gà") {
            var icon_3 = "🐓",
                path_3 = "ga";
            let img_ga = (await axios.get(gaaa, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/${path_3}.png`, Buffer.from(img_ga, "utf-8"));
        }

        var imgBaucua = [];
        imgBaucua.push(fs.createReadStream(__dirname + `/cache/${path_1}.png`));
        imgBaucua.push(fs.createReadStream(__dirname + `/cache/${path_2}.png`));
        imgBaucua.push(fs.createReadStream(__dirname + `/cache/${path_3}.png`));

        var msg = {
            body: `» Result: ${icon_1} | ${icon_2} | ${icon_3}`,
            attachment: imgBaucua
        };
        api.sendMessage(msg, threadID);
    }

    const typ = ['bầu', 'cua', 'tôm', 'cá', 'nai', 'gà'];

    const itemOne = typ[Math.floor(Math.random() * typ.length)];
    const itemTwo = typ[Math.floor(Math.random() * typ.length)];
    const itemThree = typ[Math.floor(Math.random() * typ.length)];

    var ketqua = [itemOne, itemTwo, itemThree];
    const choosee = body.split(" ");

    if (typ.includes(choosee[0].toLowerCase()) == true) {
        if (!global.baucua) return;
        const gameThread = global.baucua.get(threadID) || {};
        if (!gameThread) return;
        if (gameThread.start != true) return;
        if (!choosee[1]) return api.sendMessage('Please enter the bet amount!', threadID, messageID);
        if (await checkMoney(senderID, choosee[1]) == false)
            return api.sendMessage('You do not have enough money to bet!', threadID, messageID);
        else {
            if (!gameThread.player.find(i => i.userID == senderID)) return;
            var s = gameThread.player.findIndex(i => i.userID == senderID);
            var q = gameThread.player[s];
            if (q.choose.status == true)
                return api.sendMessage('⚠ You have already chosen, you cannot choose again!', threadID, messageID);
            else {
                gameThread.player.splice(s, 1);
                gameThread.player.push({
                    name: q.name,
                    userID: senderID,
                    choose: {
                        status: true,
                        msg: choosee[0].toLowerCase(),
                        money: parseInt(choosee[1])
                    }
                });
                api.sendMessage(
                    `👤 Player ${q.name} chose '${choosee[0].toLowerCase()}' with a bet of ${choosee[1]}$`,
                    threadID,
                    messageID
                );

                var vv = 0, vvv = gameThread.player.length;
                for (var c of gameThread.player) {
                    if (c.choose.status == true) vv++;
                }
                if (vv == vvv) {
                    let gifBaucua = (await axios.get('https://i.imgur.com/TdFtFCC.gif', {
                        responseType: "arraybuffer"
                    })).data;
                    fs.writeFileSync(__dirname + `/cache/gifBaucua_push.gif`, Buffer.from(gifBaucua, "utf-8"));
                    api.sendMessage(
                        { body: "» Shaking...", attachment: fs.createReadStream(__dirname + `/cache/gifBaucua_push.gif`) },
                        threadID,
                        async (error, info) => {
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            api.unsendMessage(info.messageID);
                        }
                    );
                    await new Promise(resolve => setTimeout(resolve, 7000));
                    await replace(itemOne, itemTwo, itemThree);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    await checkWin(ketqua, gameThread);
                }
            }
        }
    }

    async function checkWin(ketqua, gameThread) {
        var checkwin = gameThread.player.filter(i => ketqua.includes(i.choose.msg) == true);
        var checklose = gameThread.player.filter(i => ketqua.includes(i.choose.msg) == false);
        var msg = "";

        if (checkwin.length != 0) {
            msg = '[====WINNERS====]\n';
            for (let i of checkwin) {
                var checkItem = ketqua.filter(a => a == i.choose.msg);
                await Currencies.increaseMoney(i.userID, parseInt(i.choose.money) * checkItem.length);
                msg += `${i.name} bet '${i.choose.msg}' + ${parseInt(i.choose.money) * checkItem.length}$\n`;
            }
        }
        if (checklose.length != 0) {
            msg += '\n[====LOSERS====]\n';
            for (let i of checklose) {
                await Currencies.decreaseMoney(i.userID, parseInt(i.choose.money));
                msg += `${i.name} bet '${i.choose.msg}' - ${i.choose.money}$\n`;
            }
        }
        global.baucua.delete(threadID);
        return api.sendMessage(msg, threadID, messageID);
    }
};

module.exports.run = async function ({
    api,
    event,
    args,
    Threads,
    Users,
    Currencies,
    getText
}) {
    try {
        if (!global.baucua) global.baucua = new Map();
        const { threadID, messageID, senderID } = event;
        var gameThread = global.baucua.get(threadID);

        switch (args[0]) {
            case "create":
            case "new":
            case "-c": {
                if (await checkMoney(senderID, 50) == false)
                    return api.sendMessage('You need at least 50$ to join!', threadID, messageID);
                if (global.baucua.has(threadID))
                    return api.sendMessage('⚠ This group already has an active game!', threadID, messageID);

                var name = await Users.getNameUser(senderID);
                global.baucua.set(threadID, {
                    box: threadID,
                    start: false,
                    author: senderID,
                    player: [{
                        name,
                        userID: senderID,
                        choose: { status: false, msg: null, money: null }
                    }]
                });
                return api.sendMessage(
                    'Bau Cua table created successfully!\n...banbaucua join\n...banbaucua start\n...banbaucua leave\n...banbaucua end',
                    threadID,
                    messageID
                );
            }

            case "join":
            case "-j": {
                if (await checkMoney(senderID, 50) == false)
                    return api.sendMessage('You need at least 50$ to join!', threadID, messageID);
                if (!global.baucua.has(threadID))
                    return api.sendMessage('There is no Bau Cua table to join!', threadID, messageID);
                if (gameThread.start == true)
                    return api.sendMessage('The game has already started!', threadID, messageID);
                if (gameThread.player.find(i => i.userID == senderID))
                    return api.sendMessage('You have already joined!', threadID, messageID);

                var name = await Users.getNameUser(senderID);
                gameThread.player.push({
                    name,
                    userID: senderID,
                    choose: { stats: false, msg: null, money: null }
                });
                global.baucua.set(threadID, gameThread);
                return api.sendMessage('Joined successfully!', threadID, messageID);
            }

            case "leave":
            case "-l": {
                if (!global.baucua.has(threadID))
                    return api.sendMessage('There is no Bau Cua table to leave!', threadID, messageID);
                if (!gameThread.player.find(i => i.userID == senderID))
                    return api.sendMessage('You have not joined yet!', threadID, messageID);
                if (gameThread.start == true)
                    return api.sendMessage('The game has already started, too late to leave!', threadID, messageID);

                if (gameThread.author == senderID) {
                    global.baucua.delete(threadID);
                    return api.sendMessage('⚠ The game table has been closed!', threadID, messageID);
                } else {
                    gameThread.player.splice(gameThread.player.findIndex(i => i.userID == senderID), 1);
                    global.baucua.set(threadID, gameThread);
                    var name = await Users.getNameUser(senderID);
                    api.sendMessage('Left successfully!', threadID, messageID);
                    return api.sendMessage(
                        `${name} has left, remaining players: ${gameThread.player.length}`,
                        threadID
                    );
                }
            }

            case "start":
            case "-s": {
                if (!gameThread)
                    return api.sendMessage('There is no Bau Cua table to start!', threadID, messageID);
                if (gameThread.author != senderID)
                    return api.sendMessage('Only the creator can start the game!', threadID, messageID);
                if (gameThread.player.length <= 1)
                    return api.sendMessage('At least 2 players are required!', threadID, messageID);
                if (gameThread.start == true)
                    return api.sendMessage('The game has already started!', threadID, messageID);

                gameThread.start = true;
                global.baucua.set(threadID, gameThread);
                return api.sendMessage(
                    `Game started successfully, players: ${gameThread.player.length}\nPlease enter [bầu/cua/tôm/cá/nai/gà] [bet amount]`,
                    threadID
                );
            }

            case "end":
            case "-e": {
                if (!gameThread)
                    return api.sendMessage('There is no Bau Cua table to end!', threadID, messageID);
                if (gameThread.author != senderID)
                    return api.sendMessage('Only the creator can end the game!', threadID, messageID);

                global.baucua.delete(threadID);
                return api.sendMessage('Game ended successfully', threadID, messageID);
            }

            default: {
                return api.sendMessage(
                    "⚠ COMMANDS:\n- create/new/-c: Create Bau Cua table\n- join/-j: Join Bau Cua table\n- leave/-l: Leave Bau Cua table\n- start/-s: Start the game\n- end/-e: End the game",
                    threadID,
                    messageID
                );
            }
        }
    } catch (err) {
        return api.sendMessage(getText("error", err), event.threadID, event.messageID);
    }

    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0;
        if (w < parseInt(maxMoney)) return false;
        else return true;
    }
};