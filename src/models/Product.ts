import { bookshelf } from '../core/database';
import * as Bookshelf from 'bookshelf';
import Order from './Order';

export default class Product extends bookshelf.Model<Product> {
  get tableName() {
    return 'products'
  }

  public orders(): Bookshelf.Collection<Order> {
    return this.belongsToMany(Order);
  }

}