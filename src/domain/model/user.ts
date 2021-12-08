import { Types } from 'mongoose';

export class UserModel {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  currentHashedRefreshToken?: string;
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.password = user.password;
    this.currentHashedRefreshToken = user.currentHashedRefreshToken;
  }
}
