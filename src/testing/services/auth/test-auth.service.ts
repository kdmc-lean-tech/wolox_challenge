import { Injectable } from '@angular/core';
import { TokenResponse } from '@models/user.model';
import { AuthService } from '@services/auth/auth.service';
import { asyncData } from '@testing/helpers/async-observable-helpers';
import { Observable, of } from 'rxjs';

@Injectable()
export class TestAuthService extends AuthService {
  constructor() {
    super(null);
  }

  public signup(): Observable<TokenResponse> {
    return of({ token: '123456789' });
  }
}
