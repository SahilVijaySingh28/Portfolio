import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Terminal from './components/Terminal'
import Footer from './components/Footer'
import BugGame from './components/BugGame'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'

import SectionReveal from './components/SectionReveal'

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route
          path="/"
          element={
            <motion.main
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0.01px)", 
                transition: { 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1], // easeOutExpo
                  delay: 0.2
                } 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.98, 
                filter: "blur(5.01px)", 
                transition: { duration: 0.4, ease: "easeInOut" } 
              }}
              className="relative"
            >
              <Hero />
              <SectionReveal><About /></SectionReveal>
              <SectionReveal><Skills /></SectionReveal>
              <SectionReveal><Projects /></SectionReveal>
              <SectionReveal><Experience /></SectionReveal>
              <SectionReveal><Contact /></SectionReveal>
            </motion.main>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isBugGameActive, setIsBugGameActive] = useState(false)
  const [systemTheme, setSystemTheme] = useState('default')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Terminal debug command can also launch the bug game
    const handleLaunchBugGame = () => setIsBugGameActive(true)
    window.addEventListener('launch-bug-game', handleLaunchBugGame)

    // System theme overrides from Terminal
    const handleSetTheme = (e) => setSystemTheme(e.detail || 'default')
    window.addEventListener('set-system-theme', handleSetTheme)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('launch-bug-game', handleLaunchBugGame)
      window.removeEventListener('set-system-theme', handleSetTheme)
    }
  }, [])

  // Chaos Mode: designMode & Draggable Content
  useEffect(() => {
    if (systemTheme === 'hack') {
      document.designMode = 'on'
      
      let draggedElement = null
      let offset = { x: 0, y: 0 }

      const onMouseDown = (e) => {
        // Target sections, cards, or images for chaos dragging
        const target = e.target.closest('section, .card, img, button, h1, h2, h3, p')
        if (target && !e.target.closest('.terminal-container')) {
          draggedElement = target
          draggedElement.style.position = 'relative'
          draggedElement.style.zIndex = '1000'
          const rect = draggedElement.getBoundingClientRect()
          offset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          }
          // Prevent text selection while dragging if needed
        }
      }

      const onMouseMove = (e) => {
        if (draggedElement) {
          const x = e.clientX - offset.x
          const y = e.clientY - offset.y
          // We use translate for smoother movement in chaos mode
          draggedElement.style.transform = `translate(${x - draggedElement.offsetLeft}px, ${y - draggedElement.offsetTop}px)`
        }
      }

      const onMouseUp = () => {
        draggedElement = null
      }

      window.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)

      return () => {
        document.designMode = 'off'
        window.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
    } else {
      document.designMode = 'off'
    }
  }, [systemTheme])

  return (
    <BrowserRouter>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
          ) : (
            <motion.div 
              key="content" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8 }}
              className={`relative min-h-screen transition-colors duration-700 ${(systemTheme === 'default' || systemTheme === 'hack') ? 'bg-gray-900' : 'bg-black'}`}
              data-theme={systemTheme}
            >
              {/* Global Scroll Progress Bar */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink z-50 origin-left"
                style={{ scaleX, boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}
              />
              {!isMobile && <CustomCursor />}
              <Navbar />
              <Terminal />
              <AnimatedRoutes />
              <Footer onDebugClick={() => setIsBugGameActive(true)} />
              <BugGame isActive={isBugGameActive} onClose={() => setIsBugGameActive(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
