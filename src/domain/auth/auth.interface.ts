import { Types } from 'mongoose';
import { RefreshToken, RegistrationM } from '../model/auth';
import { UserModel } from '../model/user';

export interface IAuth {
  register(registrationData: RegistrationM): Promise<UserModel>;
  getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserModel>;
  getCookieForLogout(): string[];
  getCookieWithJwtAccessToken(id: Types.ObjectId): string;
  getCookieWithJwtRefreshToken(id: Types.ObjectId): RefreshToken;
}
