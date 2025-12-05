import { useState } from 'react';
import type { PuzzlePiece } from '../types/puzzle';
import { imageSlicer } from '../utils/imageSlicer';

interface UseImageUploadReturn {
  isLoading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<PuzzlePiece[]>;
  clearError: () => void;
}

/**
 * Custom hook for handling image upload and slicing logic
 * @returns Object containing upload state and handlers
 */
export const useImageUpload = (): UseImageUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<PuzzlePiece[]> => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      const errorMessage = 'Please select a valid image file';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create object URL from the file
      const imageUrl = URL.createObjectURL(file);

      // Slice the image into puzzle pieces
      const pieces = await imageSlicer(imageUrl, 3);

      // Clean up object URL
      URL.revokeObjectURL(imageUrl);

      return pieces;
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

