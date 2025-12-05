import type { PuzzlePiece } from '../types/puzzle';

/**
 * Shuffles puzzle pieces by randomizing their currentPos values
 * @param pieces - Array of puzzle pieces to shuffle
 * @returns New array with shuffled currentPos values
 */
export const shufflePieces = (pieces: PuzzlePiece[]): PuzzlePiece[] => {
  if (pieces.length === 0) return pieces;

  // Generate random positions (0 to pieces.length - 1)
  const positions = Array.from({ length: pieces.length }, (_, i) => i);
  
  // Fisher-Yates shuffle algorithm
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Create new array with shuffled positions
  return pieces.map((piece, index) => ({
    ...piece,
    currentPos: positions[index],
  }));
};

