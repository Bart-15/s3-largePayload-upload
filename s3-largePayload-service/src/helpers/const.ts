import { v4 as uuidv4 } from 'uuid';

import { LargeFileBucket, s3 } from '../config/config';

export const generateUUID = () => uuidv4();

export const generatePresignedURL = async (key: string) => {
  const expirationTime = 24 * 3600; // 1 day

  const params = {
    Bucket: LargeFileBucket,
    Key: key, //filename
    Expires: expirationTime,
  };

  return await s3.getSignedUrlPromise('getObject', params);
};

export const validImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const headers = {
  'content-type': 'application/json',
};
