import { ProxyHandler } from '@/types/handler.types';

import { LargeFileBucket, s3 } from '../config/config';
import { generateUUID, headers, validImageMimeTypes } from '../helpers/const';
import corsMiddleware from '../middleware/corsMiddleware';
import { handleError, HttpError } from '../middleware/errorHandler';

const getSignedUrl: ProxyHandler = async event => {
  try {
    const reqBody = JSON.parse(event.body as string);

    const { fileType } = reqBody;

    if (!validImageMimeTypes.includes(fileType)) {
      throw new HttpError(400, {
        message: 'Invalid file type. Only images are allowed.',
      });
    }

    const expiresIn = 60 * 5;

    const fileName = `${generateUUID()}.jpg`;

    const url = s3.getSignedUrl('putObject', {
      Bucket: LargeFileBucket,
      Key: fileName,
      Expires: expiresIn,
      ContentType: 'application/json',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url, fileName: fileName }),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = corsMiddleware(getSignedUrl);
