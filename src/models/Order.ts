import { bookshelf } from '../core/database';
import Customer from './Customer';

export default class Order extends bookshelf.Model<Order> {
  get tableName() {
    return 'orders'
  }

  public customer(): Customer {
    return this.belongsTo(Customer);
  }
}