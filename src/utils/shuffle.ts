import type { PuzzlePiece } from '../types/puzzle';

export const shufflePieces = (pieces: PuzzlePiece[]): PuzzlePiece[] => {
  if (pieces.length === 0) return pieces;

  const positions = Array.from({ length: pieces.length }, (_, i) => i);
  
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  return pieces.map((piece, index) => ({
    ...piece,
    currentPos: positions[index],
  }));
};

