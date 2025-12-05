import { useDraggable } from '@dnd-kit/core';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzlePiece } from './PuzzlePiece';

interface PuzzleTileProps {
  piece: PuzzlePieceType;
}

export const PuzzleTile = ({ piece }: PuzzleTileProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: piece.id,
    data: {
      piece,
      currentPos: piece.currentPos,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-30' : 'opacity-100'
      } transition-opacity`}
    >
      <PuzzlePiece piece={piece} />
    </div>
  );
};

