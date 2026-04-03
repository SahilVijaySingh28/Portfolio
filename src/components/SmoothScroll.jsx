import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

/**
 * SmoothScroll component using Lenis
 * Provides inertial scrolling for a premium desktop feel
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // RAF loop for Lenis
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle scroll-to-hash internally if needed
    const handleHashScroll = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          lenis.scrollTo(element, { offset: 0, duration: 2 })
        }
      }
    }

    // Connect with global window for external access if needed
    window.lenis = lenis

    return () => {
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  // Scroll to top or specific hash on route change
  useEffect(() => {
    if (lenisRef.current) {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          lenisRef.current.scrollTo(element, { offset: 0, duration: 1.5 })
        }
      } else {
        lenisRef.current.scrollTo(0, { duration: 1, immediate: true })
      }
    }
  }, [location.pathname])

  return <>{children}</>
}

export default SmoothScroll
