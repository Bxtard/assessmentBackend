const healthcheck = require('./api/healthcheck/index');
const user = require('./api/users/user.routes');
const auth = require('./auth/auth.routes');

function routes(app) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);
  app.use('/auth/local', auth);
}

module.exports = routes;