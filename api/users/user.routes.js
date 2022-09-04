const express = require('express');

const {
  createUserHandler,
} = require('./user.controller');

const router = express.Router();

router.route("/")
.post(createUserHandler);

/* router.route('/:id')
.get(getUserHandler); */

module.exports = router;
