const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Please add your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
      minlength: 6,
      trim: true,
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
    },
    _roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    refresh_token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
