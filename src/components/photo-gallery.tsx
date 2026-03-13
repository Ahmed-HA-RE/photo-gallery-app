import { FaHeart } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { type Photo } from '../types/photos';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[] | []>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch('https://picsum.photos/v2/list?limit=30');
      const data = await res.json();
      setPhotos(data);
    };

    fetchPhotos();
  }, []);

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {photos.map((photo) => (
        <div
          key={photo.id}
          className='bg-white rounded-lg shadow-md overflow-hidden bg-cover bg-center bg-no-repeat relative aspect-square hover:scale-105 transition-transform duration-300'
          style={{
            backgroundImage: `url(${photo.download_url})`,
          }}
        >
          {/* Favorite Icon */}
          <div className='absolute top-2 right-2 rounded-full cursor-pointer p-2 bg-white/80'>
            <FaHeart />
          </div>

          <div className='absolute inset-x-0 bottom-0 p-4 bg-black/15 backdrop-blur-md'>
            <p className='text-white text-base font-medium'>{photo.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
