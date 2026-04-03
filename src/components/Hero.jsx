import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import ParticleNetwork from './ParticleNetwork'
import Magnetic from './Magnetic'
import OrbitalDroid from './OrbitalDroid'

const LeetCode = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="m15.42 16.94-2.25 2.17a2.1 2.1 0 0 1-1.52.56 2.1 2.1 0 0 1-1.52-.56l-3.61-3.63a2.18 2.18 0 0 1-.58-1.55 2.07 2.07 0 0 1 .58-1.52l3.6-3.65a2.1 2.1 0 0 1 1.53-.54 2.08 2.08 0 0 1 1.52.55l2.25 2.17A1.14 1.14 0 0 0 17 9.33l-2.17-2.2a4.24 4.24 0 0 0-2-1.12l2.06-2.08a1.15 1.15 0 0 0-1.62-1.62l-8.43 8.42a4.48 4.48 0 0 0-1.24 3.2 4.57 4.57 0 0 0 1.24 3.23l3.63 3.63A4.38 4.38 0 0 0 11.66 22a4.45 4.45 0 0 0 3.2-1.25L17 18.56a1.14 1.14 0 0 0-1.61-1.62z"/><path d="M19.34 12.84h-8.45a1.12 1.12 0 0 0 0 2.24h8.45a1.12 1.12 0 0 0 0-2.24"/>
  </svg>
)

const scrollToSection = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/SahilVijaySingh28', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sahil-vijay-singh-897242285/', label: 'LinkedIn' },
  { icon: LeetCode, href: 'https://leetcode.com/u/sahilvijaysingh/', label: 'LeetCode' },
  { icon: Mail, href: 'mailto:sahilvijaysingh15@gmail.com', label: 'Email' },
]

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
  ]

  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const typingStateRef = useRef({
    currentIndex: 0,
    isDeleting: false,
    currentRoleIndex: 0,
    isPaused: false,
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!inView) return
    let typingInterval = null
    let pauseTimeout = null

    const typeText = () => {
      const state = typingStateRef.current
      if (state.isPaused) return

      const currentRole = roles[state.currentRoleIndex]

      if (!state.isDeleting) {
        if (state.currentIndex < currentRole.length) {
          setDisplayText(currentRole.slice(0, state.currentIndex + 1))
          state.currentIndex++
          setIsTyping(true)
        } else {
          setIsTyping(false)
          state.isPaused = true
          pauseTimeout = setTimeout(() => {
            state.isDeleting = true
            state.isPaused = false
          }, 1800)
        }
      } else {
        if (state.currentIndex > 0) {
          state.currentIndex--
          setDisplayText(currentRole.slice(0, state.currentIndex))
          setIsTyping(true)
        } else {
          state.isDeleting = false
          state.currentRoleIndex = (state.currentRoleIndex + 1) % roles.length
          state.currentIndex = 0
        }
      }
    }

    typingInterval = setInterval(typeText, 55)
    return () => {
      if (typingInterval) clearInterval(typingInterval)
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [inView])



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  const itemUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } },
  }

  const itemLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: 'spring' } },
  }

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-black"
    >
      {/* Deep space background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(0,240,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(168,85,247,0.06),transparent_60%)]" />
        <ParticleNetwork />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh] py-12"
        >

          {/* LEFT: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* Status badge */}
            <motion.div variants={itemUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/60 backdrop-blur-sm text-xs font-bold tracking-widest uppercase text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                B.Tech CS Student &nbsp;·&nbsp; C++ &amp; DSA Enthusiast
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemUp} className="mb-4">
              <p className="text-gray-500 text-lg font-medium mb-3 tracking-wide">Hey there, I'm</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none text-white whitespace-nowrap">
                Sahil <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]">Vijay Singh</span>
              </h1>
            </motion.div>

            {/* Typing role */}
            <motion.div variants={itemUp} className="mb-6 h-10 flex items-center">
              <span className="text-xl md:text-2xl font-semibold text-gray-400">
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="ml-1 inline-block w-0.5 h-6 bg-neon-blue rounded-full"
              />
            </motion.div>

            {/* Bio */}
            <motion.p variants={itemUp} className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-medium">
              B.Tech CS Student passionate about building scalable web applications and solving complex problems with clean, efficient code.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemUp} className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Magnetic>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ boxShadow: '0 0 30px rgba(0,240,255,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple" />
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Download size={18} className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  <span className="relative z-10 tracking-wide">Download Resume</span>
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('#contact')}
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-gray-300 border border-gray-700 hover:border-gray-500 hover:bg-gray-900/60 hover:text-white transition-all duration-200 backdrop-blur-sm"
                >
                  <Mail size={18} />
                  <span className="tracking-wide">Get In Touch</span>
                </motion.button>
              </Magnetic>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemUp} className="flex items-center gap-4">
              <span className="text-xs text-gray-600 font-bold tracking-widest uppercase">Find me on</span>
              <div className="w-8 h-px bg-gray-800" />
              <div className="flex gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon
                  const isEmail = s.href.startsWith('mailto:')
                  return (
                    <Magnetic key={s.label} strength={0.4}>
                      <motion.a
                        href={s.href}
                        target={isEmail ? undefined : '_blank'}
                        rel={isEmail ? undefined : 'noopener noreferrer'}
                        aria-label={s.label}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 rounded-xl border border-gray-800 bg-gray-900/60 text-gray-500 hover:text-white hover:border-gray-600 transition-all duration-200 backdrop-blur-sm block"
                      >
                        <Icon size={18} />
                      </motion.a>
                    </Magnetic>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Profile Photo */}
          <motion.div
            variants={itemLeft}
            className="order-1 lg:order-2 flex items-center justify-center relative"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink p-[2px] scale-[1.06] blur-sm opacity-40"
              />
              <div className="absolute inset-0 rounded-full border border-neon-blue/20 scale-[1.04]" />
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-gray-800 shadow-[0_0_80px_rgba(0,240,255,0.1)]"
              >
                <img
                  src="/profile-photo.jpeg"
                  alt="Sahil Vijay Singh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>

        </motion.div>

        {/* 3D Centered Orbital Droid (Half-Body) */}
        <div className="absolute bottom-[-60px] md:bottom-[-100px] left-1/2 -translate-x-1/2 w-[350px] h-[250px] md:w-[450px] md:h-[350px] pointer-events-none z-0">
          <OrbitalDroid mouse={mouse} />
        </div>

      </div>
    </section>
  )
}

export default Hero
