import { useState, useEffect, useCallback, useRef } from 'react'
import { Utensils, Trophy, Share2, Settings, Play, RefreshCw, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEFAULT_FOODS } from './data/foods'
import { PKArena } from './components/PKArena'
import { ConfigCenter } from './components/ConfigCenter'
import { ResultShare } from './components/ResultShare'
import { cn } from './utils/ui'

// Helper to shuffle array
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function App() {
  const [gameState, setGameState] = useState('home'); // home, pk, result
  const [allFoods, setAllFoods] = useState(DEFAULT_FOODS);
  const [activePKList, setActivePKList] = useState([]);
  const [pkSettings, setPkSettings] = useState({ size: 16, duration: 5 });

  const [currentRound, setCurrentRound] = useState([]); // Array of pairs
  const [nextRoundWinners, setNextRoundWinners] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [countdown, setCountdown] = useState(100);
  const [history, setHistory] = useState([]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isShareMode, setIsShareMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedFoods = localStorage.getItem('pk_foods');
    if (savedFoods) {
      try {
        setAllFoods(JSON.parse(savedFoods));
      } catch (e) {
        console.error("Failed to load foods", e);
      }
    }

    const savedSettings = localStorage.getItem('pk_settings');
    if (savedSettings) {
      try {
        setPkSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    }
  }, []);

  const handleConfigSave = ({ library, activeList, settings }) => {
    setAllFoods(library);
    setActivePKList(activeList);
    setPkSettings(settings);
    localStorage.setItem('pk_foods', JSON.stringify(library));
    localStorage.setItem('pk_settings', JSON.stringify(settings));

    // Start Battle with confirmed data
    initiateBattle(activeList);
    setIsConfigOpen(false);
  };

  const initiateBattle = (list) => {
    const pairs = [];
    for (let i = 0; i < list.length; i += 2) {
      pairs.push([list[i], list[i + 1]]);
    }
    setCurrentRound(pairs);
    setNextRoundWinners([]);
    setCurrentPairIndex(0);
    setHistory([list]);
    setIsShareMode(false);
    setGameState('pk');
  };

  const handleSelect = useCallback((selectedFood) => {
    if (!selectedFood || isProcessing) return;

    setIsProcessing(true);
    const currentWinners = [...nextRoundWinners, selectedFood];
    const isRoundOver = currentWinners.length === currentRound.length;

    if (!isRoundOver) {
      setNextRoundWinners(currentWinners);
      setCurrentPairIndex(prev => prev + 1);
      setCountdown(100);
      setTimeout(() => setIsProcessing(false), 400); // Guard to prevent rapid clicks
    } else {
      // Prepare next round or finish
      if (currentWinners.length === 1) {
        setWinner(currentWinners[0]);
        setHistory(h => [...h, currentWinners]);
        setGameState('result');
        setIsProcessing(false);
      } else {
        const nextPairs = [];
        // Support odd number of foods by promoting the last person automatically
        for (let i = 0; i < currentWinners.length; i += 2) {
          if (currentWinners[i] && currentWinners[i + 1]) {
            nextPairs.push([currentWinners[i], currentWinners[i + 1]]);
          } else if (currentWinners[i]) {
            // Odd man out: promote automatically
            nextPairs.push([currentWinners[i], null]); // Using null as a placeholder or to handle in UI
          }
        }
        setHistory(h => [...h, currentWinners]);
        setCurrentRound(nextPairs);
        setNextRoundWinners([]);
        setCurrentPairIndex(0);
        setCountdown(100);
        setTimeout(() => setIsProcessing(false), 800); // Longer wait for round transition
      }
    }
  }, [currentRound, nextRoundWinners, isProcessing]);

  // Timer: Just handles the progress bar
  useEffect(() => {
    let interval;
    if (gameState === 'pk' && !isProcessing) {
      // Calculate decrement based on duration: 100% / duration / intervals_per_sec
      // 50ms interval = 20 intervals per second
      const step = 100 / (pkSettings.duration * 20);
      interval = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - step));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [gameState, currentPairIndex, isProcessing, pkSettings.duration]);

  // Trigger: Handles timeout selection
  useEffect(() => {
    if (countdown <= 0 && gameState === 'pk' && !isProcessing) {
      const pair = currentRound[currentPairIndex];
      if (pair) {
        handleSelect(pair[Math.floor(Math.random() * 2)]);
      }
    }
  }, [countdown, gameState, isProcessing, currentPairIndex, currentRound, handleSelect]);

  const getRoundName = (count) => {
    if (count === 8) return "Sweet 16";
    if (count === 4) return "Elite Eight";
    if (count === 2) return "Final Four";
    if (count === 1) return "Championship";
    return "Qualifiers";
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-xl rotate-12 neon-border">
            <Utensils className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic neon-text uppercase">
            PK What To Eat
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-primary"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {gameState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-secondary drop-shadow-sm leading-tight">
                纠结星人的<br />终极救星 🚀
              </h2>
              <p className="text-white/40 text-lg mb-12 max-w-sm mx-auto uppercase tracking-[0.2em] font-bold">
                Decision Maker for Foodies
              </p>

              <button
                onClick={() => setIsConfigOpen(true)}
                className="group relative px-16 py-8 bg-primary rounded-[2rem] font-black text-3xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(139,92,246,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
                <span className="relative flex items-center gap-4 uppercase italic text-white">
                  Prepare Battle <Play className="w-8 h-8 fill-current" />
                </span>
              </button>
            </motion.div>
          )}

          {gameState === 'pk' && (
            <motion.div
              key="pk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <PKArena
                roundData={currentRound[currentPairIndex] ? {
                  left: currentRound[currentPairIndex][0],
                  right: currentRound[currentPairIndex][1],
                  currentPairIndex,
                  totalPairs: currentRound.length,
                  currentRoundName: getRoundName(currentRound.length)
                } : null}
                onSelect={handleSelect}
                countdownProgress={countdown}
              />
            </motion.div>
          )}

          {gameState === 'result' && winner && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex flex-col items-center"
            >
              <div className="text-primary font-black uppercase tracking-[0.3em] mb-4">The Winner is</div>

              <div
                className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] flex items-center justify-center text-9xl shadow-2xl mb-8 neon-border relative animate-bounce"
                style={{
                  background: `radial-gradient(circle at 30% 30%, white 0%, ${winner.color}33 20%, ${winner.color} 100%)`,
                  boxShadow: `0 0 80px ${winner.color}88`
                }}
              >
                <span className="drop-shadow-2xl">{winner.image}</span>
                <div className="absolute -top-12 -right-12 text-7xl rotate-12">🎖️</div>
              </div>

              <h2 className="text-6xl md:text-8xl font-black italic mb-12 neon-text uppercase underline decoration-accent underline-offset-8">
                {winner.name}
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setGameState('home')}
                  className="flex items-center gap-2 px-8 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-colors uppercase italic"
                >
                  <RefreshCw className="w-5 h-5" /> Back to Start
                </button>
                <button
                  onClick={() => setIsShareMode(true)}
                  className="flex items-center gap-2 px-8 py-4 bg-accent rounded-2xl font-black hover:scale-105 transition-all uppercase italic shadow-[0_0_20px_rgba(244,114,182,0.4)]"
                >
                  <Share2 className="w-5 h-5" /> Share Result
                </button>
              </div>
            </motion.div>
          )}

          {isShareMode && (
            <motion.div
              key="share"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full"
            >
              <ResultShare
                winner={winner}
                history={history}
                onBack={() => setIsShareMode(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ConfigCenter
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          library={allFoods}
          activeList={activePKList}
          settings={pkSettings}
          onSave={handleConfigSave}
        />
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/10 text-xs font-bold uppercase tracking-[0.5em]">
        Dopamine Decision Engine v1.0
      </footer>
    </div>
  )
}

export default App
