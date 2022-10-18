const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please add your first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please add your last name"],
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
    },
    image: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    verification_token: {
      type: String,
      unique: true,
    },
    _roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
