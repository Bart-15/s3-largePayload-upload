import { generatePresignedURL, headers } from '@/helpers/const';
import { ProxyHandler } from '@/types/handler.types';

import corsMiddleware from '../middleware/corsMiddleware';
import { handleError, HttpError } from '../middleware/errorHandler';

const generateSignedUrl: ProxyHandler = async event => {
  try {
    const reqBody = JSON.parse(event.body as string);

    if (!reqBody?.fileName) {
      throw new HttpError(400, {
        message: 'File name is rquired',
      });
    }

    const presignedUrl = await generatePresignedURL(reqBody.fileName);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        presignedUrl,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = corsMiddleware(generateSignedUrl);
