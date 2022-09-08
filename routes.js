const healthcheck = require('./api/healthcheck/index');
const user = require('./api/users/user.routes');
const { isAuthenticated } = require('./auth/auth.verificators');
const favList = require('./api/favList/favList.routes');
const fav = require('./api/fav/fav.routes');
const auth = require('./auth/auth.routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);
  app.use('/api/fav', isAuthenticated, fav);
  app.use('/api/favList', isAuthenticated, favList);
  app.use('/auth/local', auth);
}

module.exports = routes;
