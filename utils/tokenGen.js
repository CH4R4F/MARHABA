const jwt = require("jsonwebtoken");

const tokenGen = (id, expiration = 600) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
};

module.exports = tokenGen;
