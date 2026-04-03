import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Code2, ArrowUpRight, Blocks } from 'lucide-react'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import projects from '../data/projects'

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: 'spring', bounce: 0.4 },
    },
  }

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-black">
      {/* Deep Space Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-24 flex flex-col items-center">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gray-900 border border-gray-800 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)] mb-6">
              <Code2 className="text-neon-blue w-10 h-10 animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-md">
              Featured <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Work.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium tracking-wide">
              A curated collection of scalable web applications, designed with precision and engineered for performance.
            </p>
          </motion.div>

          {/* Asymmetric Projects Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => {
              // The first project is the "Star" and gets a massive 2-column wide layout
              const isHero = index === 0

              return (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  className={isHero ? 'lg:col-span-2' : 'col-span-1'}
                >
                  <Tilt
                    tiltMaxAngleX={isHero ? 2 : 4}
                    tiltMaxAngleY={isHero ? 2 : 4}
                    scale={1.01}
                    transitionSpeed={2000}
                    className="h-full"
                  >
                    <div className={`relative h-full p-2 glass rounded-3xl border border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex ${isHero ? 'flex-col lg:flex-row' : 'flex-col'} overflow-hidden group bg-gray-900/40`}>
                      
                      {/* Left/Top: macOS Browser Window Mockup */}
                      <div className={`relative overflow-hidden bg-black ${isHero ? 'w-full lg:w-[60%] min-h-[300px] lg:min-h-[450px]' : 'w-full h-[250px] md:h-[300px]'} rounded-[1.25rem] flex flex-col border border-gray-800`}>
                        {/* macOS native top bar */}
                        <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-800 px-4 py-3.5 flex items-center justify-between shadow-sm z-20">
                          <div className="flex gap-2.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                          </div>
                          {isHero && (
                            <div className="hidden sm:flex items-center gap-2 bg-black/50 rounded-md px-4 py-1 text-[11px] text-gray-400 font-mono tracking-widest border border-gray-700/50">
                              <Blocks size={12} className="text-neon-blue"/>
                              {project.live.replace('https://', '').replace(/\/$/, '')}
                            </div>
                          )}
                        </div>
                        
                        {/* Image Canvas with Hover Effects */}
                        <div className="relative w-full h-full overflow-hidden bg-gray-900">
                          <Link to={`/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`} aria-label={`Open ${project.title}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"/>
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            />
                            {/* Giant Animated Arrow Link Icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue/20 backdrop-blur-md border border-neon-blue text-neon-blue p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-neon-blue hover:text-white hover:scale-110 scale-75 group-hover:scale-100 flex items-center justify-center">
                              <ArrowUpRight size={32} strokeWidth={3} />
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Right/Bottom: Copywriting & Content */}
                      <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-between ${isHero ? 'w-full lg:w-[40%]' : 'w-full'}`}>
                        <div>
                          {isHero && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-neon-blue/10 border border-neon-blue/20 text-neon-blue rounded-full text-xs font-bold tracking-widest uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
                              Flagship Architected
                            </div>
                          )}
                          <div className="flex items-start justify-between mb-4 gap-4">
                            <h3 className={`font-black text-white tracking-tight leading-tight ${isHero ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                              {project.title.split(' - ')[0]}
                            </h3>
                          </div>
                          
                          {/* We extract the subtitle if it exists inside the title */}
                          <p className="text-neon-purple font-medium text-sm tracking-uppercase mb-4 mt-[-10px]">
                            {project.title.includes(' - ') ? project.title.split(' - ')[1] : ''}
                          </p>

                          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 font-medium">
                            {project.description}
                          </p>

                          {/* Minimalist Tech Badges */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.technologies.slice(0, isHero ? 10 : 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-xs font-bold tracking-wider text-gray-400 rounded-md shadow-inner"
                              >
                                {tech}
                              </span>
                            ))}
                            {!isHero && project.technologies.length > 4 && (
                               <span className="px-3 py-1.5 bg-transparent border border-gray-800 text-xs font-bold tracking-wider text-gray-500 rounded-md">
                                 +{project.technologies.length - 4}
                               </span>
                            )}
                          </div>
                        </div>

                        {/* Elite Magnetic Call-to-Actions */}
                        <div className={`flex flex-col sm:flex-row gap-4 mt-auto border-t border-gray-800/50 pt-8 ${isHero ? '' : ''}`}>
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="relative group/btn flex-1 md:flex-none">
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl opacity-70 group-hover/btn:opacity-100 transition duration-300 blur-sm"></div>
                            <div className="relative flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 border border-gray-700 rounded-xl whitespace-nowrap text-white font-bold tracking-wide">
                              See Live Application
                              <ArrowUpRight size={18} className="text-neon-blue transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </div>
                          </a>
                          
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-gray-800 rounded-xl transition duration-300 whitespace-nowrap text-gray-300 hover:text-white font-bold tracking-wide">
                            <Github size={18} />
                            Code
                          </a>
                        </div>

                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
