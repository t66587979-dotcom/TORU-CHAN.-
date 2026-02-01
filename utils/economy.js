const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../economy/economy.json");

function loadData() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dataPath));
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
    getUser(id) {
        const data = loadData();
        if (!data[id]) {
            data[id] = { money: 0 };
            saveData(data);
        }
        return data[id];
    },

    getMoney(id) {
        return this.getUser(id).money;
    },

    addMoney(id, amount) {
        const data = loadData();
        if (!data[id]) data[id] = { money: 0 };
        data[id].money += amount;
        saveData(data);
    },

    setMoney(id, amount) {
        const data = loadData();
        data[id] = { money: amount };
        saveData(data);
    },

    removeMoney(id, amount) {
        const data = loadData();
        if (!data[id]) data[id] = { money: 0 };
        data[id].money -= amount;
        if (data[id].money < 0) data[id].money = 0;
        saveData(data);
    }
};
