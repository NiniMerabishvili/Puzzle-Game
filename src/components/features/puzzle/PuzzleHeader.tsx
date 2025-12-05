import { Button } from '../../common/Button';

interface PuzzleHeaderProps {
  pieceCount: number;
  onShuffle: () => void;
  onPreview: () => void;
  isComplete?: boolean;
}

export const PuzzleHeader = ({
  pieceCount,
  onShuffle,
  onPreview,
  isComplete = false,
}: PuzzleHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
          Puzzle Pieces ({pieceCount} pieces)
        </h2>
        {isComplete && (
          <p className="text-white text-xl mt-1 font-bold">PUZZLE COMPLETE!</p>
        )}
      </div>
      <div className="flex gap-3">
        <Button variant="primary" onClick={onPreview}>
          Preview
        </Button>
        <Button variant="secondary" onClick={onShuffle}>
          Shuffle
        </Button>
      </div>
    </div>
  );
};

