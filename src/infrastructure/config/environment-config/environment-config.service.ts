import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from '@domain/config/environment-config.interface';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getJwtAccessTokenSecret(): string {
    return this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
  }

  getJwtAccessTokenExpTime(): number {
    return this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
  }

  getJwtRefreshTokenSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshTokenExpTime(): number {
    return this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }
}
