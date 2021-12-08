import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// 'bcrypt' was installed in Docker, so don't need add
import * as bcrypt from 'bcrypt';
import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userEntityRepository: Model<UserDocument>,
  ) {}

  async removeRefreshToken(id: Types.ObjectId): Promise<void> {
    this.userEntityRepository.updateOne(
      { _id: id },
      {
        currentHashedRefreshToken: null,
      },
    );
  }
  async setCurrentRefreshToken(
    refreshToken: string,
    id: Types.ObjectId,
  ): Promise<void> {
    try {
      const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await this.userEntityRepository.updateOne(
        { _id: id },
        {
          currentHashedRefreshToken,
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: Types.ObjectId): Promise<UserModel> {
    const newObjectId = new Types.ObjectId(id);
    const userEntity = await this.userEntityRepository
      .findOne({ _id: newObjectId })
      .exec();
    return this.toUser(userEntity);
  }
  async getUserIfRefreshTokenMatched(
    refreshToken: string,
    id: Types.ObjectId,
  ): Promise<UserModel> {
    const user = await this.findById(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.userEntityRepository.findOne({ email });
    return this.toUser(user);
  }
  async insert(user: UserModel): Promise<UserModel> {
    const userEntity = this.toUserEntity(user);
    const result = await new this.userEntityRepository({
      ...userEntity,
    }).save();
    return this.toUser(result);
  }

  private toUser(userEntity: User): UserModel {
    const user: UserModel = new UserModel(userEntity);
    return user;
  }

  private toUserEntity(user: UserModel): User {
    const userEntity: User = new User();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.currentHashedRefreshToken = user.currentHashedRefreshToken;
    userEntity.password = user.password;

    return userEntity;
  }
}
