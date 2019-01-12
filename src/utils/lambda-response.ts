interface IJSON {
  [key: string]: any;
}

interface IResponseOptions {
  json: IJSON;
  statusCode: number;
  allowCORS?: boolean;
}

interface IResponse {
  statusCode: number;
  body: string;
  headers?: {
    [key: string]: any;
  };
}

function lambdaResponse({
  json,
  statusCode
}: IResponseOptions) {
  const response: IResponse = {
    statusCode,
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  return response;
}

export function errorResponse(json: IJSON, statusCode?: number) {
  return lambdaResponse({
    json,
    statusCode: statusCode ? statusCode : 500,
  });
}

export function successResponse(json: IJSON) {
  return lambdaResponse({
    json,
    statusCode: 200,
  });
}
