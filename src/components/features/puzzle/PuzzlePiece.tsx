import type { PuzzlePiece as PuzzlePieceType } from '../../../types/puzzle';

interface PuzzlePieceProps {
  piece: PuzzlePieceType;
}

export const PuzzlePiece = ({ piece }: PuzzlePieceProps) => {
  return (
    <div className="aspect-square overflow-hidden border-2 border-white bg-black relative">
      <img
        src={piece.imageUrl}
        alt={`Puzzle piece ${piece.id}`}
        className="w-full h-full object-cover block"
      />
      {/* <div className="absolute top-1 left-1 bg-white text-black text-xs font-black px-1.5 py-0.5 border border-black">
        {piece.id}
      </div> */}
    </div>
  );
};

