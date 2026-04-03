import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Terminal as TerminalIcon, Code2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Magnetic from './Magnetic'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const [hoveredItem, setHoveredItem] = useState(null)

  // Scroll progress for the top laser bar
  const { scrollYProgress } = useScroll()
  const laserWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    // Use rootMargin to create a horizontal "laser line" that detections when a section enters
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (id) setActiveItem(id.charAt(0).toUpperCase() + id.slice(1))
        }
      })
    }, {
      rootMargin: '-10% 0px -40% 0px', // detects when top 10% to 40% of viewport contains section
      threshold: 0,
    })

    // Helper: find and observe sections
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]')
      if (sections.length > 0) {
        sections.forEach(section => observer.observe(section))
        return true
      }
      return false
    }

    if (location.pathname === '/') {
      // Small initial trigger
      if (window.scrollY < 100) setActiveItem('Home')

      // Discovery polling: try to find sections for 2 seconds (covers slow animations)
      let count = 0
      const interval = setInterval(() => {
        const found = observeSections()
        count++
        if (found || count > 10) clearInterval(interval)
      }, 200)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (observer) observer.disconnect()
        clearInterval(interval)
      }
    } else {
      // If we're not on the home page, clear active item or set to meaningful default
      // For instance, if it's a project page, we might want "Projects" to stay active
      if (location.pathname.startsWith('/projects')) {
        setActiveItem('Projects')
      } else {
        setActiveItem('')
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ]

  const scrollToSection = (href, name) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home FIRST with the hash
      navigate('/' + href)
      return
    }

    const element = document.querySelector(href)
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { 
          offset: -80, // Account for navbar height
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setActiveItem(name)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Scroll Progress Laser */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-900 z-50 pointer-events-none">
        <motion.div
          style={{ width: laserWidth }}
          className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink shadow-[0_0_8px_rgba(0,240,255,0.8)]"
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 overflow-hidden ${
          isScrolled
            ? 'glass-premium py-2 border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-4'
        }`}
      >
        {/* Subtle noise texture layer - Using reliable base64 noise to avoid 403 errors */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4P///8lbv58AAAAFnRSTlMAzNDU2drb3t/g4eLj5Onq6+zu7+/zR46S+AAAABJ0RVh0U29mdHdhcmUAUGFpbnQuTkVUX073QSMAAAAgSURBVDhPY2BgYGRkYmJmZubmYWFhYmJmZubmYWFhYGBgYAFvAAd0AB93AAAAAElFTkSuQmCC')]" />
        
        {/* Scanline line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between pointer-events-none">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="pointer-events-auto flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg glass-light transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-80 scale-75'}`}>
              <Code2 className="text-neon-blue w-4 h-4" />
            </div>
            <h1
              className="text-xl md:text-2xl font-black tracking-tighter cursor-pointer"
              onClick={() => scrollToSection('#home', 'Home')}
            >
              <span className="text-white font-bold">Sahil</span>
              <span className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">.dev</span>
            </h1>
          </motion.div>

          {/* Desktop Pill Nav */}
          <div
            className="hidden lg:flex pointer-events-auto items-center glass-light rounded-2xl px-1.5 py-1.5 border border-white/5 shadow-2xl relative gap-1"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navItems.map((item) => {
              const isActive = activeItem === item.name
              const isHovered = hoveredItem === item.name

              return (
                <Magnetic key={item.name} strength={0.2}>
                  <button
                    onClick={() => scrollToSection(item.href, item.name)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive ? 'text-white' : isHovered ? 'text-neon-blue' : 'text-gray-500'
                    }`}
                  >
                    <span className="relative z-20">{item.name}</span>

                    {/* Hover background pill */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hoverPill"
                        className="absolute inset-0 bg-white/5 rounded-xl z-10"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                      />
                    )}

                    {/* Active gradient pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-white/10 rounded-xl border border-white/5 z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}

                    {/* Active laser indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-neon-blue shadow-[0_0_8px_rgba(0,240,255,0.8)] z-20"
                      />
                    )}
                  </button>
                </Magnetic>
              )
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex lg:flex pointer-events-auto items-center gap-3">
            <Magnetic strength={0.3}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 font-medium text-sm backdrop-blur-md text-gray-400 hover:text-neon-blue"
              >
                <TerminalIcon size={15} />
                <span>Terminal</span>
              </motion.button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,240,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact', 'Contact')}
                className="relative px-5 py-2.5 rounded-xl font-bold text-sm text-white overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple" />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Let's Talk</span>
              </motion.button>
            </Magnetic>
          </div>

          {/* Mobile Toggles */}
          <div className="flex lg:hidden pointer-events-auto items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
              className="p-2.5 rounded-full border border-gray-700/70 bg-gray-900/80 text-gray-400 hover:text-neon-blue backdrop-blur-md transition-colors"
            >
              <TerminalIcon size={18} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full border border-gray-700/70 bg-gray-900/80 text-gray-300 backdrop-blur-md relative z-50"
            >
              <motion.div animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.2 }}>
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-30 lg:hidden"
          >
            <div className="glass-premium rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col gap-1">
              {[...navItems, { name: 'Contact', href: '#contact' }].map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollToSection(item.href, item.name)}
                  className={`px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all ${
                    activeItem === item.name
                      ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
