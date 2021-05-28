import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { SessionService } from '@services/session/session.service';

@Injectable()
export class TestSessionService extends SessionService {
  constructor() {
    super();
  }

  get isLoggedIn() {
    return true;
  }

  public setSessionData(token: string, user: User) {
  }
}
