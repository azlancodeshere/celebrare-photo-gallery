import { useState, useEffect } from 'react';

const useFetchPhotos = (limit = 30) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?limit=${limit}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Failed to load photos (HTTP ${response.status}: ${response.statusText})`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();

    return () => {
      controller.abort();
    };
  }, [limit]);

  return { photos, loading, error };
};

export default useFetchPhotos;
