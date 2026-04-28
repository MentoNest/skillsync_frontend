import { DataSource } from 'typeorm';
import { User } from '@/entities/User.entity';
import { AuditLog } from '@/entities/AuditLog.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_DATABASE = process.env.DB_DATABASE || 'skillsync';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, AuditLog],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false, // Never use synchronize in production
  logging: process.env.NODE_ENV === 'development',
});
