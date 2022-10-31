const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const InputValidation = require("../utils/inputValidation");
const User = require("../models/user");
const Role = require("../models/role");
const roles = process.env.ROLES.split(",");
const tokenGen = require("../utils/tokenGen");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail, sendResetPasswordEmail } = require("../utils/emailSender");

// method: POST
// url: /api/auth/login
// access: Public
const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // get the user
    const user = await User.findOne({ email }).populate("_roles");
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      return next(error);
    }

    // check if the user is correct
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      const error = new Error("Invalid email or password");
      error.status = 404;
      return next(error);
    }

    // login the user and send the token
    res.status(200).json({
      success: true,
      user,
      token: tokenGen(user._id, "1d"),
    });
  } catch (error) {
    return next(error);
  }
};

// method: POST
// url: /api/auth/register
// access: Public
const register = async (req, res, next) => {
  let first_name = req.body.first_name || "";
  let last_name = req.body.last_name || "";
  let email = req.body.email || "";
  let password = req.body.password || "";
  let role = "Client";
  try {
    new InputValidation().registerValidation(first_name, last_name, email, password);

    // check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("User with this email already exists");
      error.status = 400;
      return next(error);
    }

    // get user role's id
    const userRole = await Role.findOne({ role });
    if (!roles.includes(role)) {
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
      user: save,
      token: tokenGen(save._id),
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// method: POST
// url: /api/auth/forgetpassword
// access: Public
const forgetPassword = async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    const error = new Error("Email is required");
    error.status = 400;
    return next(error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email");
    error.status = 404;
    return next(error);
  }

  const reset_token = tokenGen(user._id); // by default the token expires in 10 minutes
  sendResetPasswordEmail(user.first_name, user.email, reset_token);

  res.status(200).json({
    success: true,
  });
};

// method: POST
// url: /api/auth/resetpassword/:token
// access: Public
const resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const password = req.body.password;

  if (!password) {
    const error = new Error("Password is required");
    error.status = 400;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      const error = new Error("Invalid reset token");
      error.status = 404;
      return next(error);
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();
  } catch (e) {
    const error = new Error("Invalid reset token");
    error.code = "INVALID_TOKEN";
    error.status = 401;
    return next(error);
  }

  res.status(200).json({
    success: true,
  });
};

// method: GET
// url: /api/auth/confirm/:token
// access: Public
const verifyEmail = async (req, res, next) => {
  const token = req.params.token;
  console.log(token);
  if (!token) {
    const error = new Error("Invalid token");
    error.status = 404;
    return next(error);
  }
  const user = await User.findOne({ verification_token: token });
  if (!user) {
    const error = new Error("Invalid token");
    error.status = 404;
    return next(error);
  }

  user.verified = true;
  user.verification_token = null;
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
