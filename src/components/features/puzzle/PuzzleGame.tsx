import { useEffect } from 'react';
import { usePuzzleGame } from '../../../hooks/usePuzzleGame';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { ImageUploader } from './ImageUploader';
import { PuzzleHeader } from './PuzzleHeader';
import { PuzzleGrid } from './PuzzleGrid';
import { ErrorMessage } from '../../common/ErrorMessage';

/**
 * Container component that orchestrates puzzle game logic
 * Uses hooks for state management and business logic
 */
export const PuzzleGame = () => {
  const { pieces, isComplete, setPieces, shuffle, handleDragEnd } =
    usePuzzleGame();
  const { isLoading, error, uploadImage, clearError } = useImageUpload();

  const handleFileSelect = async (file: File) => {
    try {
      const newPieces = await uploadImage(file);
      setPieces(newPieces);
    } catch (err) {
      // Error is handled by the hook
      setPieces([]);
    }
  };

  // Clear error when pieces are successfully loaded
  useEffect(() => {
    if (pieces.length > 0 && error) {
      clearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieces.length, error]);

  return (
    <>
      <ImageUploader onFileSelect={handleFileSelect} isLoading={isLoading} />

      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      {pieces.length > 0 && (
        <>
          <PuzzleHeader
            pieceCount={pieces.length}
            onShuffle={shuffle}
            isComplete={isComplete}
          />
          <PuzzleGrid pieces={pieces} onDragEnd={handleDragEnd} />
        </>
      )}
    </>
  );
};

