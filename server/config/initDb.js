const RoleModel = require("../models/role");
const UserModel = require("../models/user");
const connectDb = require("./db");
const bcrypt = require("bcryptjs");
const roles = process.env.ROLES.split(",");
const defaultUser = {
  first_name: process.env.DEFAULT_USER_FIRST_NAME,
  last_name: process.env.DEFAULT_USER_LAST_NAME,
  email: process.env.DEFAULT_USER_EMAIL,
  password: process.env.DEFAULT_USER_PASSWORD,
  verified: true,
};

async function initDb() {
  await connectDb();
  await createDefaultRoles();
  await createDefaultUser();
}

async function createDefaultRoles() {
  // check if role collection is empty
  RoleModel.countDocuments({}, (err, count) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (count === 0) {
      // insert roles
      roles.forEach(async (role) => {
        const newRole = new RoleModel({ role });
        await newRole.save();
      });
    }
  });
}

async function createDefaultUser() {
  // create and assign a role to default user if not exists
  UserModel.findOne({ email: defaultUser.email }, async (err, user) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      defaultUser.password = await bcrypt.hash(defaultUser.password, salt);
      const newUser = new UserModel(defaultUser);
      const userRole = await RoleModel.findOne({
        role: process.env.DEFAULT_ROLE,
      });
      newUser._roles = [userRole._id];
      await newUser.save();
    }
  });
}

module.exports = initDb;
