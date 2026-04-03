import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SectionReveal = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 1.02, filter: 'blur(8px)' }}
        animate={inView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0.01px)',
        } : {}}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
          filter: { duration: 0.8 }
        }}
      >
        {children}
      </motion.div>

      {/* Cinematic Digital Sweep Reveal */}
      {inView && (
        <motion.div
          initial={{ top: '-10%', opacity: 0 }}
          animate={{ top: '110%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 h-[100px] pointer-events-none z-[100]"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0, 240, 255, 0.1), rgba(168, 85, 247, 0.2), rgba(0, 240, 255, 0.1), transparent)',
            borderTop: '1px solid rgba(0, 240, 255, 0.3)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
          }}
        />
      )}
    </div>
  )
}

export default SectionReveal
