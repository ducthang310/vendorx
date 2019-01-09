import { errorResponse, successResponse } from '../utils';
import Product from '../models/Product';
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
  const products = await Product.fetchAll();
  const response = successResponse({
    products
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
    // Load product
    let product;
    const productId = event.pathParameters.id;
    try {
      product = await new Product().where('id', productId).fetch();
      response = successResponse({
        product
      });
    } catch (e) {
      response = errorResponse({
        message: 'The product does not exist'
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
    let existedProduct;
    try {
      existedProduct = await new Product().where('sku', body.sku).fetch();
    } catch (e) {
      console.log(e);
    }

    if (existedProduct) {
      response = errorResponse({
        message: 'The product has already existed'
      });
    } else {
      const data = {
        name: body.name,
        sku: body.sku,
        price: body.price,
        created_at: moment().format('YYYY MM DD HH:mm:ss'),
        updated_at: moment().format('YYYY MM DD HH:mm:ss')
      };
      const newProduct = await new Product(data).save(undefined, {method: 'insert'});

      response = successResponse({
        product: newProduct,
      });
    }
  } catch (e) {
    console.log(e);
    response = errorResponse({
      error: 'Parameters is invalid'
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
    // Load product
    let product;
    const productId = event.pathParameters.id;
    try {
      product = await new Product().where('id', productId).fetch();

      try {
        const body = event.body ? JSON.parse(event.body) : null;

        if (!!body.name || !!body.sku || !!body.price) {
          const data = {
            name: !!body.name ? body.name : undefined,
            sku: !!body.sku ? body.sku : undefined,
            price: !!body.price ? body.price : undefined
          };

          await new Product()
            .where('id', productId)
            .save(data, {method: 'update', patch: true});

          response = successResponse({
            product
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
        message: 'The product does not exist'
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
    const productId = event.pathParameters.id;
    try {
      await new Product().where('id', productId).destroy();

      response = successResponse({
        message: 'Deleted successfully'
      });
    } catch (e) {
      response = errorResponse({
        message: 'The product does not exist'
      });
    }
  }

  callback(null, response);
};