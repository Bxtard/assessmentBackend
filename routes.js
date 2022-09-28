const express = require('express');

const healthcheck = require('./api/healthcheck/index');
const user = require('./api/users/user.routes');
const { isAuthenticated } = require('./auth/auth.verificators');
const favList = require('./api/favList/favList.routes');
const fav = require('./api/fav/fav.routes');
const auth = require('./auth/auth.routes');

const router = express.Router();

router.use('/api/healthcheck', healthcheck);
router.use('/api/users', user);
router.use('/api/fav', isAuthenticated, fav);
router.use('/api/favList', isAuthenticated, favList);
router.use('/auth/local', auth);

module.exports = router;
