import { Types } from 'mongoose';
import { UserModel } from '../model/user';

export interface UserRepository {
  removeRefreshToken(id: Types.ObjectId): Promise<void>;
  setCurrentRefreshToken(
    refreshToken: string,
    id: Types.ObjectId,
  ): Promise<void>;
  findById(id: Types.ObjectId): Promise<UserModel>;
  getUserIfRefreshTokenMatched(
    refreshToken: string,
    id: Types.ObjectId,
  ): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel>;
  insert(user: UserModel): Promise<UserModel>;
}
