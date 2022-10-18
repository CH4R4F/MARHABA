const jwt = require("jsonwebtoken");

const tokenGen = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: 600,
  });
};

module.exports = tokenGen;
