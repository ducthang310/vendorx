import Knex from 'knex';
import Bookshelf from 'bookshelf';

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
};

export const knex = Knex(config);
export const bookshelf = Bookshelf(knex);
