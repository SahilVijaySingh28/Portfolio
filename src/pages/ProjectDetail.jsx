import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code2 } from 'lucide-react'
import projects from '../data/projects'

const ProjectDetail = () => {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const project = projects.find((p) => {
    const s = p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
    return s === slug
  })

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
          <Link to="/" className="btn btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 }
    }
  }

  return (
    <motion.div 
      className="min-h-screen pb-20 bg-gray-950"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)", transition: { duration: 0.4 } }}
      variants={containerVariants}
    >
      {/* Hero Banner Area */}
      <div className="relative h-[40vh] min-h-[350px] md:h-[50vh] xl:h-[60vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradients to fade out the bottom and edges */}
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-transparent md:w-2/3" />
        </div>
        
        <div className="absolute inset-0 container mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16 pt-24 z-10 pointer-events-none">
          <motion.div variants={itemVariants} className="max-w-4xl pointer-events-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-neon-blue transition-colors mb-6 group w-fit"
            >
              <div className="p-2 glass rounded-full group-hover:bg-neon-blue/20 transition-colors border border-gray-700">
                <ArrowLeft size={18} />
              </div>
              <span className="font-semibold tracking-wide text-sm uppercase">Back to Portfolio</span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
               {project.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="px-4 py-1.5 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 backdrop-blur-md text-sm text-neon-blue font-semibold rounded-full shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                    {tech}
                  </span>
                ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12 relative z-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Main Description */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
            <div className="glass glass-hover rounded-3xl p-6 md:p-10 relative overflow-hidden group border border-gray-800 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl shadow-lg">
                  <Code2 className="text-white" size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Project Overview</h2>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
                {project.description}
              </p>
              
              <div className="mt-10 relative z-10">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-8 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"></span>
                  Key Highlights
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 glass p-4 rounded-xl">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                    <span className="text-gray-300 text-base">Responsive UI implemented with a modern, glassmorphic design system and fluid layouts.</span>
                  </li>
                  <li className="flex items-start gap-4 glass p-4 rounded-xl">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <span className="text-gray-300 text-base">Live interactive demo and comprehensive source code available for peer review.</span>
                  </li>
                  <li className="flex items-start gap-4 glass p-4 rounded-xl">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                    <span className="text-gray-300 text-base">Optimized performance and incredibly clean, maintainable component architecture.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside variants={itemVariants} className="md:col-span-1 space-y-8">
            
            {/* Tech Stack Box */}
            <div className="glass glass-hover rounded-3xl p-8 relative overflow-hidden border border-gray-800 shadow-2xl">
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-blue/10 rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none" />
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight relative z-10">Technologies Used</h3>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {project.technologies.map((t) => (
                  <span key={t} className="px-4 py-2 bg-gray-800/80 hover:bg-gray-700 hover:text-neon-blue transition-colors duration-300 rounded-lg text-sm font-medium text-gray-300 border border-gray-700/50 cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Box */}
            <div className="glass glass-hover rounded-3xl p-8 border border-gray-800 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Deployments</h3>
              <div className="flex flex-col gap-4">
                <motion.a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn btn-primary flex items-center justify-center gap-3 py-4 text-base font-bold shadow-lg"
                >
                  <ExternalLink size={20} />
                  <span>View Live Demo</span>
                </motion.a>
                
                <motion.a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.03, borderColor: "rgba(168,85,247,0.8)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn btn-ghost flex items-center justify-center gap-3 py-4 text-base font-bold border-2 border-gray-600 shadow-sm hover:text-white"
                >
                  <Github size={20} />
                  <span>View Source Code</span>
                </motion.a>
              </div>
            </div>

          </motion.aside>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectDetail
