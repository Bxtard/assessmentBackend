const {
  createUser,
  findUser,
} = require('./user.services.js')

async function createUserHandler(req, res) {
  const {email, password} = req.body
  try {
    user = await findUser(email);
    if (user) {
      return res.status(400).json({message: 'Email already used'})
    }
    const user = await createUser({email, password})
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {createUserHandler};
