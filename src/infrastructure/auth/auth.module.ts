import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
// import { DatabaseUserRepository } from '../repositories/user.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { LoggerModule } from '../logger/logger.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    RepositoriesModule,
    EnvironmentConfigModule,
    LoggerModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtRefreshTokenStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
