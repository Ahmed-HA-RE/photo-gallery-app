import { FaHeart } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

import { useState } from 'react';
import AlertMessage from './alert-message';
import useFetchPhotos from '../hooks/useFetchPhotos';

const PhotoGallery = () => {
  const [search, setSearch] = useState('');
  const { photos, isLoading, error } = useFetchPhotos();

  const filterPhotos = photos.filter((photo) => {
    return photo.author.toLowerCase().includes(search.toLowerCase());
  });

  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <ClipLoader size={45} />
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
        <h1 className='text-4xl md:text-5xl font-bold'>Photo Gallery</h1>
        {/* Search filter  */}
        <input
          className='text-sm w-full max-w-md bg-white rounded-full placeholder:text-black/70 text-black px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300'
          placeholder='Search photos...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filterPhotos.length === 0 ? (
        <AlertMessage
          variant={error ? 'error' : 'warning'}
          text={error ? error : 'No photos found matching your search.'}
        />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {filterPhotos.map((photo) => (
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
                <p className='text-white text-base font-medium'>
                  {photo.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
