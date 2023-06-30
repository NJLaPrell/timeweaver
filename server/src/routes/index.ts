import { AuthenticationRoutes } from './authentication.routes';
import { UserRoutes } from './user.routes';

export class Routes {
  app;
  passport;
  ensureAuth;
  ensureGuest;

  authRoutes: AuthenticationRoutes = new AuthenticationRoutes();
  userRoutes: UserRoutes = new UserRoutes();

  constructor(app: any, passport: any, ensureAuth: any, ensureGuest: any) {
    this.app = app;
    this.passport = passport;
    this.ensureAuth = ensureAuth;
    this.ensureGuest = ensureGuest;
  }
  public apply = () => {
    this.authRoutes.apply(this.app, this.passport, this.ensureGuest);
    this.userRoutes.apply(this.app, this.ensureAuth);
  };
}
