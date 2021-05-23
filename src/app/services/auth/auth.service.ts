import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from '@shared/constants/api-gateway/api-gateway.constants';
import { Observable } from 'rxjs';
import { UserBody, TokenResponse } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signup(body: UserBody): Observable<TokenResponse> {
    const url = `${ApiGateway.SIGNUP}`;
    return this.http.post<TokenResponse>(url, body);
  }
}
