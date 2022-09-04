const { findUserByEmail } = require('../users/services');
const { verifyToken, signToken } = require('./auth.controllers');

async function loginUserHandler(req, res) {

  const { email, password } = req.body;
  console.log("🚀 ~ file: auth.services.js ~ line 7 ~ loginUserHandler ~ email, password", email, password)

  try {
    const user = await findUserByEmail(email);
    console.log("🚀 ~ file: auth.services.js ~ line 11 ~ loginUserHandler ~ user", user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    console.log("🚀 ~ file: auth.services.js ~ line 18 ~ loginUserHandler ~ isMatch", isMatch)

    if (!isMatch) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const token = await signToken({ email: user.email });
    console.log("🚀 ~ file: auth.services.js ~ line 25 ~ loginUserHandler ~ token", token)

    return res.json({ token });
  } catch (e) {
    return res.status(500).json(e);
  }
}

async function isAuthenticated(req, res, next) {

  const authorization = req.headers?.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.splice(" ")[1];

  const decoded = await verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'unAuthorized' });
  }

  const { email } = decoded;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = user;

  next();
  return null;
}

module.exports = { loginUserHandler, isAuthenticated };
