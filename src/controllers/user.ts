import { successResponse } from '../utils';

/**
 * Listens to events from SES's s3 box, parses emails, and puts them into the system.
 *
 * @param event
 * @param _context
 * @param callback
 */
export const handle: AWSLambda.Handler = (
  event: AWSLambda.APIGatewayEvent,
  _context,
  callback,
) => {
  const response = successResponse({
    message: 'Parse successfully',
    input: event
  });

  callback(null, response);
};
