import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Trophy, MapPin, Sparkles, Code2, Server, BookOpen, Gamepad2, Clock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import Tilt from 'react-parallax-tilt'

const SpotlightCard = ({ children, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden w-full h-full ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 240, 255, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}

const LocalTime = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2 mt-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-700/50">
      <Clock className="w-4 h-4 text-neon-blue" />
      <span className="font-mono text-neon-blue font-semibold tracking-widest text-sm">
        {time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit' })} IST
      </span>
    </div>
  )
}

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const bentoVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, type: 'spring', bounce: 0.4 },
    },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden bg-black border-t border-gray-900"
    >
      {/* Background Ambient Blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12 md:gap-16"
        >
          {/* Section Header — consistent with rest of site */}
          <motion.div variants={bentoVariants} className="text-center mb-4 flex flex-col items-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gray-900 border border-gray-800 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)] mb-6">
              <Sparkles className="text-neon-purple w-10 h-10 animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-md">
              Behind the <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Code.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium tracking-wide">
              Building robust applications, optimizing algorithms, and engineering beautiful digital experiences.
            </p>
          </motion.div>

          {/* Premium Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            
            {/* Box 1: Core Bio (Spans 2 columns on desktop) */}
            <motion.div variants={bentoVariants} className="md:col-span-2 h-full z-10">
              <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} className="w-full h-full">
                <SpotlightCard className="p-8 glass rounded-3xl border border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  {/* Background glowing orb */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl opacity-50" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <Code2 className="text-neon-blue mb-6 w-10 h-10" />
                    <div>
                      <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Computer Science Student</h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        I am a highly driven Computer Science undergraduate actively pursuing my B.Tech. While my roots are deeply embedded in <strong className="text-white">C++ programming and high-performance Data Structures</strong>, my skill set extends heavily into full-stack web development.
                      </p>
                      <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        I specialize in bridging the gap between rigorous algorithmic logic and sleek, user-centric interfaces. From deploying responsive backends in <strong className="text-neon-purple font-medium">Node.js</strong> to crafting dynamic, Awwwards-style frontend experiences in <strong className="text-neon-blue font-medium">React</strong>, I build reliable solutions that don't just work—they perform flawlessly.
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Tilt>
            </motion.div>

            {/* Column 2: Stacked Cards (Location + Hobby) */}
            <div className="flex flex-col gap-6 h-full z-10 w-full">

              {/* Box 2a: Location & Status */}
              <motion.div variants={bentoVariants} className="flex-1 w-full text-[0px]">
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="w-full h-full text-base">
                  <div className="relative h-full p-6 glass rounded-3xl border border-gray-700/50 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/80 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-900/80 backdrop-blur border-2 border-gray-700 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <MapPin className="text-neon-pink w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">Location</h3>
                      <p className="text-gray-400 text-base mb-1 font-medium">Greater Noida, UP</p>

                      <LocalTime />

                      {/* Sonar Ping Animation */}
                      <div className="relative inline-flex items-center gap-2 px-4 py-2 mt-5 bg-green-500/10 border border-green-500/20 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="text-green-400 text-xs font-bold tracking-widest uppercase">Seeking Internships</span>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>

              {/* Box 2b: Gaming Hobby */}
              <motion.div variants={bentoVariants} className="h-[120px] w-full text-[0px]">
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="w-full h-full text-base">
                  <div className="relative h-full p-6 glass rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden group flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-gray-900 border border-gray-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                        <Gamepad2 className="text-neon-purple w-8 h-8 group-hover:-rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Off-duty</p>
                        <h3 className="text-xl font-black text-white tracking-tight">Competitive Gamer</h3>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>

            </div>

            {/* Box 3: Achievements (LeetCode) */}
            <motion.div variants={bentoVariants} className="h-full z-10">
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="w-full h-full">
                <a
                  href="https://leetcode.com/u/sahilvijaysingh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-full p-8 glass rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden group flex flex-col justify-center cursor-pointer block"
                >
                  <div className="absolute inset-0 bg-gradient-to-tl from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <Trophy className="text-neon-purple mb-6 w-10 h-10" />

                    {/* Animated Gradient Text */}
                    <div className="relative inline-block mb-2">
                      <h3 className="text-5xl font-black bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                        400+
                      </h3>
                    </div>

                    <p className="text-2xl font-bold text-gray-100 mb-3 tracking-tight">DSA Problems</p>
                    <p className="text-gray-400 font-medium leading-relaxed">Systematically solved across LeetCode & competitive programming ecosystems.</p>
                  </div>
                </a>
              </Tilt>
            </motion.div>

            {/* Box 4: Education (1 column) */}
            <motion.div variants={bentoVariants} className="h-full z-10">
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="w-full h-full">
                <SpotlightCard className="p-8 glass rounded-3xl border border-gray-700/50 shadow-2xl flex flex-col items-start gap-4 h-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-blue to-neon-purple" />

                  <div className="relative z-10 flex flex-col gap-4 w-full">
                    <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 self-start shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                      <GraduationCap className="text-gray-300 w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">B.Tech, CSE</h3>
                      <p className="text-gray-400 text-base font-medium mb-3">Sharda University</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 text-neon-blue rounded-full text-xs font-bold tracking-widest">
                        2023 — PRESENT
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto pt-5 border-t border-gray-700/50 w-full flex flex-col items-start">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Current CGPA</p>
                    <div className="text-4xl font-black text-white drop-shadow-md">
                      8.41<span className="text-gray-600 text-xl font-bold">/10</span>
                    </div>
                  </div>
                </SpotlightCard>
              </Tilt>
            </motion.div>

            {/* Box 5: Currently Learning */}
            <motion.div variants={bentoVariants} className="h-full z-10">
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="w-full h-full">
                <div className="relative h-full p-8 glass rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 self-start shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] mb-6">
                      <BookOpen className="text-neon-pink w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Currently Learning</h3>
                    <ul className="space-y-4 flex-1 flex flex-col justify-center mt-2">
                      <li className="flex items-center gap-4 text-gray-300 font-medium">
                        <div className="w-2 h-2 rounded-full bg-neon-pink flex-shrink-0" />
                        Advanced React Patterns
                      </li>
                      <li className="flex items-center gap-4 text-gray-300 font-medium">
                        <div className="w-2 h-2 rounded-full bg-neon-purple flex-shrink-0" />
                        System Design Principles
                      </li>
                      <li className="flex items-center gap-4 text-gray-300 font-medium">
                        <div className="w-2 h-2 rounded-full bg-neon-blue flex-shrink-0" />
                        Machine Learning Fundamentals
                      </li>
                    </ul>
                  </div>
                </div>
              </Tilt>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
