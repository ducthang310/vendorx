import { successResponse } from '../utils';

/**
 * Get listing of the resource
 *
 * @param event
 * @param _context
 * @param callback
 */
export const index: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const response = successResponse({
    orders: [],
    input: event
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
export const load: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const response = successResponse({
    order: {},
    input: event
  });

  callback(null, response);
};

/**
 * Store a newly created resource in database
 *
 * @param event
 * @param _context
 * @param callback
 */
export const store: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const response = successResponse({
    order: {},
    input: event
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
    order: {},
    input: event
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
    order: {},
    input: event
  });

  callback(null, response);
};