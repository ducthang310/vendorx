import { bookshelf } from '../core/database';

export default class User extends bookshelf.Model<User> {
  get tableName() {
    return 'users'
  }
}