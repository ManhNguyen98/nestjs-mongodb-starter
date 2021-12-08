import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

const getMongooseOptions = (
  config: EnvironmentConfigService,
): MongooseModuleOptions => ({
  uri: `mongodb://${config.getDatabaseUser()}:${config.getDatabasePassword()}@${config.getDatabaseHost()}:${config.getDatabasePort()}/${config.getDatabaseName()}`,
});

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getMongooseOptions,
    }),
  ],
})
export class MongooseConfigModule {}
