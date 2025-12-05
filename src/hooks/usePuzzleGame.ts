import { useState, useCallback } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import type { PuzzlePiece } from '../types/puzzle';
import { shufflePieces } from '../utils/shuffle';

interface UsePuzzleGameReturn {
  pieces: PuzzlePiece[];
  isComplete: boolean;
  setPieces: (pieces: PuzzlePiece[]) => void;
  shuffle: () => void;
  reset: () => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

/**
 * Custom hook for managing puzzle game state and logic
 * @param initialPieces - Initial puzzle pieces array
 * @returns Object containing game state and handlers
 */
export const usePuzzleGame = (
  initialPieces: PuzzlePiece[] = []
): UsePuzzleGameReturn => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>(initialPieces);

  const shuffle = useCallback(() => {
    if (pieces.length > 0) {
      const shuffled = shufflePieces(pieces);
      setPieces(shuffled);
    }
  }, [pieces]);

  const reset = useCallback(() => {
    setPieces(initialPieces);
  }, [initialPieces]);

  /**
   * Handles drag end event and updates piece positions
   * Swaps the currentPos values of the dragged piece and the target piece
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      // Find the two pieces being swapped
      const activePiece = pieces.find((piece) => piece.id === active.id);
      const overPiece = pieces.find((piece) => piece.id === over.id);

      if (!activePiece || !overPiece) {
        return;
      }

      // Swap the currentPos values
      const updatedPieces = pieces.map((piece) => {
        if (piece.id === activePiece.id) {
          return { ...piece, currentPos: overPiece.currentPos };
        }
        if (piece.id === overPiece.id) {
          return { ...piece, currentPos: activePiece.currentPos };
        }
        return piece;
      });

      setPieces(updatedPieces);
    },
    [pieces]
  );

  // Check if puzzle is complete (all pieces in correct positions)
  const isComplete = pieces.every(
    (piece) => piece.currentPos === piece.correctPos
  );

  return {
    pieces,
    isComplete,
    setPieces,
    shuffle,
    reset,
    handleDragEnd,
  };
};

