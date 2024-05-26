'use client';
import {ACCEPTED_IMAGE_TYPES} from '@/helpers/const';
import {FormEvent, useState, useRef} from 'react';
import {getSignedUrl, generateSignedUrl, uploadToS3} from '@/api/s3Upload.api';
import ImageContainer from '@/components/ImageContainer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setThumbnail('');

    if (!file) {
      return alert('File is required');
    }

    const fileType = file.type;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return alert('Invalid file type. Only images are allowed.');
    }

    setLoading(true);
    const data = await getSignedUrl(fileType);
    await uploadToS3(data.url, file, fileType);
    const result = await generateSignedUrl(data?.fileName);

    alert('File successfully uploaded to s3');
    setThumbnail(result?.presignedUrl);
    setFile(null);
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input value to empty string
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-24 gap-2'>
      <form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type='file'
          onChange={(event) => setFile(event.target.files![0])}
        />
        <button
          className='text-white bg-slate-900 rounded-md px-3 py-2 text-sm'
          type='submit'
        >
          Submit
        </button>
      </form>

      {thumbnail && <ImageContainer photo={thumbnail} />}
      {loading && <LoadingSpinner />}
    </main>
  );
}
