import { Module } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { ViewController } from './views.controller';
import { ViewsService } from './views.service';

@Module({
  imports: [],
  providers: [ViewsService, LoggerService],
  controllers: [ViewController],
})
export class ViewsModule {}
