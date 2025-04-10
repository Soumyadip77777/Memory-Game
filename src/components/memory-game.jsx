import { useEffect, useState, useRef } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [bestStats, setBestStats] = useState(
    JSON.parse(localStorage.getItem("bestStats")) || {}
  );

  const intervalRef = useRef(null);
  const matchSound = useRef(null);
  const mismatchSound = useRef(null);
  const moveSound = useRef(null);
  const winSound = useRef(null);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
    setTimer(0);
    setHasStarted(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    initializeGame();
    return () => clearInterval(intervalRef.current);
  }, [gridSize]);

  const startTimer = () => {
    if (!hasStarted) {
      setHasStarted(true);
      intervalRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
  };

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      matchSound.current?.play();
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      mismatchSound.current?.play();
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won || flipped.includes(id)) return;

    moveSound.current?.play();
    startTimer();

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        setMoves((prev) => prev + 1);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      clearInterval(intervalRef.current);
      winSound.current?.play();

      const current = bestStats[gridSize] || {};
      const isBestScore = !current.bestScore || moves < current.bestScore;
      const isBestTime = !current.bestTime || timer < current.bestTime;

      const updated = {
        ...bestStats,
        [gridSize]: {
          bestScore: isBestScore ? moves : current.bestScore,
          bestTime: isBestTime ? timer : current.bestTime,
        },
      };

      setBestStats(updated);
      localStorage.setItem("bestStats", JSON.stringify(updated));
    }
  }, [solved]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Sounds */}
      <audio ref={matchSound} src="/match.wav" preload="auto" />
      <audio ref={mismatchSound} src="/mismatch.wav" preload="auto" />
      <audio ref={moveSound} src="/move.mp3" preload="auto" />
      <audio ref={winSound} src="/win.wav" preload="auto" />

      <h1 className="text-4xl font-extrabold mb-6 text-cyan-400 drop-shadow-lg">
        🧠 Memory Game
      </h1>

      <div className="flex gap-4 mb-6">
        <label htmlFor="gridSize" className="font-semibold text-lg">
          Grid Size (2-10):
        </label>
        <input
          id="gridSize"
          type="number"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 w-16"
        />
      </div>

      <div className="mb-6 text-center space-y-2">
        <p className="text-lg">Moves: <span className="font-bold text-amber-400">{moves}</span></p>
        <p className="text-lg">Time: <span className="font-bold text-emerald-400">{timer}s</span></p>
        {bestStats[gridSize] && (
          <div className="text-sm text-pink-400 font-semibold space-y-1">
            <p>Best Moves: {bestStats[gridSize].bestScore}</p>
            <p>Best Time: {bestStats[gridSize].bestTime}s</p>
          </div>
        )}
      </div>

      <div
        className="grid gap-3 mb-6"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-xl cursor-pointer transition duration-300 transform 
              ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-emerald-500 text-white scale-110 shadow-xl animate-pulse"
                    : "bg-indigo-500 text-white scale-105 shadow-lg"
                  : "bg-gray-700 text-gray-600 hover:bg-gray-600 hover:text-white hover:scale-105"
              }`}
          >
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

      {won && (
        <div className="text-3xl font-bold text-amber-400 animate-bounce mb-6">
          🎉 You Won!
        </div>
      )}

      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
