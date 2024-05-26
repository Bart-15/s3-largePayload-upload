import Image from 'next/image';

interface ImageContainerProps {
  photo: string;
}

const ImageContainer = ({photo}: ImageContainerProps) => {
  return (
    <figure className='max-w-lg'>
      <Image
        className='h-auto max-w-full rounded-lg'
        src={photo}
        width={250}
        height={250}
        alt='image description'
      />
    </figure>
  );
};

export default ImageContainer;
