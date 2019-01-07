import { bookshelf } from '../core/database';
import Customer from './Customer';

export default class Transaction extends bookshelf.Model<Transaction> {
  get tableName() {
    return 'transactions'
  }

  public customer(): Customer {
    return this.belongsTo(Customer);
  }
}