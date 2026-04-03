import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const StackText = ({ children, percent }) => {
  const layers = Array.from({ length: 8 })
  return (
    <div className="relative perspective-[1000px] preserve-3d">
      {layers.map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, z: -i * 5 }}
          animate={{ 
            opacity: i === 0 ? 1 : 0.15 - (i * 0.015),
            z: i * 4,
            textShadow: i === 0 ? '0 0 25px rgba(0,240,255,0.6)' : 'none',
            x: percent > 95 ? (i % 2 === 0 ? 3 : -3) : 0 
          }}
          className={`absolute inset-0 whitespace-nowrap overflow-visible ${i === 0 ? 'relative' : ''}`}
          style={{ 
            color: i === 0 ? '#fff' : '#00f0ff',
            filter: i > 0 ? `blur(${i * 0.5}px)` : 'none'
          }}
        >
          {children}
        </motion.span>
      ))}
    </div>
  )
}

const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0)
  const [phase, setPhase] = useState('SYS_INIT...')

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 4.6
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (percent > 0 && percent < 40) setPhase('SYS_INIT...')
    if (percent >= 40 && percent < 80) setPhase('NET_LINK...')
    if (percent >= 80 && percent < 99) setPhase('CORE_READY...')
    if (percent === 100) {
      setPhase('ACCESS_GRANTED')
      setTimeout(onComplete, 800)
    }
  }, [percent, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      {/* Shutter Panels */}
      <AnimatePresence>
        {percent < 100 && (
          <>
            <motion.div 
               exit={{ y: '-100%' }}
               transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
               className="absolute top-0 left-0 w-full h-1/2 bg-gray-950/90 z-20 border-b border-neon-blue/20"
            />
            <motion.div 
               exit={{ y: '100%' }}
               transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
               className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-950/90 z-20 border-t border-neon-blue/20"
            />
          </>
        )}
      </AnimatePresence>

      <div className="relative z-30 flex flex-col items-center text-center px-6">
        <motion.div animate={{ scale: percent === 100 ? 1.05 : 1 }} className="mb-14">
          <StackText percent={percent}>
            <span className="text-3xl md:text-6xl font-black tracking-[0.4em] italic">
              SAHIL <span className="text-neon-blue">VIJAY</span> SINGH
            </span>
          </StackText>
          <motion.div 
             animate={{ 
               width: percent > 98 ? '105%' : '80%',
               opacity: [0.3, 0.6, 0.3],
               boxShadow: percent > 98 ? '0 0 20px #00f0ff' : '0 0 5px #00f0ff'
             }}
             transition={{ duration: 0.2, repeat: Infinity }}
             className="h-[2px] bg-neon-blue mt-12 mx-auto"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ 
               y: percent > 98 ? [0, -1, 1, 0] : 0,
               scale: percent === 100 ? 1.1 : 1,
               color: percent > 98 ? '#00f0ff' : '#fff'
            }}
            className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter"
          >
            {Math.floor(Math.min(percent, 100))}
            <span className="text-neon-blue text-4xl">%</span>
          </motion.div>
          <p className={`text-[12px] tracking-[0.8em] font-bold uppercase ${percent === 100 ? 'text-neon-pink' : 'text-gray-500'}`}>
            {phase}
          </p>
        </div>
      </div>

      {/* Cyber Noise/Scan Layer (Replaced broken external SVG with reliable local noise) */}
      <div 
        className="absolute inset-0 pointer-events-none z-[40] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <motion.div 
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-[10vh] bg-gradient-to-b from-transparent via-neon-pink/10 to-transparent pointer-events-none z-[50]"
      />
    </motion.div>
  )
}

export default Preloader
