import { PuzzleGame } from './components/features/puzzle/PuzzleGame';
import './App.css';


function App() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto bg-black">
      <h1 className="text-center mb-8 text-5xl font-black text-white tracking-tight">
        3x3 PUZZLE GAME
      </h1>
      <PuzzleGame />
    </div>
  );
}

export default App;
