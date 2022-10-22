// method: POST
// url: /api/user/client/me
// access: Private - [Manager, Client]
const getClientInfo = (req, res) => {
  console.log(`Bonjour ${req.user.firet_name}, votre rôle est : Client`);
  res.end();
};

module.exports = {
  getClientInfo,
};
