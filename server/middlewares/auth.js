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
        // Get userId from token and add it to req object
        req.user = await UserModel.findOne({ _id: decode.userId })
          .select("-password")
          .populate("_roles");
      } catch (err) {
        const error = new Error("Invalid token");
        error.code = "INVALID_TOKEN";
        error.status = 401;
        return next(error);
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(error);
    }
  }

  if (!token) {
    const error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
};

const authorizeManager = (req, res, next) => {
  if (req.user.role !== "Manager") {
    const error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
  next();
};

const authorizeClient = async (req, res, next) => {
  const roles = req.user._roles.map((role) => role.role);

  if (!roles.includes("Client")) {
    const error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
  next();
};

const authorizeDeliveryman = (req, res, next) => {
  const roles = req.user._roles.map((role) => role.role);

  if (!roles.includes("Deliveryman")) {
    const error = new Error("Not Authorized");
    error.status = 401;
    next(error);
  }
  next();
};

module.exports = {
  protect,
  authorizeManager,
  authorizeClient,
  authorizeDeliveryman,
};
