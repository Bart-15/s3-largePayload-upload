import { S3Event } from 'aws-lambda';

import { s3 } from '../config/config';
import corsMiddleware from '../middleware/corsMiddleware';
import { handleError } from '../middleware/errorHandler';

const executePayload = async (event: S3Event) => {
  try {
    const s3Event = event.Records[0].s3;
    const params = {
      Bucket: s3Event.bucket.name,
      Key: s3Event.object.key,
    };

    const data = await s3.getObject(params).promise();
    const result = JSON.parse(data.Body?.toString() as string);

    console.log(result);
  } catch (error) {
    return handleError(error);
  }
};

export const handler = corsMiddleware(executePayload);
