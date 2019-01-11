import Knex from 'knex';
import Bookshelf from 'bookshelf';
require('pg'); // Do not remove this line, if you do so webpack will ignore this dependency
const connectionString: string = process.env.DB_CONNECTION_STRING || '';
const config: Knex.Config = {
  acquireConnectionTimeout: 5000,
  client: 'pg',
  connection: connectionString,
  debug: (process.env as any).IS_OFFLINE || false,
  pool: {
    max: 1,
    min: 0,
  },
  migrations: {
    tableName: 'migrations'
  }
};

export const knex = Knex(config);
export const bookshelf = Bookshelf(knex);
