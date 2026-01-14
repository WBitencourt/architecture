import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/orm/generated/prisma/client';

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
// const prisma = new PrismaClient({ adapter });

@Injectable()
export class OrmService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
