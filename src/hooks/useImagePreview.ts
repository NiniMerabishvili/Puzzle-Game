import { useState, useCallback, useEffect, useRef } from 'react';

interface UseImagePreviewReturn {
  isPreviewing: boolean;
  showPreview: () => void;
}

const PREVIEW_DURATION = 1000; 

export const useImagePreview = (): UseImagePreviewReturn => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showPreview = useCallback(() => {
    setIsPreviewing(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsPreviewing(false);
    }, PREVIEW_DURATION);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isPreviewing,
    showPreview,
  };
};

