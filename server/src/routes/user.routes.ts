import { ExpressRequest } from '../models/rest.models';
import { Logger } from '../lib/logger';
import { Application, Request, Response } from 'express';

const log = new Logger('rest');

export class UserRoutes {
  public apply = (app: Application, ensureAuth: any) => {
    /**
     * @openapi
     * /api/user:
     *   get:
     *     tags:
     *       - User
     *     summary: Retrieves the current user
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     */

    app.get('/api/user', (req: Request, res: Response) => {
      // TODO: Finish
      const expressRequest = <ExpressRequest>req;
      log.debug('GET: /api/user');
      res.json(expressRequest.user);
    });
  };
}
