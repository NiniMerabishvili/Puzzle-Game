import { useDroppable } from '@dnd-kit/core';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzleTile } from './PuzzleTile';

interface PuzzleCellProps {
  position: number;
  piece: PuzzlePieceType | null;
}

export const PuzzleCell = ({ position, piece }: PuzzleCellProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${position}`,
    data: {
      position,
      pieceId: piece?.id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`aspect-square relative ${
        isOver ? 'ring-4 ring-white ring-offset-2' : ''
      }`}
    >
      {piece ? (
        <PuzzleTile piece={piece} />
      ) : (
        <div className="w-full h-full border-2 border-dashed border-white bg-black" />
      )}
    </div>
  );
};

