const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
const { accessGen } = require("../../utils/tokenGen");

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.refresh_token) {
      const error = new Error("No refresh token found");
      error.statusCode = 401;
      throw error;
    }

    const user = await userModel.findOne({ refresh_token: cookies.refresh_token });

    if (!user) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 403;
      throw error;
    }

    // verify refresh token
    const decoded = jwt.verify(cookies.refresh_token, process.env.REFRESH_SECRET);
    const { userId } = decoded;

    if (userId !== user._id.toString()) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 403;
      throw error;
    }

    // generate new access token
    const accessToken = accessGen(user._id);

    // send new access token
    res.status(200).json({
      message: "Access token refreshed",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = handleRefreshToken;
