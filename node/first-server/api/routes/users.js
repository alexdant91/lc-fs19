const express = require("express");
const app = express.Router();

const Joi = require("joi");
const bcrypt = require("bcryptjs");

const { readData, writeData } = require("../../utility/db");
const { User } = require("../../db");

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
});

/**
 * @path /api/users/:user_id
 */
app.get("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const data = readData("users");
  const user = data.find((item) => item.id == user_id);

  return res.status(200).json(user);
});

/**
 * @path /api/users
 */
app.post("/", async (req, res) => {

  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.password = bcrypt.hashSync(data.password);

    const user = await new User(data).save();

    return res.status(201).json({
        ...user.toObject()
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 * @path /api/users/:user_id
 */
app.put("/:user_id", async (req, res) => {
  const data = readData("users");
  const user_id = req.params.user_id;

  const schema = Joi.object().keys({
    full_name: Joi.string().optional(),
    age: Joi.number().optional(),
  });

  try {
    const body = await schema.validateAsync(req.body)
    const user_index = data.findIndex((item) => item.id == user_id);

    if (user_index === -1) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const {full_name, age} = body;

    if (full_name) data[user_index].full_name = full_name;
    if (age) data[user_index].age = age;

    writeData(data, "users");

    return res.status(200).json({
      message: "user updated",
    });
  } catch (error) {

  }
});

/**
 * @path /api/users/:user_id
 */
app.delete("/:user_id", (req, res) => {
  const data = readData("users");
  const user_id = req.params.user_id;

  const user_index = data.findIndex((item) => item.id == user_id);

  if (user_index === -1) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  data.splice(user_index, 1);

  writeData(data, "users");

  return res.status(200).json({
    message: "user deleted",
  });
});

module.exports = app;
