const nodemailer = require("nodemailer");
const email = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASS;
const host = process.env.FRONT_END_URL;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

async function sendConfirmationEmail(name, email, token) {
  const mailOptions = {
    from: email,
    to: email,
    subject: "Email Confirmation",
    html: `<h1>Hello ${name}</h1>
    <p>Thank you for registering on our website</p>
    <p>Please click on the link below to confirm your email</p>
    <a href="${host}/api/auth/confirm/${token}">Confirm Email</a>`,
  };

  await transporter.sendMail(mailOptions);
  console.log("verifiction email was sent");
}

async function sendResetPasswordEmail(name, email, token) {
  const mailOptions = {
    from: email,
    to: email,
    subject: "Reset Password",
    html: `<h1>Hello ${name}</h1>
    <p>Please click on the link below to reset your password</p>
    <a href="${host}/api/auth/resetpassword/${token}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions);
  console.log("reset password email was sent");
}

module.exports = { sendConfirmationEmail, sendResetPasswordEmail };
