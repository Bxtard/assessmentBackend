const { findUser } = require('../api/users/user.services');
const { signToken } = require('./auth.verificators');

async function loginHandler(req, res) {
  const { email, password } = req.body;
  console.log(
    '🚀 ~ file: auth.controller.js ~ line 7 ~ loginUserHandler ~ email, password',
    email,
    password
  );

  try {
    const user = await findUser(email);
    console.log(
      '🚀 ~ file: auth.controller.js ~ line 15 ~ loginUserHandler ~ user',
      user
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    console.log(
      '🚀 ~ file: auth.controller.js ~ line 25 ~ loginUserHandler ~ isMatch',
      isMatch
    );

    if (!isMatch) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const token = await signToken({ email: user.email });
    console.log(
      '🚀 ~ file: auth.controller.js ~ line 35 ~ loginUserHandler ~ token',
      token
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = { loginHandler };
