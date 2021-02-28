import { SessionExpired } from '@clicca-webapp/shared/class/errors/session-expired.error';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

export class SessionChecker {
  session: any;
  user: User;
  isSessionStarted: boolean;

  constructor() {
    this.isSessionStarted = false;
    this.verify();
  }

  getStored(): void {
    this.user = User.fromCache();
   // console.log('User Stored', this.user);
  }

  checkSession(): void {
    this.user.verifyKey();

    //console.log('Is Session',   this.user.verifyKey());
  }

  checkExpiration(): void {
    this.user.checkExpiration();
    //console.log('Is Expirated',   this.user.checkExpiration());
  }

  verify() {
    try {
      this.getStored();
      this.checkSession();
     // this.checkExpiration();

// console.log('User Stored',   this.getStored(), 'Session Checked', this.checkSession(), 'Expiration', this.checkExpiration());

      this.isSessionStarted = true;
    } catch (error) {
      if (error.constructor.name === 'SessionExpired') {
        this.isSessionStarted = true;
        // TODO: Make Refresh
      } else {
        this.isSessionStarted = false;
      }
    }
  }

}
