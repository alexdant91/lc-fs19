require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended:true }));
app.use(express.json({ extended:true }));

app.get("/ping", (_, res) => {
    return res.status(200).json({ status: "online" });
});

const sum = (req, _, next) => {
    const a = req.body.a;
    const b = req.body.b;
    const sum = a+b;
    req.result= sum;
    next()
};

const output = (req, res) => {
    const result= req.result;
    return res.status(200).json({ result, message: "from output" })
};

app.post("/calc", sum, output);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server up and running on port ${process.env.SERVER_PORT}`);
});