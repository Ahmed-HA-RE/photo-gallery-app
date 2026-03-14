import { ClipLoader } from 'react-spinners';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import AlertMessage from './alert-message';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { reducer } from '../reducers/toggle-favorites';
import PhotoCard from './photo-card';

const PhotoGallery = () => {
  const initialFavorites = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  );

  const [search, setSearch] = useState('');
  const { photos, isLoading, error } = useFetchPhotos();
  const [state, dispatch] = useReducer(reducer, {
    favorites: initialFavorites,
  });

  // Save favorite photos to local storage
  useEffect(
    () => localStorage.setItem('favorites', JSON.stringify(state.favorites)),
    [state.favorites],
  );

  // Use memo hook to optimize filtering
  const filterPhotos = useMemo(() => {
    return photos.filter((photo) => {
      return photo.author.toLowerCase().includes(search.toLowerCase());
    });
  }, [photos, search]);

  // Use callback to handle search input changes
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

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
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
        <h1 className='text-4xl md:text-5xl font-bold'>Photo Gallery</h1>

        <div className='w-full lg:w-auto flex flex-col sm:flex-row sm:items-center gap-3'>
          {/* Search filter  */}
          <input
            className='text-sm w-full sm:w-80 bg-white rounded-full placeholder:text-black/70 text-black px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300'
            placeholder='Search photos...'
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <button
            className='bg-red-500 text-white rounded-full px-5 py-2.5 hover:bg-red-600 transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
            onClick={() => dispatch({ type: 'CLEAR_FAVORITES' })}
            disabled={state.favorites.length === 0}
          >
            Clear Favorites
          </button>
        </div>
      </div>

      {filterPhotos.length === 0 ? (
        <AlertMessage
          variant={error ? 'error' : 'warning'}
          text={error ? error : 'No photos found matching your search.'}
        />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {filterPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={state.favorites.includes(photo.id)}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
