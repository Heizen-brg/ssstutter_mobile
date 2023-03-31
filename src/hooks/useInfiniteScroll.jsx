import { useState, useRef, useCallback, useEffect } from 'react';

const useInfiniteScroll = () => {
  const [skip, setSkip] = useState(0);
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setSkip((prev) => prev+10);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '50px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
  }, [handleObserver]);

  return { loadMoreRef, skip, setSkip };
}

export default useInfiniteScroll