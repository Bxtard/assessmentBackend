require('dotenv').config();
const express = require('express');
const configExpress = require('./config/express');
const connectDb = require('./config/database');
const swagger = require('./config/swagger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(routes);

app.listen(PORT, async () => {
  configExpress(app);
  await connectDb();
  swagger(app, PORT);
});

module.exports = { app };
