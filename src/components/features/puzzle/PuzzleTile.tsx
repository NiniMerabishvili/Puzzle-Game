import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzlePiece } from './PuzzlePiece';

interface PuzzleTileProps {
  piece: PuzzlePieceType;
}

/**
 * Sortable tile component that wraps PuzzlePiece with drag-and-drop functionality
 * Handles all CSS transforms and event listeners for dragging
 */
export const PuzzleTile = ({ piece }: PuzzleTileProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: piece.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'shadow-2xl scale-105 opacity-90 ring-2 ring-blue-400'
          : ''
      }`}
    >
      <PuzzlePiece piece={piece} />
    </div>
  );
};

