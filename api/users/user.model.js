const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favs',
    },
  },
  {
    timestamps: true,
  }
);

// methods

UserSchema.pre('save', async function save(next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (e) {
    next(e);
  }
});

UserSchema.methods.comparePassword = async function comparepassword(
  enteredPassword,
  next
) {
  const user = this;
  try {
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    return isMatch;
  } catch (e) {
    next(e);
    return false;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
