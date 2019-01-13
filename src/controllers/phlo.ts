import { errorResponse, successResponse } from '../utils';
import moment from 'moment';
import Transaction from '../models/Transaction';

export const handle: AWSLambda.Handler = async (
  event: AWSLambda.APIGatewayEvent,
  _context,
  _callback,
) => {
  let response;
  let body;
  try {
    body = event.body ? JSON.parse(event.body) : null;

    if (!body.from || !body.to || !body.order_type) {
      response = errorResponse({
        message: 'Parameters must contain: type, source'
      }, 400);
    } else {
      const data = {
        customer_id: null,
        created_by: 'plivo',
        type: body.order_type,
        source: body.recording_url,
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
