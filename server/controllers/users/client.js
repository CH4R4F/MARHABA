// method: POST
// url: /api/user/client/me
// access: Private - [Manager, Client]
const getClientInfo = (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
};

module.exports = {
  getClientInfo,
};
