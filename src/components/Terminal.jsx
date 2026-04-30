import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X } from 'lucide-react'

const WORD_LIST = [
  'REACT', 'MONGO', 'LINUX', 'REDUX', 'VITES',
  'CACHE', 'DEBUG', 'PROXY', 'ARRAY', 'INDEX',
  'QUERY', 'FETCH', 'STATE', 'CLASS', 'BUILD',
]

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([]) // arrow-key nav history
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [systemTheme, setSystemTheme] = useState('default')
  const [history, setHistory] = useState([
    { type: 'system', text: '╔══════════════════════════════════════╗' },
    { type: 'system', text: '║     SAHIL OS v2.0 — VISITOR SHELL    ║' },
    { type: 'system', text: '╚══════════════════════════════════════╝' },
    { type: 'output', text: 'Type "help" to see available commands.' },
    { type: 'output', text: 'Press ` (backtick) or click Terminal to toggle.' },
    { type: 'output', text: '' },
  ])
  const [gameState, setGameState] = useState({
    active: false,
    words: [],
    targetWord: '',
    attempts: 5,
  })

  const inputRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '`' || e.key === '~') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    const handleToggle = () => setIsOpen((prev) => !prev)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('toggle-terminal', handleToggle)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('toggle-terminal', handleToggle)
    }
  }, [])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
  }, [isOpen])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isOpen])

  const push = (lines) => {
    const entries = Array.isArray(lines) ? lines : [lines]
    setHistory((prev) => [...prev, ...entries])
  }

  const handleCommand = (cmd) => {
    const raw = cmd.trim()
    if (!raw) return

    const trimmed = raw.toLowerCase()

    // Save to command history for arrow-key nav
    setCmdHistory((prev) => [raw, ...prev.slice(0, 49)])
    setHistoryIndex(-1)

    push({ type: 'input', text: `${gameState.active ? 'guest@mainframe' : 'visitor@portfolio'}:~$ ${raw}` })

    // — GAME STATE COMMANDS —
    if (gameState.active) {
      if (trimmed === 'quit' || trimmed === 'exit' || trimmed === 'abort') {
        setGameState({ active: false, words: [], targetWord: '', attempts: 5 })
        push({ type: 'warn', text: '> Connection to mainframe terminated.' })
        setInput('')
        return
      }

      const guess = raw.toUpperCase()
      if (!gameState.words.includes(guess)) {
        push({ type: 'error', text: `> ERROR: "${guess}" is not a valid password hash. Select from the list above.` })
        setInput('')
        return
      }

      let matchCount = 0
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === gameState.targetWord[i]) matchCount++
      }

      if (guess === gameState.targetWord) {
        setGameState({ active: false, words: [], targetWord: '', attempts: 5 })
        push([
          { type: 'success', text: '> ████████████████ OVERRIDE ACCEPTED ████████████████' },
          { type: 'success', text: '> EXACT MATCH. ACCESS GRANTED.' },
          { type: 'success', text: '> Welcome, Administrator. Have a nice day.' },
          { type: 'output', text: '' },
          { type: 'output', text: '(Type "help" to return to normal operations.)' },
        ])
        setInput('')
        return
      }

      const newAttempts = gameState.attempts - 1
      if (newAttempts <= 0) {
        setGameState({ active: false, words: [], targetWord: '', attempts: 5 })
        push([
          { type: 'error', text: `> Likeness: ${matchCount}/${guess.length}` },
          { type: 'error', text: '> ████████████████ TERMINAL LOCKED ████████████████' },
          { type: 'error', text: '> Too many failed attempts. Admin privileges revoked.' },
          { type: 'output', text: '' },
          { type: 'output', text: '(Type "play" to try again.)' },
        ])
        setInput('')
        return
      }

      setGameState((prev) => ({ ...prev, attempts: newAttempts }))
      push([
        { type: 'warn', text: `> Entry denied. Likeness: ${matchCount}/${guess.length}` },
        { type: 'warn', text: `> Attempts remaining: ${newAttempts}` },
      ])
      setInput('')
      return
    }

    // — NORMAL COMMANDS —
    switch (trimmed) {
      case 'help':
        push([
          { type: 'system', text: '┌─ Available Commands ───────────────────┐' },
          { type: 'output', text: '  whoami      Who is Sahil?' },
          { type: 'output', text: '  education   Academic background' },
          { type: 'output', text: '  experience  Internships & hackathons' },
          { type: 'output', text: '  skills      Full tech stack' },
          { type: 'output', text: '  projects    Featured projects' },
          { type: 'output', text: '  contact     Get in touch' },
          {type: 'output', text: '  play        Hack the mainframe 🎮' },
          {type: 'output', text: '  debug       Launch the Bug Game 🐛' },
          {type: 'warn',   text: '  matrix      Override system colors ⚡' },
          {type: 'warn',   text: '  glitch      Induce system instability 🌀' },
          {type: 'success', text: '  reset       Restore default OS state ✅' },
          {type: 'output', text: '  clear        Clear terminal' },
          {type: 'output', text: '  exit         Close terminal' },
          {type: 'system', text: '└────────────────────────────────────────┘' },
        ])
        break

      case 'whoami':
        push([
          { type: 'success', text: '> Sahil Vijay Singh' },
          { type: 'output', text: '  Role    : B.Tech CSE Student & Full Stack Developer' },
          { type: 'output', text: '  Email   : sahilvijaysingh15@gmail.com' },
          { type: 'output', text: '  Phone   : +91 7061517370' },
          { type: 'output', text: '  Based in: Greater Noida, UP — India' },
        ])
        break

      case 'education':
        push([
          { type: 'system', text: '> Education' },
          { type: 'output', text: '  B.Tech CSE  — Sharda University (2023 - Present)' },
          { type: 'success', text: '  CGPA: 8.41 / 10.0' },
          { type: 'output', text: '  Class XII   — Bradford International School (2023)' },
        ])
        break

      case 'hello':
        push([
          { type: 'output', text: ' Hello welcome to my Portolio' },
          { type: 'output', text: ' Good to have you' },
          { type: 'system', text: ' Type help to see all the available commands'},
        ])
        break

      case 'experience':
        push([
          { type: 'system', text: '> Experience' },
          { type: 'output', text: '  [2025] Full Stack Bootcamp Trainee (MERN Stack)' },
          { type: 'output', text: '  [2025] Smart India Hackathon — Internal Finalist' },
          { type: 'output', text: '  [2024] 6th Technovation Hackathon — IoT Prototype' },
          { type: 'output', text: '  [2024] Java Core Foundation Cert — Oracle' },
          { type: 'output', text: '  [2024] Full Stack Bootcamp — Udemy' },
        ])
        break

      case 'skills':
        push([
          { type: 'system', text: '> Tech Stack' },
          { type: 'output', text: '  Languages  : C++, Java, Python, C, HTML, CSS, JS' },
          { type: 'output', text: '  Frontend   : React, Tailwind CSS' },
          { type: 'output', text: '  Backend    : Node.js, Express.js, REST APIs' },
          { type: 'output', text: '  Database   : MongoDB' },
          { type: 'output', text: '  Data/ML    : NumPy, Pandas, Matplotlib' },
          { type: 'output', text: '  Tools      : Git, GitHub, VS Code, Jupyter' },
          { type: 'success', text: '  DSA        : 300+ problems on LeetCode' },
        ])
        break

      case 'projects':
        push([
          { type: 'system', text: '> Featured Projects' },
          { type: 'success', text: '  ★ PeerIQ — P2P Academic Collaboration Platform (MERN)' },
          { type: 'output', text: '  ★ Peddify — Pet Adoption Website (MERN)' },
          { type: 'output', text: '  ★ SafeDrive — IoT Accident Detection (ESP32)' },
          { type: 'output', text: '' },
          { type: 'output', text: '  (Scroll the page for detailed project showcases)' },
        ])
        break

      case 'contact':
        push([
          { type: 'system', text: '> Contact' },
          { type: 'output', text: '  Email    : sahilvijaysingh15@gmail.com' },
          { type: 'output', text: '  LinkedIn : linkedin.com/in/sahil-vijay-singh-897242285' },
          { type: 'output', text: '  GitHub   : github.com/SahilVijaySingh28' },
          { type: 'output', text: '  LeetCode : leetcode.com/u/sahilvijaysingh' },
          { type: 'output', text: '  Instagram: @sahilinsomniac' },
        ])
        break

      case 'debug':
        push([
          { type: 'success', text: '> Launching Bug Exterminator Protocol...' },
          { type: 'warn',   text: '> 8 rogue bugs detected. Squash them all before time runs out.' },
        ])
        setTimeout(() => window.dispatchEvent(new Event('launch-bug-game')), 600)
        break

      case 'matrix':
        push([
          { type: 'system', text: '> System Color Override: MATRIX' },
          { type: 'success', text: '> Injecting neural link... Site-wide sync complete.' },
          { type: 'output', text: '(Type "reset" to return to normal operations.)' },
        ])
        setSystemTheme('matrix')
        window.dispatchEvent(new CustomEvent('set-system-theme', { detail: 'matrix' }))
        break

      case 'glitch':
        push([
          { type: 'warn', text: '> System Instability Detected: GLITCH' },
          { type: 'error', text: '> CRITICAL: Visual artifacts emerging in the rendering engine.' },
          { type: 'output', text: '(Type "reset" to return to normal operations.)' },
        ])
        setSystemTheme('glitch')
        window.dispatchEvent(new CustomEvent('set-system-theme', { detail: 'glitch' }))
        break

      case 'reset':
        push([
          { type: 'system', text: '> Restore Protocol: DEFAULT' },
          { type: 'output', text: '> System recalibrated. Original palette restored.' },
        ])
        setSystemTheme('default')
        window.dispatchEvent(new CustomEvent('set-system-theme', { detail: 'default' }))
        break

      case 'hack':
        push({ type: 'error', text: '> INITIATING BREACH SEQUENCE...' })
        setTimeout(() => {
          push([
            { type: 'warn', text: '> CONNECTING TO REMOTE_NODE...' },
            { type: 'warn', text: '> BYPASSING FIREWALL... [DONE]' },
            { type: 'system', text: '  [██░░░░░░░░] 20% OVERLOAD' }
          ])
        }, 800)
        setTimeout(() => {
          push([
            { type: 'error', text: '> DEPLOYING PAYLOAD...' },
            { type: 'error', text: '> ATTEMPTING PRIVILEGE ESCALATION...' },
            { type: 'system', text: '  [██████░░░░] 60% OVERLOAD' }
          ])
        }, 1800)
        setTimeout(() => {
          push([
            { type: 'error', text: '> ACCESS GRANTED. ROOT PRIVILEGES ENABLED.' },
            { type: 'system', text: '  [██████████] 100% OVERLOAD' }
          ])
          setSystemTheme('hack')
          window.dispatchEvent(new CustomEvent('set-system-theme', { detail: 'hack' }))
        }, 2800)
        setTimeout(() => {
          push([
            { type: 'success', text: '> SILENT BREACH SUCCESSFUL. STEALTH CHAOS MODE ENABLED.' },
            { type: 'output', text: '(Type "reset" to restore system integrity.)' },
          ])
        }, 3800)
        break

      case 'play': {
        const shuffled = [...WORD_LIST].sort(() => 0.5 - Math.random())
        const selectedWords = shuffled.slice(0, 8)
        const target = selectedWords[Math.floor(Math.random() * selectedWords.length)]
        setGameState({ active: true, words: selectedWords, targetWord: target, attempts: 5 })
        push([
          { type: 'system', text: '╔══════════════════════════════════════╗' },
          { type: 'system', text: '║   ROBCO INDUSTRIES — HACKING MINIGAME  ║' },
          { type: 'system', text: '║         ATTEMPTS REMAINING: 5          ║' },
          { type: 'system', text: '╚══════════════════════════════════════╝' },
          { type: 'output', text: '' },
          { type: 'output', text: '  Crack the 5-letter password hash.' },
          { type: 'warn',   text: '  Letters in correct positions = Likeness count.' },
          { type: 'output', text: '' },
          { type: 'system', text: '  > Password Candidates:' },
          ...selectedWords.map((w) => ({ type: 'output', text: `    ${w}` })),
          { type: 'output', text: '' },
          { type: 'warn',   text: '  Type a word above to guess. Type "abort" to quit.' },
        ])
        break
      }

      case 'clear':
        setHistory([])
        setInput('')
        return

      case 'exit':
      case 'close':
        setIsOpen(false)
        setInput('')
        return

      default:
        push({ type: 'error', text: `> Command not found: "${trimmed}". Type "help" for a list of commands.` })
    }

    setInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCommand(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, cmdHistory.length - 1)
      setHistoryIndex(nextIndex)
      setInput(cmdHistory[nextIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setInput(nextIndex === -1 ? '' : cmdHistory[nextIndex])
    }
  }

  const textColor = (type) => {
    switch (type) {
      case 'input':  return 'text-gray-300'
      case 'success': return 'text-green-400'
      case 'error':  return 'text-red-400'
      case 'warn':   return 'text-yellow-400'
      case 'system': return 'text-neon-blue'
      default:       return 'text-gray-400'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="terminal-container fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[92vw] md:w-[680px] h-[440px] flex flex-col rounded-2xl overflow-hidden border border-gray-700/80 shadow-[0_0_60px_rgba(0,240,255,0.15),0_30px_80px_rgba(0,0,0,0.6)] font-mono"
        >
          {/* macOS-style chrome bar */}
          <div className="shrink-0 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* macOS dots */}
              <div className="flex gap-1.5">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110 transition-all" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-60" />
              </div>
              <div className="ml-3 flex items-center gap-1.5 text-gray-500 text-xs">
                <TerminalIcon size={12} />
                <span>{gameState.active ? 'guest@mainframe: ~' : 'visitor@portfolio: ~'}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-300 transition-colors p-1 rounded"
            >
              <X size={14} />
            </button>
          </div>

          {/* Output area */}
          <div 
            className="flex-1 overflow-y-auto bg-black/95 px-5 py-4 space-y-0.5 text-xs sm:text-sm"
            data-lenis-prevent
          >
            {history.map((item, i) => (
              <div key={i} className={`whitespace-pre-wrap leading-relaxed ${textColor(item.type)}`}>
                {item.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 bg-gray-950 border-t border-gray-800/60 px-5 py-3 flex items-center gap-2"
          >
            <span className="text-neon-blue text-xs sm:text-sm shrink-0 font-bold">
              {gameState.active ? 'guest@mainframe:~$' : (systemTheme === 'hack' ? 'root@compromised:~#' : 'visitor@portfolio:~$')}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm font-mono caret-neon-blue placeholder-gray-700"
              placeholder="enter command..."
              autoComplete="off"
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-[2px] h-4 bg-neon-blue shrink-0"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Terminal
