import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzleTile } from './PuzzleTile';

interface PuzzleBoardProps {
  pieces: PuzzlePieceType[];
  onDragEnd: (event: DragEndEvent) => void;
}

/**
 * Board component that provides DnD context for puzzle pieces
 * Uses rectSortingStrategy for 3x3 grid layout
 */
export const PuzzleBoard = ({ pieces, onDragEnd }: PuzzleBoardProps) => {
  // Configure sensors for pointer (mouse/touch) interactions
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    })
  );

  // Sort pieces by currentPos to get display order
  const sortedPieces = [...pieces].sort(
    (a, b) => a.currentPos - b.currentPos
  );

  // Extract IDs for SortableContext
  const pieceIds = sortedPieces.map((piece) => piece.id);

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={pieceIds} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto border-2 border-blue-500 p-1 rounded-lg bg-gray-800">
          {sortedPieces.map((piece) => (
            <PuzzleTile key={piece.id} piece={piece} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

