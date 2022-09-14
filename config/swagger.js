const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { version } = require('../package.json');

const route = path.join(__dirname, '../api/favList/favList.controller.js');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FavList API',
      version,
      description: 'Documentation FavList API',
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
      contact: {
        name: 'Bryan Estrada (Bxtard)',
        url: 'https://linkedin.com/bxtrda',
        email: 'ee.mxtrd@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:8080`,
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Unauthorized: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'User is not authorized',
              example: 'User is not authorized',
            },
          },
        },
        ServerError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Server crash',
              example: 'internal server error',
            },
          },
        },
        FavListSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'name of the fav list',
              example: 'List 1',
            },
            favItem: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'title of the fav',
                    example: 'My first fav',
                  },
                  description: {
                    type: 'string',
                    description: 'description of the fav',
                    example: 'This is my fav',
                  },
                  link: {
                    type: 'string',
                    description: 'link of the fav',
                    example: 'http://google.com',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [route],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
