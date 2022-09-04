const User = require('./user.model');

function findUser(email) {
  return User.findOne({ email });
}

function createUser(user) {
  return User.create(user);
}

module.exports = {
  findUser,
  createUser,
};
