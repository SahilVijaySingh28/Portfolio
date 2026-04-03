import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom animated cursor component
 * Optimized with useMotionValue to avoid state-driven re-renders on every mouse move
 */
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Use MotionValues for high-performance updates outside of React's render cycle
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for the cursor elements
  const springConfig = { stiffness: 400, damping: 28, mass: 0.2 }
  const mainX = useSpring(mouseX, springConfig)
  const mainY = useSpring(mouseY, springConfig)
  
  const innerSpringConfig = { stiffness: 800, damping: 35 }
  const innerX = useSpring(mouseX, innerSpringConfig)
  const innerY = useSpring(mouseY, innerSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)

    // Using a more efficient way to track interactive elements
    const updateInteractivity = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, .interactive')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    updateInteractivity()
    
    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver(updateInteractivity)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full border border-neon-blue/40 pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: mainX,
          y: mainY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? '#fff' : 'rgba(0, 240, 255, 0.4)',
          borderWidth: isHovering ? '2px' : '1px',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 240, 255, 0)'
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-blue pointer-events-none z-[101] mix-blend-screen shadow-[0_0_15px_#00f0ff]"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
      
      {/* Ambient Glow */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-32 h-32 rounded-full bg-neon-blue/5 pointer-events-none z-[99] blur-3xl"
        style={{
          x: mainX,
          y: mainY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}

export default CustomCursor
