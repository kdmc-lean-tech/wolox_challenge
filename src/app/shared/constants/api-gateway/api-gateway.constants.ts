import { environment } from '../../../../environments/environment';

const API_URL = `${ environment.API_DOMAIN }`;

export class ApiGateway {
  public static readonly SIGNUP = `${API_URL}/signup`;
  public static readonly LOGIN = `${API_URL}/login`;
  public static readonly TECHS = `${API_URL}/techs`;
}
