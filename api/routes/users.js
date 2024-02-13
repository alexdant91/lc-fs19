const express = require("express");
const app = express.Router();

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

/**
 * @path /api/users
 */
app.get("/", (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const data = readData("users");

    const start_index = limit * (page - 1);

    const users = [...data].splice(start_index, limit);

    const total_pages = Math.ceil(data.length / limit);
    const has_next_page = page < total_pages;
    const has_prev_page = page > 1;

    return res.status(200).json({
        data: users,
        page,
        limit,
        total_items: data.length,
        total_pages,
        has_next_page,
        has_prev_page,
    });
})

/**
 * @path /api/users/:user_id
 */
app.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const data = readData("users");
    const user = data.find((item) => item.id == user_id);

    return res.status(200).json(user);
})

/**
 * @path /api/users
 */
app.post("/", (req, res) => {
    const data = readData("users");
    const full_name = req.body.full_name;
    const age = req.body.age;

    const user = {
        id: Date.now(),
        full_name,
        age
    }

    data.push(user);

    writeData(data, "users");

    return res.status(201).json(user);
})

/**
 * @path /api/users/:user_id
 */
app.put("/:user_id", (req, res) => {
    const data = readData("users");
    const user_id = req.params.user_id;
    const full_name = req.body.full_name;
    const age = req.body.age;

    const user_index = data.findIndex((item) => item.id == user_id);

    if (user_index === -1) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    if (full_name) data[user_index].full_name = full_name;
    if (age) data[user_index].age = age;

    writeData(data, "users");

    return res.status(200).json({
        message: "user updated"
    })
})

/**
 * @path /api/users/:user_id
 */
app.delete("/:user_id", (req, res) => {
    const data = readData("users");
    const user_id = req.params.user_id;

    const user_index = data.findIndex((item) => item.id == user_id);

    if (user_index === -1) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    data.splice(user_index, 1);

    writeData(data, "users");

    return res.status(200).json({
        message: "user deleted"
    })
})

module.exports = app;