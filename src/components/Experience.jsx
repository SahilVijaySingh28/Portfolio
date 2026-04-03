import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Award, Trophy, Calendar, CheckCircle2, Milestone } from 'lucide-react'
import Tilt from 'react-parallax-tilt'

const experiences = [
  {
    type: 'hackathon',
    title: '6th Technovation',
    company: 'Sharda University',
    period: 'February 2024',
    impactPoints: [
      'Designed and developed a working IoT prototype using ESP32.',
      'Engineered real-time accident detection algorithms.',
      'Built systems for live vehicle pollution monitoring.',
    ],
    icon: Trophy,
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
    borderGlow: 'group-hover:border-cyan-400/50',
  },
  {
    type: 'hackathon',
    title: 'Smart India Hackathon (SIH)',
    company: 'Internal Finalist — Sharda University',
    period: 'September 2025',
    impactPoints: [
      'Developed a full-stack Disaster Management platform.',
      'Built responsive emergency SOS interfaces with the MERN stack.',
      'Collaborated as Lead Frontend Developer.',
    ],
    icon: Trophy,
    color: 'from-pink-500 to-purple-500',
    shadow: 'shadow-[0_0_20px_rgba(236,72,153,0.4)]',
    borderGlow: 'group-hover:border-pink-500/50',
  },
  {
    type: 'internship',
    title: 'Full Stack Trainee',
    company: '6-Week Intensive Bootcamp',
    period: 'May 2025 - June 2025',
    impactPoints: [
      'Completed comprehensive MERN Stack architectural training.',
      'Strengthened Data Structures & Algorithms problem-solving logic.',
      'Gained exposure to secure REST APIs and backend integrations.',
    ],
    icon: Briefcase,
    color: 'from-emerald-400 to-green-500',
    shadow: 'shadow-[0_0_20px_rgba(52,211,153,0.4)]',
    borderGlow: 'group-hover:border-emerald-400/50',
  },
  {
    type: 'certification',
    title: 'Java Core Foundation',
    company: 'Oracle Certification',
    period: 'November 2024',
    impactPoints: [
      'Mastered Object-Oriented Programming (OOP) paradigms.',
      'Demonstrated foundational knowledge of memory safety and JVM logic.',
    ],
    icon: Award,
    color: 'from-purple-500 to-indigo-500',
    shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    borderGlow: 'group-hover:border-purple-500/50',
  },
  {
    type: 'certification',
    title: 'Full Stack Web Development',
    company: 'Udemy Masterclass',
    period: 'July 2024',
    impactPoints: [
      'Completed an exhaustive Full Stack engineering course.',
      'Practiced modern deployment techniques and Git workflows.',
    ],
    icon: Award,
    color: 'from-orange-500 to-red-500',
    shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.4)]',
    borderGlow: 'group-hover:border-orange-500/50',
  },
]

// ── Extracted as its own component so useInView is called at component level, not inside .map() ──
const TimelineItem = ({ exp, index }) => {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: false })
  const Icon = exp.icon
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex justify-end md:justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Spacer for symmetric layout */}
      <div className="hidden md:block w-5/12" />

      {/* Central Node */}
      <motion.div
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-[60px] h-[60px] md:w-[64px] md:h-[64px] z-20 flex items-center justify-center shrink-0"
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        <div className={`relative w-full h-full rounded-2xl bg-gray-900 border-2 ${inView ? 'border-white' : 'border-gray-700'} flex items-center justify-center shadow-2xl transition-colors duration-500 rotate-45`}>
          <Icon className={`absolute -rotate-45 ${inView ? 'text-white' : 'text-gray-500'}`} size={24} />
          {inView && (
            <span className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${exp.color} opacity-40 blur-md -z-10`} />
          )}
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: isEven ? 50 : -50, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        className="w-[calc(100%-80px)] md:w-5/12"
      >
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={2000}>
          <div className={`glass group p-6 sm:p-8 rounded-3xl border border-gray-800 bg-gray-900/40 relative overflow-hidden transition-all duration-500 ${inView ? exp.borderGlow : ''}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${exp.color} ${inView ? 'opacity-10' : 'opacity-0'} blur-3xl transition-opacity duration-1000 -z-10`} />

            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 bg-gradient-to-r ${exp.color} text-white ${exp.shadow}`}>
                {exp.type}
              </span>
              <h3 className="text-2xl font-black text-white mb-1 leading-tight">{exp.title}</h3>
              <p className="text-gray-400 font-semibold tracking-wide text-sm">{exp.company}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider text-gray-500 mb-6 bg-black/40 px-4 py-2 rounded-xl border border-gray-800">
              <Calendar size={14} className="text-gray-400" />
              <span>{exp.period}</span>
            </div>

            <div className="space-y-3">
              {exp.impactPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 opacity-50" />
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  )
}

// ── Main Section ──
const Experience = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const laserScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-black border-t border-gray-900">
      {/* Background blobs */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10" ref={containerRef}>

        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-20 md:mb-32 flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gray-900 border border-gray-800 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] mb-6">
            <Milestone className="text-white w-10 h-10 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-md">
            Career <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Trajectory.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium tracking-wide">
            Hackathons, intensive bootcamps, and globally recognized certifications that prove my engineering capabilities.
          </p>
        </motion.div>

        {/* Laser Scroll Timeline */}
        <div className="relative">
          {/* Dark track */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1.5 bg-gray-900 rounded-full md:-translate-x-1/2" />
          {/* Glowing laser beam */}
          <motion.div
            style={{ scaleY: laserScale, transformOrigin: 'top' }}
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full md:-translate-x-1/2 shadow-[0_0_15px_rgba(168,85,247,0.7)] z-10"
          />

          {/* Timeline nodes */}
          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => (
              <TimelineItem key={`${exp.type}-${index}`} exp={exp} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Experience
