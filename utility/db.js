const fs = require("fs");
const path = require("path");

const readData = (label = "users") => {
    return label != null ? JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/data.json"), { encoding: 'utf8', flag: 'r' }))[label] : JSON.parse(fs.readFileSync(path.join(__dirname, "../../db/data.json"), { encoding: 'utf8', flag: 'r' }))
}

const writeData = (data, label) => {
    const _data = readData(null);

    _data[label] = data;

    fs.writeFileSync(path.join(__dirname, "../../db/data.json"), JSON.stringify(_data, null, 2), {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
    });
}

module.exports = {
    readData,
    writeData
}