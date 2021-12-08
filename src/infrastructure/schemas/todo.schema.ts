import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  content: string;

  @Prop()
  is_done: boolean;

  @Prop()
  created_date: Date;

  @Prop()
  updated_date: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
