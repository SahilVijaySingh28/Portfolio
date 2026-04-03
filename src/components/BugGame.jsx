import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bug, X, Trophy, RefreshCw, Zap } from 'lucide-react'

const TOTAL_BUGS = 8
const GAME_DURATION = 20

// Squash particle burst on click
const SquashEffect = ({ x, y, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="absolute pointer-events-none z-50" style={{ left: x, top: y }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-neon-purple"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i * 60 * Math.PI) / 180) * 40,
            y: Math.sin((i * 60 * Math.PI) / 180) * 40,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-xl"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        💥
      </motion.div>
    </div>
  )
}

const BugGame = ({ isActive, onClose }) => {
  const [bugs, setBugs] = useState([])
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [gameState, setGameState] = useState('playing')
  const [squashed, setSquashed] = useState(0)
  const [squashEffects, setSquashEffects] = useState([])

  const startGame = useCallback(() => {
    setTimeLeft(GAME_DURATION)
    setGameState('playing')
    setSquashed(0)
    setSquashEffects([])
    setBugs(
      Array.from({ length: TOTAL_BUGS }).map((_, i) => ({
        id: i,
        x: 60 + Math.random() * (window.innerWidth - 140),
        y: 120 + Math.random() * (window.innerHeight - 200),
      }))
    )
  }, [])

  useEffect(() => {
    if (isActive) startGame()
  }, [isActive, startGame])

  // Timer
  useEffect(() => {
    if (!isActive || gameState !== 'playing') return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameState('lost')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isActive, gameState])

  // Bug jitter movement
  useEffect(() => {
    if (!isActive || gameState !== 'playing') return
    const jitter = setInterval(() => {
      setBugs(prev =>
        prev.map(bug => ({
          ...bug,
          x: 60 + Math.random() * (window.innerWidth - 140),
          y: 120 + Math.random() * (window.innerHeight - 200),
        }))
      )
    }, 1000)
    return () => clearInterval(jitter)
  }, [isActive, gameState])

  // Win detection
  useEffect(() => {
    if (isActive && gameState === 'playing' && bugs.length === 0 && squashed > 0) {
      setGameState('won')
    }
  }, [bugs, isActive, gameState, squashed])

  const squashBug = (id, e) => {
    if (gameState !== 'playing') return
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // Add squash particle effect
    const effectId = Date.now() + id
    setSquashEffects(prev => [...prev, { id: effectId, x: cx, y: cy }])
    setBugs(prev => prev.filter(b => b.id !== id))
    setSquashed(prev => prev + 1)
  }

  const removeEffect = (id) => {
    setSquashEffects(prev => prev.filter(e => e.id !== id))
  }

  // Timer color
  const timerColor = timeLeft <= 5
    ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
    : timeLeft <= 10
    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
    : 'bg-neon-blue/10 text-neon-blue border-neon-blue/30'

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none select-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm pointer-events-auto" />

      {/* HUD Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex flex-wrap justify-between items-center gap-3 pointer-events-auto z-50">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Title */}
          <div className="flex items-center gap-2">
            <Bug className="text-neon-purple w-5 h-5" />
            <h2 className="text-base md:text-lg font-black text-white tracking-widest uppercase">
              Debug<span className="text-neon-purple">Mode</span>
            </h2>
          </div>

          {/* Timer */}
          <div className={`px-4 py-1.5 rounded-full font-black text-lg border transition-all ${timerColor} ${timeLeft <= 5 ? 'animate-pulse' : ''}`}>
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 bg-gray-900/60 text-sm font-bold text-gray-300">
            <Zap size={14} className="text-yellow-400" />
            <span>{squashed} / {TOTAL_BUGS} squashed</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full border border-gray-700 bg-gray-900/80 text-gray-400 hover:text-white hover:border-gray-500 transition-colors backdrop-blur-sm"
        >
          <X size={20} />
        </button>
      </div>

      {/* Instruction on first load */}
      {squashed === 0 && gameState === 'playing' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-sm font-bold tracking-widest uppercase animate-pulse pointer-events-none"
        >
          Click the bugs to squash them!
        </motion.p>
      )}

      {/* Win Modal */}
      <AnimatePresence>
        {gameState === 'won' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 border border-neon-blue/40 p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.2)] text-center pointer-events-auto z-50 w-[90%] max-w-sm"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl mb-4"
            >🏆</motion.div>
            <Trophy className="text-yellow-400 w-8 h-8 mx-auto mb-3" />
            <h2 className="text-3xl font-black text-white mb-2">All Bugs Squashed!</h2>
            <p className="text-neon-blue font-semibold mb-2">
              {TOTAL_BUGS} out of {TOTAL_BUGS} eliminated
            </p>
            <p className="text-gray-500 text-sm mb-8">
              System fully debugged. For now...
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={startGame}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple font-bold text-white hover:opacity-90 transition-opacity"
              >
                <RefreshCw size={16} /> Play Again
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-bold transition-colors"
              >
                Close Debugger
              </button>
            </div>
          </motion.div>
        )}

        {/* Lost Modal */}
        {gameState === 'lost' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 border border-neon-pink/40 p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(236,72,153,0.2)] text-center pointer-events-auto z-50 w-[90%] max-w-sm"
          >
            <div className="text-5xl mb-4">🐛</div>
            <h2 className="text-3xl font-black text-white mb-2">Bugs Escaped!</h2>
            <p className="text-neon-pink font-semibold mb-2">
              Only {squashed} / {TOTAL_BUGS} squashed
            </p>
            <p className="text-gray-500 text-sm mb-8">
              System instability imminent. Deploy the exterminator.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={startGame}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-purple font-bold text-white hover:opacity-90 transition-opacity"
              >
                <RefreshCw size={16} /> Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-bold transition-colors"
              >
                Abort Mission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bugs */}
      {gameState === 'playing' && bugs.map(bug => (
        <motion.button
          key={bug.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, x: bug.x, y: bug.y }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.9 }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.5, rotate: 180 }}
          onClick={(e) => squashBug(bug.id, e)}
          style={{ position: 'absolute', top: 0, left: 0 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-neon-purple bg-neon-purple/10 hover:bg-neon-purple/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] pointer-events-auto cursor-crosshair z-40 transition-colors"
        >
          <Bug className="text-neon-purple w-6 h-6 md:w-8 md:h-8" />
        </motion.button>
      ))}

      {/* Squash particle effects */}
      {squashEffects.map(ef => (
        <SquashEffect key={ef.id} x={ef.x} y={ef.y} onDone={() => removeEffect(ef.id)} />
      ))}
    </div>
  )
}

export default BugGame
