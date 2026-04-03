import { Github, Linkedin, Instagram, Mail, ArrowUp, Bug, Code2 } from 'lucide-react'

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

const Footer = ({ onDebugClick }) => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/SahilVijaySingh28', label: 'GitHub', hoverColor: 'hover:text-white hover:border-white/30' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sahil-vijay-singh-897242285/', label: 'LinkedIn', hoverColor: 'hover:text-blue-400 hover:border-blue-400/30' },
    { icon: LeetCode, href: 'https://leetcode.com/u/sahilvijaysingh/', label: 'LeetCode', hoverColor: 'hover:text-orange-400 hover:border-orange-400/30' },
    { icon: Instagram, href: 'https://www.instagram.com/sahilinsomniac/', label: 'Instagram', hoverColor: 'hover:text-pink-400 hover:border-pink-400/30' },
    { icon: Mail, href: 'mailto:sahilvijaysingh15@gmail.com', label: 'Email', hoverColor: 'hover:text-neon-blue hover:border-neon-blue/30' },
  ]

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gray-600/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-900 border border-gray-800">
                <Code2 className="text-neon-blue w-5 h-5" />
              </div>
              <span className="text-white font-black text-xl tracking-tight">Sahil<span className="text-neon-blue">.dev</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Computer Science undergraduate passionate about engineering scalable applications and solving complex problems with clean code.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs text-gray-500 font-medium">Available for Internships</span>
            </div>
          </div>

          {/* Col 2: Nav Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 gap-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 hover:translate-x-0.5 transform inline-block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Socials + Email */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon
                const isEmail = s.href.startsWith('mailto:')
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    aria-label={s.label}
                    className={`p-3 rounded-xl border border-gray-800 bg-gray-900/40 text-gray-500 transition-all duration-200 ${s.hoverColor}`}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
            <a
              href="mailto:sahilvijaysingh15@gmail.com"
              className="text-gray-500 hover:text-neon-blue transition-colors text-sm font-mono tracking-tight mt-1"
            >
              sahilvijaysingh15@gmail.com
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-xs tracking-wide">
              © {currentYear} Sahil Vijay Singh. All rights reserved.
            </span>
            <button
              onClick={onDebugClick}
              title="Psst... click me 🐛"
              className="group flex items-center gap-1.5 text-gray-700 hover:text-neon-purple transition-colors p-1 rounded"
              aria-label="Launch Bug Game"
            >
              <Bug size={28} className="group-hover:animate-bounce" />
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neon-purple">Debug Mode</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
          >
            <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors tracking-widest uppercase">Back to Top</span>
            <div className="p-1 rounded-lg bg-gray-800 group-hover:bg-neon-blue/20 transition-colors">
              <ArrowUp size={12} className="text-gray-400 group-hover:text-neon-blue group-hover:-translate-y-0.5 transition-all" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer
