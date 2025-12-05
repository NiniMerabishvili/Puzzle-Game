import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';

interface PuzzlePieceProps {
  piece: PuzzlePieceType;
}

/**
 * Presentational component for a single puzzle piece
 */
export const PuzzlePiece = ({ piece }: PuzzlePieceProps) => {
  return (
    <div className="aspect-square overflow-hidden border border-gray-600 rounded bg-gray-700 relative">
      <img
        src={piece.imageUrl}
        alt={`Puzzle piece ${piece.id}`}
        className="w-full h-full object-cover block"
      />
      <div className="absolute top-1 left-1 bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded">
        {piece.id}
      </div>
    </div>
  );
};

