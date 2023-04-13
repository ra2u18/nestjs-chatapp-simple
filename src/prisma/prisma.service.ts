import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  exclude<T, Key extends keyof T>(t: T, keys: Key[]): Omit<T, Key> {
    for (const key of keys) {
      delete t[key];
    }
    return t;
  }
}
