import { Button } from '../../common/Button';

interface WinMessageProps {
  onReset: () => void;
}

export const WinMessage = ({ onReset }: WinMessageProps) => {
  const GIF_URL = 'https://media.giphy.com/media/ui1hpJSyBDWlG/giphy.gif';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slide-up uppercase tracking-tight">
          Puzzle Solved!
        </h2>

        <div className="mb-8 flex justify-center animate-slide-up-delay">
          <img
            src={GIF_URL}
            alt="Michael Scott Wink"
            className="h-64 w-auto shadow-2xl border-4 border-white object-contain"
            loading="eager"
          />
        </div>

        <div className="animate-slide-up-delay-2">
          <Button variant="primary" size="lg" onClick={onReset}>
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

