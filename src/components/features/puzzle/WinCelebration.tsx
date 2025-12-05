interface WinCelebrationProps {
  isVisible: boolean;
}

const MICHAEL_SCOTT_GIF_URL =
  'https://media.tenor.com/139477105926016648/the-office-michael-scott-steve-carell-told-you-wink.gif';

export const WinCelebration = ({ isVisible }: WinCelebrationProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg">
      <div className="text-center px-4 animate-fade-in max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center animate-slide-up">
          <img
            src={MICHAEL_SCOTT_GIF_URL}
            alt="Michael Scott celebration"
            className="w-auto h-64 md:h-80 lg:h-96 rounded-lg shadow-2xl object-contain"
            loading="eager"
          />
        </div>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 mb-6 animate-slide-up drop-shadow-2xl">
          Congratulations!
        </h1>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slide-up-delay drop-shadow-lg">
          You Win
        </h2>
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold animate-slide-up-delay-2 drop-shadow-md">
          Puzzle Completed
        </p>
        <div className="mt-12 w-32 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mx-auto rounded-full animate-slide-up-delay-2"></div>
      </div>
    </div>
  );
};

