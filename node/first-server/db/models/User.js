const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  }
);

const User = model("User", UserSchema);

module.exports = User;