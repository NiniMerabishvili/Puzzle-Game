import type { DragEndEvent } from '@dnd-kit/core';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzleBoard } from './PuzzleBoard';

interface PuzzleGridProps {
  pieces: PuzzlePieceType[];
  onDragEnd: (event: DragEndEvent) => void;
}

/**
 * Container component for displaying puzzle pieces in a draggable grid
 */
export const PuzzleGrid = ({ pieces, onDragEnd }: PuzzleGridProps) => {
  return <PuzzleBoard pieces={pieces} onDragEnd={onDragEnd} />;
};

