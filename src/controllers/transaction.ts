import { errorResponse, successResponse } from '../utils';
import Transaction from '../models/Transaction';
import moment from 'moment';

/**
 * Get listing of the resource
 *
 * @param _event
 * @param _context
 * @param _callback
 */
export const index: AWSLambda.Handler = async (
  _event: AWSLambda.APIGatewayEvent,
  _context,
  _callback,
) => {
  const transactions = await Transaction.fetchAll();
  const response = successResponse({
    transactions
  });

  return response;
};

/**
 * Get the specified resource in database.
 *
 * @param event
 * @param _context
 * @param _callback
 */
export const load: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  _callback,
) => {
  let response;
  // Validate request
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    response = errorResponse({
      message: 'The id field is required'
    }, 400);
  } else {
    // Load transaction
    let transaction;
    const transactionId = event.pathParameters.id;
    try {
      transaction = await new Transaction().where('id', transactionId).fetch();
      response = successResponse({
        transaction
      });
    } catch (e) {
      response = errorResponse({
        message: 'The transaction does not exist'
      }, 404);
    }
  }

  return response;
};

/**
 * Store a newly created resource in database
 *
 * @param event
 * @param _context
 * @param _callback
 */
export const store: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  _callback,
) => {
  let response;
  let body;
  try {
    body = event.body ? JSON.parse(event.body) : null;

    if (!body.type || !body.source) {
      response = errorResponse({
        message: 'Parameters must contain: type, source'
      }, 400);
    } else {
      const data = {
        customer_id: body.customer_id,
        created_by: body.created_by,
        type: body.type,
        source: body.source,
        created_at: moment().format('YYYY MM DD HH:mm:ss'),
        updated_at: moment().format('YYYY MM DD HH:mm:ss')
      };
      const newTransaction = await new Transaction(data).save(undefined, {method: 'insert'});

      response = successResponse({
        transaction: newTransaction,
      });
    }
  } catch (e) {
    console.log(e)
    response = errorResponse({
      message: 'Parameters is invalid'
    }, 400);
  }

  return response;
};

/**
 * Update the specified resource in database.
 *
 * @param event
 * @param _context
 * @param _callback
 */
export const update: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  _callback,
) => {
  let response;
  // Validate request
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    response = errorResponse({
      message: 'The id field is required'
    }, 400);
  } else {
    // Load transaction
    let transaction;
    const transactionId = event.pathParameters.id;
    try {
      transaction = await new Transaction().where('id', transactionId).fetch();

      try {
        const body = event.body ? JSON.parse(event.body) : null;

        if (!!body.customer_id || !!body.created_by || !!body.type || !!body.source) {
          const data = {
            customer_id: !!body.customer_id ? body.customer_id : undefined,
            created_by: !!body.created_by ? body.created_by : undefined,
            type: !!body.type ? body.type : undefined,
            source: !!body.source ? body.source : undefined
          };

          await new Transaction()
            .where('id', transactionId)
            .save(data, {method: 'update', patch: true});

          response = successResponse({
            transaction
          });
        } else {
          response = errorResponse({
            message: 'No data for updating'
          }, 400);
        }
      } catch (e) {
        response = errorResponse({
          error: e
        }, 500);
      }
    } catch (e) {
      response = errorResponse({
        message: 'The transaction does not exist'
      }, 404);
    }
  }

  return response;
};

/**
 * Delete the specified resource in database.
 *
 * @param event
 * @param _context
 * @param _callback
 */
export const deleteResource: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  _callback,
) => {
  let response;
  // Validate request
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    response = errorResponse({
      message: 'The id field is required'
    }, 400);
  } else {
    const transactionId = event.pathParameters.id;
    try {
      await new Transaction().where('id', transactionId).destroy();

      response = successResponse({
        message: 'Deleted successfully'
      });
    } catch (e) {
      response = errorResponse({
        message: 'The transaction does not exist'
      }, 404);
    }
  }

  return response;
};