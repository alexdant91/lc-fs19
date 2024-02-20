const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}

const disconnect = async () => {
    await mongoose.disconnect();
}

const models = {
    User: require("./models/User"),
    Post: require("./models/Post")
}

module.exports = {
    connect,
    disconnect,
    ...models
}