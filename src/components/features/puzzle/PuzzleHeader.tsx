import { Button } from '../../common/Button';

interface PuzzleHeaderProps {
  pieceCount: number;
  onShuffle: () => void;
  isComplete?: boolean;
}

/**
 * Header component for puzzle game with shuffle button
 */
export const PuzzleHeader = ({
  pieceCount,
  onShuffle,
  isComplete = false,
}: PuzzleHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Puzzle Pieces ({pieceCount} pieces)
        </h2>
        {isComplete && (
          <p className="text-green-400 text-sm mt-1">🎉 Puzzle Complete!</p>
        )}
      </div>
      <Button variant="secondary" onClick={onShuffle}>
        Shuffle
      </Button>
    </div>
  );
};

