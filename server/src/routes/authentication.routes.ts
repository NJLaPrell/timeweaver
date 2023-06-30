import { ExpressRequest } from '../models/rest.models';
import { Logger } from '../lib/logger';
import { UserAuthentication } from '../lib/auth';
import { Application, Request, Response } from 'express';

const log = new Logger('rest');

const SCOPES = ['profile', 'email'];

export class AuthenticationRoutes {
  public apply = (app: Application, passport: any, ensureGuest: any) => {
    /**
     * @openapi
     * /auth:
     *   get:
     *      tags:
     *        - Authentication
     *      summary: Redirect from Google authentication back to the application. Redirects to /.
     *      parameters:
     *        - name: code
     *          in: query
     *          description: Google authentication code.
     *          required: false
     *          schema:
     *            type: string
     *        - name: state
     *          in: query
     *          description: State of the request.
     *          required: false
     *          schema:
     *            type: string
     *        - name: error
     *          in: query
     *          description: Error message.
     *          required: false
     *          schema:
     *            type: string
     *        - name: error_description
     *          in: query
     *          description: Error description.
     *          required: false
     *          schema:
     *            type: string
     *      responses:
     *        200:
     *          description: OK
     */
    app.get('/auth', passport.authenticate('google', { failureRedirect: '/' }), (req: Request, res: Response) => {
      log.debug('/GET /auth');
      res.redirect('/');
    });

    /**
     * @openapi
     * /login:
     *   get:
     *     tags:
     *       - Authentication
     *     summary: Redirects to Google authentication.
     *     responses:
     *        200:
     *          description: OK
     */
    app.get('/login', ensureGuest, passport.authenticate('google', { scope: SCOPES, accessType: 'offline', prompt: 'consent' }), () => {
      log.debug('GET: /login');
    });

    app.get('/api/user', (req: Request, res: Response) => {
      const expressRequest = <ExpressRequest>req;
      log.debug('GET: /api/user');
      res.json(expressRequest.user);
    });
    /**
     * @openapi
     * /logout:
     *   post:
     *     tags:
     *       - Authentication
     *     summary: Log the user out.
     *     parameters:
     *       - name: dataDeleted
     *         in: query
     *         description: Whether the user data should be deleted and the auth token revoked.
     *         required: false
     *         schema:
     *            type: boolean
     *     responses:
     *        200:
     *          description: OK
     */
    app.post('/logout', (req: Request, res: Response) => {
      const expressRequest = <ExpressRequest>req;
      const dataDeleted = expressRequest.body.dataDeleted === 'true';
      log.debug('POST: /logout', expressRequest.body);
      if (dataDeleted) {
        const auth = new UserAuthentication(expressRequest.user.id);
        auth.revokeToken();
      }
      expressRequest.session.destroy(() => res.redirect(dataDeleted ? '/data-deleted' : '/'));
    });
  };
}
