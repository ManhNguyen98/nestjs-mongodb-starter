import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { UserModel } from './user';

export class RegistrationM {
  _id: Types.ObjectId;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  name: string;
}

export class RefreshToken {
  cookie: string;
  token: string;
}

export class TokenPayload {
  id: Types.ObjectId;
}

export class RequestWithUser extends Request {
  @ApiProperty()
  user: UserModel;
  [key: string]: any;
}
