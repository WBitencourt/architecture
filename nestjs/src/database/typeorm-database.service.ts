import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppDataSource } from './typeorm/data-source';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public dataSource: DataSource;
  constructor() {}

  async onModuleInit() {
    try {
      this.dataSource = await AppDataSource.initialize();
      console.log('Database connected');
    } catch (error) {
      console.log('Error connecting to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await AppDataSource.destroy();
    console.log('Database disconnected');
  }
}
