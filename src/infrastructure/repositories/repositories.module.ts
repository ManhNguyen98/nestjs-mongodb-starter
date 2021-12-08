import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigModule } from '../config/mongoose/mongoose.module';
import { DatabaseTodoRepository } from './todo.repository';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    MongooseConfigModule,
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [DatabaseTodoRepository, DatabaseUserRepository],
  exports: [DatabaseTodoRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
