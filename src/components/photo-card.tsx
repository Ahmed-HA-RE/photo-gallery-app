import { FaHeart } from 'react-icons/fa';
import type { Photo } from '../types/photos';
import type { Action } from '../types/toggle-favorite';

type PhotoCardProps = {
  photo: Photo;
  dispatch: React.Dispatch<Action>;
  isFavorite: boolean;
};

const PhotoCard = ({ photo, dispatch, isFavorite }: PhotoCardProps) => {
  return (
    <div
      key={photo.id}
      className='bg-white rounded-lg shadow-md overflow-hidden bg-cover bg-center bg-no-repeat relative aspect-square hover:scale-105 transition-transform duration-300'
      style={{
        backgroundImage: `url(${photo.download_url})`,
      }}
    >
      {/* Favorite Icon */}
      <button
        className='absolute top-2 right-2 rounded-full cursor-pointer p-2 bg-white/80'
        onClick={() =>
          dispatch({ type: 'TOGGLE_FAVORITES', payload: photo.id })
        }
      >
        <FaHeart className={isFavorite ? 'text-red-500' : 'text-black'} />
      </button>

      <div className='absolute inset-x-0 bottom-0 p-4 bg-black/15 backdrop-blur-md'>
        <p className='text-white text-base font-medium'>{photo.author}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
