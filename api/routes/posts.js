const express = require("express");
const { authUser } = require("../../middleware/auth");
const Joi = require("joi");
const { outError } = require("../../utility/errors");
const { Post } = require("../../db");
const app = express.Router();

/**
 * @path /api/posts
 */
app.post("/", authUser, async (req, res) => {
    const schema = Joi.object().keys({ 
        title: Joi.string().required(),
        body: Joi.string().required(),
        cover: Joi.string().optional(),
        is_public: Joi.boolean().optional()
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.user = req.user._id;

        const post = await new Post(data).save();

        return res.status(201).json({ ...post.toObject() });
    } catch (error) {
        return outError(res, { error });
    }
});

/**
 * @path /api/posts
 */
app.get("/", async (req, res) => {
    try {
        const posts = await Post.find({}, null, { lean: true }).populate({ path: "user", select: "-password -is_active" });

        return res.status(200).json(posts);
    } catch (error) {
        return outError(res, { error });
    }
});

/**
 * @path /api/posts/:post_id
 */
app.get("/:post_id", async (req, res) => {
    const post_id = req.params.post_id;

    try {
        const post = await Post.findOne({ _id: post_id }, null, { lean: true }).populate({ path: "user", select: "-password -is_active" });

        return res.status(200).json(post);
    } catch (error) {
        return outError(res, { error });
    }
});

module.exports = app;