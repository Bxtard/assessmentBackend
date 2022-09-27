const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
});

function validateUser(req, res, next) {
  const { email, password } = req.body;
  const payload = { email, password };
  const { error } = userSchema.validate(payload);

  if (error) {
    console.log('[ERROR]: missing required fields');
    return res.status(400).json({ message: 'missing data' });
  }

  next();
  return null;
}

module.exports = { validateUser };
