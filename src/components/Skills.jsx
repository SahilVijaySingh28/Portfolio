import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Blocks } from 'lucide-react'

// Comprehensive combined stack for the rotating sphere
const allSkills = [
  'ReactJS', 'NodeJS', 'C++', 'Python', 'JavaScript', 
  'TypeScript', 'MongoDB', 'ExpressJS', 'HTML5', 'CSS3', 
  'Tailwind CSS', 'Material UI', 'Firebase', 'WebRTC', 'Git', 
  'GitHub', 'C', 'Java', 'Next.js', 'Framer Motion', 'RESTful APIs', 
  'Data Structures', 'Algorithms', 'Machine Learning', 'Linux', 
  'VS Code', 'NumPy', 'Pandas', 'Matplotlib', 'Kaggle', 'Jupyter Notebook', 'Jitsi', 'Recharts'
]

// Array of vibrant color classes for the cute boxes
const badgeColors = [
  'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]',
  'bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]',
  'bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
  'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]',
  'bg-yellow-500/10 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]',
  'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]',
  'bg-orange-500/10 text-orange-300 border-orange-500/30 hover:bg-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]',
  'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
]

const TagSphere = ({ tags, radius = 220 }) => {
  const [points, setPoints] = useState([])
  const rotationRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0.003, y: 0.003 })
  const [isDragging, setIsDragging] = useState(false)
  const previousMouse = useRef({ x: 0, y: 0 })

  // Mathematical generation of points across a sphere surface
  const basePoints = useMemo(() => {
    const pts = []
    const N = tags.length
    for (let i = 0; i < N; i++) {
      // Fibonacci lattice placement
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      pts.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        label: tags[i],
      })
    }
    return pts
  }, [tags, radius])

  useEffect(() => {
    let animationFrameId

    const animate = () => {
      // Apply current velocity to rotation
      rotationRef.current.x += velocityRef.current.x
      rotationRef.current.y += velocityRef.current.y

      // If not dragging, apply friction to return to default passive speed
      if (!isDragging) {
        velocityRef.current.x += (0.002 - velocityRef.current.x) * 0.02
        velocityRef.current.y += (0.002 - velocityRef.current.y) * 0.02
      }

      const { x: angleX, y: angleY } = rotationRef.current
      const sinX = Math.sin(angleX)
      const cosX = Math.cos(angleX)
      const sinY = Math.sin(angleY)
      const cosY = Math.cos(angleY)

      // Calculate 3D rotations for every point
      const rotatedPoints = basePoints.map((p) => {
        // Rotate around Y axis
        const rx1 = p.x * cosY + p.z * sinY
        const ry1 = p.y
        const rz1 = -p.x * sinY + p.z * cosY

        // Rotate around X axis
        const rx2 = rx1
        const ry2 = ry1 * cosX - rz1 * sinX
        const rz2 = ry1 * sinX + rz1 * cosX

        return { ...p, x: rx2, y: ry2, z: rz2 }
      })

      setPoints(rotatedPoints)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [basePoints, isDragging])

  const handlePointerDown = (e) => {
    setIsDragging(true)
    previousMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - previousMouse.current.x
    const deltaY = e.clientY - previousMouse.current.y

    // Adjust velocity based on mouse delta. Multipliers control drag sensitivity
    velocityRef.current.x = deltaY * -0.002
    velocityRef.current.y = deltaX * 0.002

    previousMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  return (
    <div 
      className={`relative w-full h-[450px] md:h-[600px] flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      // prevents scrolling while dragging the sphere on touch devices
      style={{ touchAction: 'none' }}
    >
      {points.map((p, i) => {
        // Calculate physics/optical illusions based on Z-depth
        const depthRatio = (p.z + radius) / (2 * radius) // Linear from 0 (back) to 1 (front)
        
        // Items in front get larger, back fall away
        const scale = depthRatio * 0.8 + 0.5 
        // Items in back become transparent
        const opacity = Math.max(0.1, depthRatio)
        // Items in back become heavily blurred
        const blur = Math.max(0, (1 - depthRatio) * 4)
        // Only front items glow brightly
        const isFront = depthRatio > 0.6

        return (
          <div
            key={i}
            className="absolute tracking-wider left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              transform: `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              zIndex: Math.round(p.z + radius),
              color: isFront ? '#00f0ff' : '#6b7280',
              textShadow: isFront ? '0 0 15px rgba(0,240,255,0.8), 0 0 30px rgba(0,240,255,0.4)' : 'none',
              fontWeight: isFront ? '900' : '500',
              fontSize: '18px', // Scaling handles responsiveness beautifully
            }}
          >
            {p.label}
          </div>
        )
      })}
    </div>
  )
}

const Skills = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [radius, setRadius] = useState(250)

  useEffect(() => {
    // Dynamic radius for mobile screens to prevent overflow
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 140 : 250)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-black">
      {/* Deep Cyberpunk Atmospheric Space Gradients */}
      <div className="absolute top-1/2 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-neon-purple/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-neon-blue/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Arsenal */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gray-900 border border-gray-800 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)] mb-8">
              <Blocks className="text-neon-pink w-12 h-12 animate-pulse" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white drop-shadow-md leading-tight">
              Tech<br className="hidden lg:block"/>
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent"> Sphere.</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-medium tracking-wide leading-relaxed max-w-lg mb-10">
              I deploy complex algorithms, memory-safe data structures, and modern web frameworks to architect high-performance solutions.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <span className="px-5 py-2 border border-neon-blue/40 text-neon-blue rounded-full text-sm font-bold tracking-widest bg-neon-blue/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]">FULL-STACK</span>
              <span className="px-5 py-2 border border-neon-pink/40 text-neon-pink rounded-full text-sm font-bold tracking-widest bg-neon-pink/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]">ALGORITHMS</span>
              <span className="px-5 py-2 border border-neon-purple/40 text-neon-purple rounded-full text-sm font-bold tracking-widest bg-neon-purple/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">DSA MASTERY</span>
            </div>
          </motion.div>

          {/* Right Column: Isometric 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, type: 'spring' }}
            className="relative"
          >
            <TagSphere tags={allSkills} radius={radius} />
          </motion.div>

        </div>

        {/* Cute Horizontal Skills Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, type: 'spring' }}
          className="w-full mt-20 flex flex-wrap justify-center gap-3 md:gap-4 px-4"
        >
          {allSkills.map((skill, idx) => {
            const colorClass = badgeColors[idx % badgeColors.length]
            return (
              <div 
                key={idx}
                className={`px-4 py-2 rounded-xl text-sm md:text-base font-bold tracking-wider border backdrop-blur-md hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default ${colorClass}`}
              >
                {skill}
              </div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default Skills
