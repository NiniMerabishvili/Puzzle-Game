import { useEffect, useState } from 'react';
import { usePuzzleGame } from '../../../hooks/usePuzzleGame';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { useImagePreview } from '../../../hooks/useImagePreview';
import { ImageUploader } from './ImageUploader';
import { PuzzleHeader } from './PuzzleHeader';
import { PuzzleGrid } from './PuzzleGrid';
import { WinMessage } from './WinMessage';
import { ErrorMessage } from '../../common/ErrorMessage';

export const PuzzleGame = () => {
  const { pieces, isComplete, isSolved, setPieces, shuffle, resetGame, handleDragEnd } =
    usePuzzleGame();
  const { isLoading, error, uploadImage, clearError } = useImageUpload();
  const { isPreviewing, showPreview } = useImagePreview();
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    try {
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }

      const { pieces: newPieces, originalImageUrl: imageUrl } =
        await uploadImage(file);
      setPieces(newPieces);
      setOriginalImageUrl(imageUrl);
    } catch (err) {
      setPieces([]);
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
      setOriginalImageUrl('');
    }
  };

  useEffect(() => {
    if (pieces.length > 0 && error) {
      clearError();
    }
  }, [pieces.length, error]);

  useEffect(() => {
    return () => {
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
    };
  }, [originalImageUrl]);

  return (
    <>
      <ImageUploader onFileSelect={handleFileSelect} isLoading={isLoading} />

      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      {pieces.length > 0 && (
        <>
          <PuzzleHeader
            pieceCount={pieces.length}
            onShuffle={shuffle}
            onPreview={showPreview}
            isComplete={isComplete}
          />
          <PuzzleGrid
            pieces={pieces}
            onDragEnd={handleDragEnd}
            previewImageUrl={originalImageUrl}
            isPreviewing={isPreviewing}
          />
        </>
      )}

      {isSolved && <WinMessage onReset={resetGame} />}
    </>
  );
};

