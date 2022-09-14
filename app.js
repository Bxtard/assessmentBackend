require('dotenv').config();
const express = require('express');

const configExpress = require('./config/express');
const routes = require('./routes');
const connectDb = require('./config/database');
const swagger = require('./config/swagger');

const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, async () => {
  configExpress(app);
  await connectDb();
  swagger(app, PORT);
  routes(app);
});

module.exports = { app };
