import { useEffect } from 'react';
import { useState } from 'react';
import { type Photo } from '../types/photos';

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://picsum.photos/v2/list?limit=30');
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return {
    photos,
    isLoading,
    error,
  };
};

export default useFetchPhotos;
