const jwt = require("jsonwebtoken");

const accessGen = (id, expiration = 600) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
};

const refreshGen = (id, expiration = 86400) => {
  return jwt.sign({ userId: id }, process.env.REFRESH_SECRET, {
    expiresIn: expiration,
  });
};

module.exports = { accessGen, refreshGen };
