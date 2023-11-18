import { Sequelize } from 'sequelize';


export const engine = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_NAME,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_PORT
});
