import { Injectable } from '@angular/core';
import { KEY_TOKEN, KEY_USER, User } from '@models/user.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
  }

  get isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  public getUserData(): User | null {
    return JSON.parse(localStorage.getItem(KEY_USER));
  }

  public getToken(): string | null {
    return localStorage.getItem(KEY_TOKEN);
  }

  public setSessionData(token: string, user: User) {
    localStorage.setItem(KEY_TOKEN, token);
    localStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  public clearSession() {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
  }
}
