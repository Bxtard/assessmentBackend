const express = require('express');
const { validateUser } = require('./user.JoiSchemas');

const { createUserHandler } = require('./user.controller');

const router = express.Router();

router.post('/', validateUser, createUserHandler);

module.exports = router;
