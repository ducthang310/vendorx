import { errorResponse, successResponse } from '../utils';
import Order from '../models/Order';
import moment from 'moment';

/**
 * Get listing of the resource
 *
 * @param _event
 * @param _context
 * @param callback
 */
export const index: AWSLambda.Handler = async (
  _event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const orders = await Order.fetchAll();
  const response = successResponse({
    orders
  });

  callback(null, response);
};

/**
 * Get the specified resource in database.
 *
 * @param event
 * @param _context
 * @param callback
 */
export const load: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  let response;
  // Validate request
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    response = errorResponse({
      message: 'The id field is required'
    });
  } else {
    // Load order
    let order;
    const orderId = event.pathParameters.id;
    try {
      order = await new Order().where('id', orderId).fetch();
      response = successResponse({
        order
      });
    } catch (e) {
      response = errorResponse({
        message: 'The order does not exist'
      });
    }
  }

  callback(null, response);
};

/**
 * Store a newly created resource in database
 *
 * @param event
 * @param _context
 * @param callback
 */
export const store: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  let response;
  let body;
  try {
    body = event.body ? JSON.parse(event.body) : null;

    if (!body.customer_id || !body.product_id || body.price === undefined) {
      response = errorResponse({
        message: 'Parameters must contain: customer_id, product_id, price'
      });
    } else {
      const data = {
        customer_id: body.customer_id,
        product_id: body.product_id,
        price: body.price,
        created_at: moment().format('YYYY MM DD HH:mm:ss'),
        updated_at: moment().format('YYYY MM DD HH:mm:ss')
      };
      const newOrder = await new Order(data).save(undefined, {method: 'insert'});

      response = successResponse({
        order: newOrder,
      });
    }
  } catch (e) {
    response = errorResponse({
      message: 'Parameters is invalid'
    });
  }

  callback(null, response);
};

/**
 * Update the specified resource in database.
 *
 * @param _event
 * @param _context
 * @param callback
 */
export const update: AWSLambda.Handler = async (
  _event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  callback(null, errorResponse({
    message: 'Can not update order. This feature will be improved. (update order status)'
  }));
};

/**
 * Delete the specified resource in database.
 *
 * @param _event
 * @param _context
 * @param callback
 */
export const deleteResource: AWSLambda.Handler = async (
  _event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  callback(null, errorResponse({
    message: 'Can not delete order. You only can change its status.'
  }));
};