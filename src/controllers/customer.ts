import { errorResponse, successResponse } from '../utils';
import Customer from '../models/Customer';
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
  let response;
  let body;
  try {
    body = event.body ? JSON.parse(event.body) : null;
    let existedCustomer;
    try {
      existedCustomer = await new Customer().where('email', body.email).fetch();
    } catch (e) {
      console.log(e);
    }

    if (existedCustomer) {
      response = errorResponse({
        message: 'The customer has already existed'
      });
    } else {
      const data = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        created_at: moment().format('YYYY MM DD HH:mm:ss'),
        updated_at: moment().format('YYYY MM DD HH:mm:ss')
      };
      const newCustomer = await new Customer(data).save(undefined, {method: 'insert'});

      response = successResponse({
        customer: newCustomer,
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
 * @param event
 * @param _context
 * @param callback
 */
export const update: AWSLambda.Handler = async (
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

      try {
        const body = event.body ? JSON.parse(event.body) : null;

        if (!!body.name || !!body.email || !!body.phone) {
          const data = {
            name: !!body.name ? body.name : undefined,
            email: !!body.email ? body.email : undefined,
            phone: !!body.phone ? body.phone : undefined
          };

          await new Customer()
            .where('id', customerId)
            .save(data, {method: 'update', patch: true});

          response = successResponse({
            customer
          });
        } else {
          response = errorResponse({
            message: 'No data for updating'
          });
        }
      } catch (e) {
        response = errorResponse({
          error: e
        });
      }
    } catch (e) {
      response = errorResponse({
        message: 'The customer does not exist'
      });
    }
  }

  callback(null, response);
};

/**
 * Delete the specified resource in database.
 *
 * @param event
 * @param _context
 * @param callback
 */
export const deleteResource: AWSLambda.Handler = async (
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
    const customerId = event.pathParameters.id;
    try {
      await new Customer().where('id', customerId).destroy();

      response = successResponse({
        message: 'Deleted successfully'
      });
    } catch (e) {
      response = errorResponse({
        message: 'The customer does not exist'
      });
    }
  }

  callback(null, response);
};