import { Injectable, OnModuleInit } from '@nestjs/common';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ViewsService implements OnModuleInit {
  private server: NextServer;

  constructor(private logger: LoggerService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/web',
      });
      await this.server.prepare();
    } catch (error) {
      this.logger.error('', error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
