const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const protect = async (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // get token
      token = authHeader.split(" ")[1];

      // verify token
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        const error = new Error("Invalid token");
        error.status = 401;
        return next(error);
      }

      // Get userId from token and add it to req object
      req.user = await UserModel.findOne({ _id: decode.userId }).select(
        "-password"
      );

      next();
    } catch (error) {
      res.status(401);
      next(error);
    }
  }

  if (!token) {
    const error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
};

module.exports = { protect };
