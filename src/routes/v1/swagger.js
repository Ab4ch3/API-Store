// import Swagger libraries
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';
// Import config File
import config from '../../config/index.js';
// import path
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import debug
import debug from 'debug';
const logger = debug('app:module-swagger');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Metadata info About our API
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Store API-REST',
      description:
        'This is API-REST Store System Documentation based on the OpenAPI 3.0 specification.</br> </br> Some useful links: </br> - [API Store repository](https://github.com/Ab4ch3/API-Store.git) ',
      termsOfService: ' http://swagger.io/terms/',
      contact: {
        name: 'Miguel Abache',
        url: 'https://github.com/Ab4ch3/API-Store.git',
        email: 'miiguel.abache@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/license/mit/'
      },
      version: '1.0.11'
    },
    servers: [
      {
        url: `${config.PUBLIC_URL}:${config.PORT}/api/v1`
      }
    ],
    components: {
      // Esto se usa cuando tenemos Apis Protegidas
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        /* Aca Definimos cada uno de los esquemas que tenemos */
        category: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              example: 'ads123fs123fs123a123'
            },
            name: {
              type: 'string',
              example: 'Computers'
            },
            description: {
              type: 'string',
              example: 'About Computers'
            },
            status: {
              type: 'boolean',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '4/20/2022, 2:21:56'
            }
          }
        },
        article: {
          type: 'object',
          required: ['category', 'name', 'sell_price', 'stock'],
          properties: {
            category: {
              $ref: '#/components/schemas/category'
            },
            code: {
              type: 'string',
              example: '7591127363504'
            },
            name: {
              type: 'string',
              example: 'laptop DELL'
            },
            description: {
              type: 'string',
              example: 'About Laptop DELL'
            },
            sell_price: {
              type: 'number',
              example: 250
            },
            stock: {
              type: 'number',
              example: 3
            },
            status: {
              type: 'boolean',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '4/20/2022, 2:21:56'
            }
          }
        },
        person: {
          type: 'object',
          required: ['type_person', 'name', 'email'],
          properties: {
            type_person: {
              type: 'string',
              example: 'Provider'
            },
            name: {
              type: 'string',
              example: 'Miguel abache'
            },
            document_type: {
              type: 'string',
              example: 'V'
            },
            document_num: {
              type: 'string',
              example: '23541233'
            },
            address: {
              type: 'string',
              example: 'Merida , casa bla bla'
            },
            phone: {
              type: 'number',
              example: '04123552256'
            },
            email: {
              type: 'string',
              example: 'test@test.com'
            },
            status: {
              type: 'boolean',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '4/20/2022, 2:21:56'
            }
          }
        },
        receipt: {
          type: 'object',
          required: [
            'user',
            'person',
            'voucher_type',
            'voucher_num',
            'tax',
            'total'
          ],
          properties: {
            user: {
              $ref: '#/components/schemas/user'
            },
            person: {
              $ref: '#/components/schemas/person'
            },
            voucher_type: {
              type: 'string',
              example: 'FACTURA'
            },
            voucher_series: {
              type: 'string',
              example: '001'
            },
            voucher_num: {
              type: 'string',
              example: '002'
            },
            tax: {
              type: 'number',
              format: 'double',
              example: 0.18
            },
            total: {
              type: 'number',
              example: 300
            },
            details: {
              type: 'object',
              required: ['_id', 'article', 'total_article', 'price'],
              properties: {
                _id: {
                  type: 'string',
                  example: '64fcb3a5fe8c2704bd31aced'
                },
                article: {
                  type: 'string',
                  example: 'laptop HP'
                },
                total_article: {
                  type: 'number',
                  example: 2
                },
                price: {
                  type: 'number',
                  example: 250
                }
              }
            },
            status: {
              type: 'boolean',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '4/20/2022, 2:21:56'
            }
          }
        },
        sale: {
          type: 'object',
          required: [
            'user',
            'person',
            'voucher_type',
            'voucher_num',
            'tax',
            'total'
          ],
          properties: {
            user: {
              $ref: '#/components/schemas/user'
            },
            person: {
              $ref: '#/components/schemas/person'
            },
            voucher_type: {
              type: 'string',
              example: 'FACTURA'
            },
            voucher_series: {
              type: 'string',
              example: '001'
            },
            voucher_num: {
              type: 'string',
              example: '00001'
            },
            tax: {
              type: 'number',
              format: 'double',
              example: 0.18
            },
            total: {
              type: 'number',
              example: 300
            },
            details: {
              type: 'object',
              required: ['_id', 'article', 'total_article', 'price'],
              properties: {
                _id: {
                  type: 'string',
                  example: '64fcb3a5fe8c2704bd31aced'
                },
                article: {
                  type: 'string',
                  example: 'laptop HP'
                },
                total_article: {
                  type: 'number',
                  example: 1
                },
                price: {
                  type: 'number',
                  example: 50
                }
              }
            },
            status: {
              type: 'boolean',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '4/20/2022, 2:21:56'
            }
          }
        },
        user: {
          type: 'object',
          required: ['role', 'name', 'email', 'password'],
          properties: {
            role: {
              type: 'string',
              example: 'Admin'
            },
            name: {
              type: 'string',
              example: 'Miguel abache'
            },
            document_type: {
              type: 'string',
              example: 'V'
            },
            document_num: {
              type: 'string',
              example: '19978234'
            },
            address: {
              type: 'string',
              example: 'jorge coll bla bla'
            },
            phone: {
              type: 'number',
              format: 'double',
              example: '04148521292'
            },
            email: {
              type: 'string',
              example: 'test@test.com'
            },
            password: {
              type: 'string',
              example: '123123123dasdasd'
            },
            status: {
              type: 'boolean',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '4/20/2022, 2:21:56'
            }
          }
        }
      }
    }
  },
  apis: [
    `${path.join(__dirname, './*.js')}` // En caso de que tengamos archivos indivuales por cada ruta
  ] // files containing annotations as above
};

// Docs en JsonFormat
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Function to setup out docs
const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  logger(
    `***  Version 1 Docs are available on ${config.PUBLIC_URL}:${config.PORT}/api/v1/docs ***`
  );
};

export default swaggerDocs;
