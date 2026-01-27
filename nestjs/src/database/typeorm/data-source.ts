import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Examples } from './entities/example';
//import { env } from '@/config/env.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'architecture',
  synchronize: false, //env.NODE_ENV === 'test',
  logging: true,
  entities: [Examples],
  migrations: ['src/database/typeorm/migrations/*.ts'],
  subscribers: [],
});
