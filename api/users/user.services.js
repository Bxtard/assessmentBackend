const User = require('./user.model');

function findUser(email) {
  return User.findOne({ email }).populate('favLists');
}

function createUser(user) {
  return User.create(user);
}

function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user, { new: true }).populate('favLists');
}

module.exports = {
  findUser,
  createUser,
  updateUser,
};
