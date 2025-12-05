import { useState } from 'react';
import type { PuzzlePiece } from '../types/puzzle';
import { imageSlicer } from '../utils/imageSlicer';

interface UploadResult {
  pieces: PuzzlePiece[];
  originalImageUrl: string;
}

interface UseImageUploadReturn {
  isLoading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<UploadResult>;
  clearError: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<UploadResult> => {
    if (!file.type.startsWith('image/')) {
      const errorMessage = 'Please select a valid image file';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = URL.createObjectURL(file);

      const pieces = await imageSlicer(imageUrl, 3);

      return {
        pieces,
        originalImageUrl: imageUrl,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to process image';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    uploadImage,
    clearError,
  };
};

