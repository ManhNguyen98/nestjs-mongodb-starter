import { Module } from '@nestjs/common';
// import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ViewsModule } from './infrastructure/views/views.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule,
    ControllersModule,
    ViewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
