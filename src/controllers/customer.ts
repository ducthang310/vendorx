import { errorResponse, successResponse } from '../utils';
import Customer from '../models/Customer';

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
  const customers = await Customer.fetchAll();
  const response = successResponse({
    customers
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
    // Load customer
    let customer;
    const customerId = event.pathParameters.id;
    try {
      customer = await new Customer().where('id', customerId).fetch();
      response = successResponse({
        customer
      });
    } catch (e) {
      response = errorResponse({
        message: 'The customer does not exist'
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
  const response = successResponse({
    customer: {},
    input: event,
  });

  callback(null, response);
};

/**
 * Update the specified resource in database.
 *
 * @param event
 * @param _context
 * @param callback
 */
export const update: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const response = successResponse({
    customer: {},
    input: event,
  });

  callback(null, response);
};

/**
 * Delete the specified resource in database.
 *
 * @param event
 * @param _context
 * @param callback
 */
export const deleteResource: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const response = successResponse({
    customer: {},
    input: event,
  });

  callback(null, response);
};