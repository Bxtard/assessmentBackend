const { createUser, findUser } = require('./user.services.js');

async function createUserHandler(req, res) {
  const { email, password } = req.body;
  console.log(
    '🚀 ~ file: user.controller.js ~ line 7 ~ createUserHandler ~ email: ',
    email,
    ', password: ',
    password
  );
  try {
    user = await findUser(email);
    console.log(
      '🚀 ~ file: user.controller.js ~ line 10 ~ createUserHandler ~ user',
      user
    );
    if (user) {
      return res.status(400).json({ message: 'Email already used' });
    }
    const newUser = await createUser({ email, password });
    console.log(
      '🚀 ~ file: user.controller.js ~ line 15 ~ createUserHandler ~ newUser',
      newUser
    );
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

module.exports = { createUserHandler };
