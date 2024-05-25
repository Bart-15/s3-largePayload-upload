import { S3Event } from 'aws-lambda';
import { s3 } from '../config/config';

const executePayload = async (event: S3Event) => {
  try {
    const s3Event = event.Records[0].s3;
    const params = {
      Bucket: s3Event.bucket.name,
      Key: s3Event.object.key,
    };

    let data = await s3.getObject(params).promise();
    let result = JSON.parse(data.Body?.toString() as string);

    console.log(result);
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Oooops, something went wrong. Please try again later.' }),
    };
  }
};

export const handler = executePayload;
