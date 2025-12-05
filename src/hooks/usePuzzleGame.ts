import { useState, useCallback } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import type { PuzzlePiece } from '../types/puzzle';
import { shufflePieces } from '../utils/shuffle';

interface UsePuzzleGameReturn {
  pieces: PuzzlePiece[];
  isComplete: boolean;
  isSolved: boolean;
  setPieces: (pieces: PuzzlePiece[]) => void;
  shuffle: () => void;
  reset: () => void;
  resetGame: () => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export const usePuzzleGame = (
  initialPieces: PuzzlePiece[] = []
): UsePuzzleGameReturn => {
  const [pieces, setPiecesState] = useState<PuzzlePiece[]>(initialPieces);
  const [hasBeenPlayed, setHasBeenPlayed] = useState(false);

  const setPieces = useCallback((newPieces: PuzzlePiece[]) => {
    if (newPieces.length > 0) {
      const shuffled = shufflePieces(newPieces);
      setPiecesState(shuffled);
      setHasBeenPlayed(true);
    } else {
      setPiecesState(newPieces);
      setHasBeenPlayed(false);
    }
  }, []);

  const shuffle = useCallback(() => {
    if (pieces.length > 0) {
      const shuffled = shufflePieces(pieces);
      setPiecesState(shuffled);
      setHasBeenPlayed(true);
    }
  }, [pieces]);

  const reset = useCallback(() => {
    setPiecesState(initialPieces);
    setHasBeenPlayed(false);
  }, [initialPieces]);

  const resetGame = useCallback(() => {
    if (pieces.length > 0) {
      const shuffled = shufflePieces(pieces);
      setPiecesState(shuffled);
      setHasBeenPlayed(true);
    }
  }, [pieces]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        return;
      }

      const activePiece = pieces.find((piece) => piece.id === active.id);
      if (!activePiece) {
        return;
      }

      let targetPosition: number;

      if (typeof over.id === 'string' && over.id.startsWith('cell-')) {
        const positionStr = over.id.replace('cell-', '');
        targetPosition = parseInt(positionStr, 10);
      } else {
        const overPiece = pieces.find((piece) => piece.id === over.id);
        if (!overPiece) {
          return;
        }
        targetPosition = overPiece.currentPos;
      }

      if (activePiece.currentPos === targetPosition) {
        return;
      }

      const targetPiece = pieces.find(
        (piece) => piece.currentPos === targetPosition
      );

      const updatedPieces = pieces.map((piece) => {
        if (piece.id === activePiece.id) {
          return { ...piece, currentPos: targetPosition };
        }
        if (targetPiece && piece.id === targetPiece.id) {
          return { ...piece, currentPos: activePiece.currentPos };
        }
        return piece;
      });

      setPiecesState(updatedPieces);
      setHasBeenPlayed(true);
    },
    [pieces]
  );

  const isComplete =
    hasBeenPlayed &&
    pieces.length > 0 &&
    pieces.every((piece) => piece.currentPos === piece.correctPos);

  const isSolved = isComplete;

  return {
    pieces,
    isComplete,
    isSolved,
    setPieces,
    shuffle,
    reset,
    resetGame,
    handleDragEnd,
  };
};

