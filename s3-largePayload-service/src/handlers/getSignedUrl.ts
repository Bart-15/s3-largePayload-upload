import { ProxyHandler } from '@/types/handler.types';
import { generateUUID } from '../helpers/const';
import { LargeFileBucket, s3 } from '../config/config';

const getSignedUrl: ProxyHandler = async event => {
  try {
    const expiresIn = 60 * 5;

    const url = s3.getSignedUrl('putObject', {
      Bucket: LargeFileBucket,
      Key: generateUUID(),
      Expires: expiresIn,
      ContentType: 'application/json',
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error }),
    };
  }
};

export const handler = getSignedUrl;
