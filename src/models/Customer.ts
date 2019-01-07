import { bookshelf } from '../core/database';
import Order from './Order';
import * as Bookshelf from 'bookshelf';
import Transaction from './Transaction';

export default class Customer extends bookshelf.Model<Customer> {
  get tableName() {
    return 'customers'
  }

  public orders(): Bookshelf.Collection<Order> {
    return this.hasMany(Order);
  }

  public transactions(): Bookshelf.Collection<Transaction> {
    return this.hasMany(Transaction);
  }
}