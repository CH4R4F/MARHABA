const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const InputValidation = require("../utils/inputValidation");
const User = require("../models/user");
const Role = require("../models/role");
const roles = process.env.ROLES.split(",");
const tokenGen = require("../utils/tokenGen");
const { sendConfirmationEmail } = require("../utils/emailSender");

// method: POST
// url: /api/auth/login
// access: Public
const login = (req, res) => {
  res.status(200).send("post to login done");
};

// method: POST
// url: /api/auth/register
// access: Public
const register = async (req, res, next) => {
  let first_name = req.body.first_name || "";
  let last_name = req.body.last_name || "";
  let email = req.body.email || "";
  let password = req.body.password || "";
  let role = req.body.role || "Client";
  try {
    new InputValidation().registerValidation(
      first_name,
      last_name,
      email,
      password
    );

    // check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("User already exists");
      error.status = 400;
      return next(error);
    }

    // get user role's id
    const userRole = await Role.findOne({ role });
    if (!roles.includes(userRole.role)) {
      const error = new Error("Oops, there is no role with name " + role);
      error.status = 400;
      return next(error);
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // genereate a validation token
    const verification_token = crypto.randomBytes(32).toString("hex");

    // create a new user
    const userData = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      verification_token,
    };
    const newUser = new User(userData);
    newUser._roles = [userRole._id];
    // save user
    let save = await newUser.save();

    // send confirmation email
    sendConfirmationEmail(first_name, email, verification_token);

    // send success
    res.status(201).json({
      success: true,
      body: save,
      token: tokenGen(save._id),
    });
  } catch (error) {
    next(error);
  }
};

// method: POST
// url: /api/auth/forgetpassword
// access: Public
const forgetPassword = (req, res) => {
  res.status(200).send("post to forgetpassword done");
};

// method: POST
// url: /api/auth/resetpassword/:token
// access: Public
const resetPassword = (req, res) => {
  const token = req.params.token;
  res.status(200).send("post to resetpassword done with token " + token);
};

const verifyEmail = async (req, res, next) => {
  const token = req.params.token;
  const user = await User.findOne({ verification_token: token });
  if (!user) {
    const error = new Error("Invalid token");
    error.status = 404;
    return next(error);
  }

  user.verified = true;
  await user.save();

  res.status(200).json({
    success: true,
  });
};

module.exports = {
  login,
  register,
  forgetPassword,
  resetPassword,
  verifyEmail,
};
