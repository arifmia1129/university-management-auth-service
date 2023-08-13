export type LoginCredential = {
  id: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needChangePassword: boolean;
};
