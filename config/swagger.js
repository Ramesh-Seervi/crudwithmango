const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RPS News API',
      version: '1.0.0',
      description: 'API documentation for the RPS News reports portal'
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || '/' // Use root-relative URL for flexibility
      }
    ]
  },
  // Files containing annotations for the OpenAPI specification
  // Using path.join with __dirname ensures the files are found regardless of CWD
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, '../models/*.js')
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
