import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Example } from './entity/example';
//import { env } from '@/config/env.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false, //env.NODE_ENV === 'test',
  logging: true,
  entities: [Example],
  migrations: [],
  subscribers: [],
});
