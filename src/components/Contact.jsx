import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Send, Github, Linkedin, Instagram, Phone, MapPin, ArrowUpRight, MessageSquare, Copy, Check } from 'lucide-react'
import Magnetic from './Magnetic'

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

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('sahilvijaysingh15@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/mkoowevb', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSucceeded(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        const data = await res.json()
        alert(data?.error || 'Failed to send message')
      }
    } catch {
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sahilvijaysingh15@gmail.com',
      href: 'mailto:sahilvijaysingh15@gmail.com',
      color: 'text-neon-blue',
      bg: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7061517370',
      href: 'tel:+917061517370',
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Greater Noida, UP — India',
      href: null,
      color: 'text-neon-pink',
      bg: 'bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/40',
    },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/SahilVijaySingh28', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sahil-vijay-singh-897242285/', label: 'LinkedIn' },
    { icon: LeetCode, href: 'https://leetcode.com/u/sahilvijaysingh/', label: 'LeetCode' },
    { icon: Instagram, href: 'https://www.instagram.com/sahilinsomniac/', label: 'Instagram' },
    { icon: Mail, href: 'mailto:sahilvijaysingh15@gmail.com', label: 'Email' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' } },
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-black border-t border-gray-900">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-pink/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/60 text-gray-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Available for Internships
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-5 text-white leading-none">
              Get In <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">Touch.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto font-medium">
              Have a project in mind or want to collaborate? Drop me a message — I reply fast.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              <Magnetic strength={0.2}>
                <div
                  className="flex items-center gap-4 p-5 rounded-2xl border bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group cursor-pointer"
                  onClick={copyEmail}
                >
                  <div className="shrink-0 p-3 rounded-xl bg-black/40">
                    <Mail className="text-neon-blue w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-white font-semibold text-sm truncate">sahilvijaysingh15@gmail.com</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {copied ? (
                      <span className="flex items-center gap-1 text-green-400 text-xs font-bold"><Check size={14}/> Copied!</span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-500 group-hover:text-gray-300 text-xs transition-colors"><Copy size={14}/> Copy</span>
                    )}
                  </div>
                </div>
              </Magnetic>

              {contactItems.filter(i => i.label !== 'Email').map((item) => {
                const Icon = item.icon
                const content = (
                  <div className={`flex items-center gap-4 p-5 rounded-2xl border ${item.bg} transition-all duration-300 group`}>
                    <div className="shrink-0 p-3 rounded-xl bg-black/40">
                      <Icon className={`${item.color} w-5 h-5`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-white font-semibold text-sm truncate">{item.value}</p>
                    </div>
                    {item.href && <ArrowUpRight className="text-gray-600 group-hover:text-white ml-auto shrink-0 transition-colors duration-200" size={16} />}
                  </div>
                )
                return item.href ? (
                  <Magnetic key={item.label} strength={0.2}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                      {content}
                    </a>
                  </Magnetic>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}

              <div className="pt-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Find me on</p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => {
                    const Icon = s.icon
                    return (
                      <Magnetic key={s.label} strength={0.4}>
                        <a
                          href={s.href}
                          target={s.href.startsWith('mailto:') ? '_self' : '_blank'}
                          rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          aria-label={s.label}
                          className="flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 group w-20"
                        >
                          <Icon className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                          <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-300 uppercase tracking-wide transition-colors">{s.label}</span>
                        </a>
                      </Magnetic>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="relative rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-8 md:p-10 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                {succeeded ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
                      <MessageSquare className="text-green-400 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-400">I'll get back to you within 24–48 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Sahil Singh"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 font-medium focus:outline-none focus:border-neon-blue focus:bg-neon-blue/5 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 font-medium focus:outline-none focus:border-neon-pink focus:bg-neon-pink/5 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-300">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell me about your project..."
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 font-medium focus:outline-none focus:border-neon-purple focus:bg-neon-purple/5 transition-all duration-200 resize-none"
                      ></textarea>
                    </div>
                    <Magnetic strength={0.15}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span className="relative z-10 tracking-widest uppercase text-sm">Send Message</span>
                            <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
