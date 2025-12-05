import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';
import { PuzzleCell } from './PuzzleCell';
import { PuzzlePiece } from './PuzzlePiece';

interface PuzzleBoardProps {
  pieces: PuzzlePieceType[];
  onDragEnd: (event: DragEndEvent) => void;
}

export const PuzzleBoard = ({ pieces, onDragEnd }: PuzzleBoardProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const sortedPieces = [...pieces].sort(
    (a, b) => a.currentPos - b.currentPos
  );

  const gridPositions = Array.from({ length: 9 }, (_, index) => {
    const piece = sortedPieces.find((p) => p.currentPos === index) || null;
    return { position: index, piece };
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    onDragEnd(event);
  };

  const activePiece = activeId
    ? pieces.find((p) => p.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto border-4 border-white p-1 bg-black">
        {gridPositions.map(({ position, piece }) => (
          <PuzzleCell key={position} position={position} piece={piece} />
        ))}
      </div>

      <DragOverlay>
        {activePiece ? (
          <div className="shadow-2xl scale-110 ring-4 ring-white">
            <PuzzlePiece piece={activePiece} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

