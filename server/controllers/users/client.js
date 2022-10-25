// method: POST
// url: /api/user/client/me
// access: Private - [Manager, Client]
const getClientInfo = (req, res) => {
  console.log(req.user);
  console.log(`Bonjour ${req.user.first_name}, votre rôle est : Client`);
  res.end();
};

module.exports = {
  getClientInfo,
};
