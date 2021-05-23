
export interface User {
  name: string;
  lastName: string;
  country: string;
  province: string;
  email: string;
  phone: string;
}

export interface UserBody extends User {
  password: string;
}

export interface TokenResponse {
  token: string;
}

export const KEY_TOKEN = 'TOKEN';
export const KEY_USER = 'USER';
