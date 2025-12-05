import type { DragEndEvent } from '@dnd-kit/core';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzleBoard } from './PuzzleBoard';
import { ImagePreview } from './ImagePreview';

interface PuzzleGridProps {
  pieces: PuzzlePieceType[];
  onDragEnd: (event: DragEndEvent) => void;
  previewImageUrl?: string;
  isPreviewing?: boolean;
}

export const PuzzleGrid = ({
  pieces,
  onDragEnd,
  previewImageUrl,
  isPreviewing = false,
}: PuzzleGridProps) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <PuzzleBoard pieces={pieces} onDragEnd={onDragEnd} />
      {previewImageUrl && (
        <ImagePreview imageUrl={previewImageUrl} isVisible={isPreviewing} />
      )}
    </div>
  );
};

