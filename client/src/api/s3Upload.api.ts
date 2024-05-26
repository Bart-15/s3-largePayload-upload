import {axiosPublic} from '@/lib/axios';

export async function getSignedUrl(fileType: string) {
  const payload = {
    fileType,
  };

  const {data} = await axiosPublic.post('/getSignedUrl', payload);
  return data;
}

export async function generateSignedUrl(fileName: string) {
  const payload = {
    fileName,
  };
  const {data} = await axiosPublic.post('/generateSignedUrl', payload);
  return data;
}

export async function uploadToS3(url: string, data: any, fileType?: string) {
  try {
    const response = await axiosPublic.put(url, data, {
      headers: {
        'Content-Type': fileType,
      },
    });

    console.log('File successfully uploaded to s3');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
