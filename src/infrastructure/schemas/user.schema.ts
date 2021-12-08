import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  currentHashedRefreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
