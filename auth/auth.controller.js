const { findUser } = require('../api/users/user.services');
const { signToken } = require('./auth.verificators');

async function loginHandler(req, res) {
  const { email, password } = req.body;
  console.log('Request on loginUserHandler');

  try {
    const user = await findUser(email);
    console.log('[SUCCESS]: An user was found');

    if (!user) {
      console.log('[WARNING]: User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('[SUCCESS]: Password was compared successfully');

    if (!isMatch) {
      console.log('[WARNING]: Password does not match');
      return res.status(401).json({ message: 'Password does not match' });
    }

    const token = await signToken({ email: user.email });
    console.log('[SUCCESS]: A JWT has been signed successfully');

    return res.json({ token });
  } catch (error) {
    console.log('[ERROR]: Server Error: ' + error);
    return res.status(500).json(error);
  }
}

module.exports = { loginHandler };
