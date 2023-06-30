import * as dotenv from 'dotenv';
dotenv.config();

import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Logger } from '../lib/logger';
import apiSpec from './apiSpec.json';

const log = new Logger('rest');
const protocol = process.env['SSL_CERT'] ? 'https' : 'http';

const swaggerDocs = (app: Application, port: number) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: apiSpec.openapi,
      info: apiSpec.info,
      components: apiSpec.components,
      security: apiSpec.security,
      paths: apiSpec.paths,
      servers: [
        {
          url: `${protocol}://${process.env['HOST']}:${port}`,
        },
      ],
    },
    apis: ['server/src/routes/*.ts'],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  log.info(`Docs available at ${protocol}://${process.env['HOST']}:${port}/docs`);
};

export default swaggerDocs;
