const { createUser, findUser } = require('./user.services.js');

async function createUserHandler(req, res) {
  const { email, password } = req.body;
  try {
    user = await findUser(email);
    console.log('[SUCCESS]: An user was found');
    if (user) {
      console.log('[WARNING]: User not found');
      return res.status(400).json({ message: 'Email already used' });
    }
    const newUser = await createUser({ email, password });
    console.log('[SUCCESS]: An user was created');
    return res.status(201).json(newUser);
  } catch (error) {
    console.log('[ERROR]: error createUserHandler: ' + error);
    return res.status(500).json({ error });
  }
}

module.exports = { createUserHandler };
