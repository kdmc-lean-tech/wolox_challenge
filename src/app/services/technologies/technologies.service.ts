import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Technology } from '@models/technology.model';
import { ApiGateway } from '@shared/constants/api-gateway/api-gateway.constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient) {
  }

  public getTechnologies(): Observable<Technology[]> {
    const url = `${ApiGateway.TECHS}`;
    return this.http.get<Technology[]>(url);
  }
}
