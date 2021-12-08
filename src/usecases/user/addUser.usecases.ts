import { ILogger } from '@domain/logger/logger.interface';
import { UserModel } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/userRepository.interface';

export class addUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userDto): Promise<UserModel> {
    const user = new UserModel(userDto);
    const result = await this.userRepository.insert(user);
    this.logger.log('addUserUsecases excute', 'User inserted');
    return result;
  }
}
