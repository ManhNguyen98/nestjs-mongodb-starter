import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// 'bcrypt' was installed in Docker, so don't need add
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { IAuth } from '@domain/auth/auth.interface';
import {
  RegistrationM,
  RefreshToken,
  TokenPayload,
} from '@domain/model/auth';
import { UserModel } from '@domain/model/user';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { LoggerService } from '../logger/logger.service';
import { DatabaseUserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    private readonly config: EnvironmentConfigService,
    private readonly userRepository: DatabaseUserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async register(registrationData: RegistrationM): Promise<UserModel> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userRepository.insert({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserModel> {
    try {
      const user = await this.userRepository.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      this.logger.error('', 'Wrong credentials provided');
    }
  }
  getCookieForLogout(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
  getCookieWithJwtAccessToken(id: Types.ObjectId): string {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.config.getJwtAccessTokenSecret(),
      expiresIn: `${this.config.getJwtAccessTokenExpTime()}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.config.getJwtAccessTokenExpTime()}`;
  }
  getCookieWithJwtRefreshToken(id: Types.ObjectId): RefreshToken {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.config.getJwtRefreshTokenSecret(),
      expiresIn: `${this.config.getJwtRefreshTokenExpTime()}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.config.getJwtRefreshTokenExpTime()}`;
    return {
      cookie,
      token,
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      this.logger.error('', 'Wrong credentials provided.');
    }
  }
}
