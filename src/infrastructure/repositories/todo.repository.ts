import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoM } from '../../domain/model/todo';
import { TodoRepository } from '../../domain/repositories/todoRepository.interface';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoEntityRepository: Model<TodoDocument>,
  ) {}

  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.todoEntityRepository.update(
      {
        id: id,
      },
      { is_done: isDone },
    );
  }
  async insert(todo: TodoM): Promise<TodoM> {
    const todoEntity = this.toTodoEntity(todo);
    const result = await new this.todoEntityRepository({
      ...todoEntity,
    }).save();
    return this.toTodo(result);
  }
  async findAll(): Promise<TodoM[]> {
    const todosEntity = await this.todoEntityRepository.find().exec();
    return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
  }
  async findById(id: number): Promise<TodoM> {
    const todoEntity = await this.todoEntityRepository.findById(id).exec();
    return this.toTodo(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.todoEntityRepository.findByIdAndDelete({ id: id });
  }

  private toTodo(todoEntity: Todo): TodoM {
    const todo: TodoM = new TodoM();

    todo.content = todoEntity.content;
    todo.isDone = todoEntity.is_done;
    todo.createdDate = todoEntity.created_date;
    todo.updatedDate = todoEntity.updated_date;

    return todo;
  }

  private toTodoEntity(todo: TodoM): Todo {
    const todoEntity: Todo = new Todo();
    todoEntity.content = todo.content;
    todoEntity.is_done = todo.isDone;

    return todoEntity;
  }
}
