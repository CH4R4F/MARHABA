// method: POST
// url: /api/auth/login
// access: Public
const login = (req, res) => {
  res.status(200).send("post to login done");
};

// method: POST
// url: /api/auth/register
// access: Public
const register = (req, res) => {
  res.status(200).send("post to register done");
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

module.exports = {
  login,
  register,
  forgetPassword,
  resetPassword,
};
