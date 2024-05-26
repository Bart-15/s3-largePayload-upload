import { headers } from '../helpers/const';
export class HttpError extends Error {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public statusCode: number,
    body: Record<string, unknown> = {}
  ) {
    super(JSON.stringify(body));
  }
}

export function handleError(error: unknown) {
  if (error instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `Invalid request body format : "${error.message}"` }),
    };
  }

  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      headers,
      body: error.message,
    };
  }

  throw error;
}
