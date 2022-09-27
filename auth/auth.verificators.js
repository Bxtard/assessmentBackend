const jwt = require('jsonwebtoken');
require('dotenv').config();
const { findUser } = require('../api/users/user.services');

const SECRET_KEY = process.env.SECRET_KEY;

async function verifyToken(token) {
  try {
    const payload = await jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (e) {
    return null;
  }
}

async function signToken(payload) {
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
  return token;
}

async function isAuthenticated(req, res, next) {
  const auth = req.headers ? req.headers.authorization : null;

  if (!auth) {
    console.log('[WARNING]: missing authorization header');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  const decoded = await verifyToken(token);

  if (!decoded) {
    console.log('[WARNING]: Token unAuthorized');
    return res.status(401).json({ message: 'unAuthorized' });
  }
  const { email } = decoded;
  const user = await findUser(email);

  if (!user) {
    console.log('[WARNING]: User not found');
    return res.status(404).json({ message: 'User not found' });
  }
  req.user = user;

  console.log('[SUCCESS]: User authorized');
  next();
  return null;
}

module.exports = {
  isAuthenticated,
  signToken,
  verifyToken,
};
