import { PuzzleGame } from './components/features/puzzle/PuzzleGame';
import './App.css';


function App() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-center mb-8 text-4xl font-bold text-white">
        3x3 Puzzle Game
      </h1>
      <PuzzleGame />
    </div>
  );
}

export default App;
