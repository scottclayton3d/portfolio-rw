"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navItems = [
  {
    name: "Web Development",
    href: "/web-development",
    number: "01",
    preview: {
      title: "Web Development",
      description: "Modern web applications & experiences",
      video: "/videos/web-dev-preview.mp4",
      poster: "/placeholder.svg?height=1080&width=1920",
    },
  },
  {
    name: "Architectural Visualization",
    href: "/architectural-visualization",
    number: "02",
    preview: {
      title: "Architectural Visualization",
      description: "3D architectural renders & walkthroughs",
      video: "/videos/archviz-preview.mp4",
      poster: "/placeholder.svg?height=1080&width=1920",
    },
  },
  {
    name: "Prop Artist",
    href: "/prop-artist",
    number: "03",
    preview: {
      title: "Prop Artist",
      description: "3D props & asset creation",
      video: "/videos/props-preview.mp4",
      poster: "/placeholder.svg?height=1080&width=1920",
    },
  },
  {
    name: "Pipeline / Tool Development",
    href: "/pipeline-tools",
    number: "04",
    preview: {
      title: "Pipeline & Tools",
      description: "Custom tools & workflow automation",
      video: "/videos/pipeline-preview.mp4",
      poster: "/placeholder.svg?height=1080&width=1920",
    },
  },
]

const additionalLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

function VideoPreview({ preview, isActive }: { preview: any; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.currentTime = 0
      video
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={preview.poster}
        muted
        loop
        playsInline
        onLoadedData={handleLoadedData}
        style={{ filter: "brightness(0.7) contrast(1.1)" }}
      >
        <source src={preview.video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="absolute top-8 right-8 bg-black/50 backdrop-blur-sm rounded-full p-3"
      >
        {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white ml-0.5" />}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-cyan-500 origin-left"
      />
    </motion.div>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setHoveredItem(null)
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold tracking-tight cursor-pointer">
              STUDIO
            </motion.div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 hover:bg-white/10"
          >
            <motion.div animate={isOpen ? "open" : "closed"} className="relative">
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 0 },
                }}
                className="absolute block h-0.5 w-6 bg-current transform transition-all duration-300"
                style={{ top: "-2px" }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="absolute block h-0.5 w-6 bg-current transform transition-all duration-300"
                style={{ top: "2px" }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: 0 },
                }}
                className="absolute block h-0.5 w-6 bg-current transform transition-all duration-300"
                style={{ top: "6px" }}
              />
            </motion.div>
          </Button>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-black overflow-hidden"
          >
            {/* Video Background Previews */}
            <div className="absolute inset-0">
              {navItems.map((item) => (
                <AnimatePresence key={item.name}>
                  {hoveredItem === item.name && (
                    <VideoPreview preview={item.preview} isActive={hoveredItem === item.name} />
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Default Background */}
            {!hoveredItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
              </motion.div>
            )}

            {/* Preview Content */}
            <AnimatePresence>
              {hoveredItem && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-20 left-20 z-30"
                >
                  <div className="text-white backdrop-blur-sm bg-black/30 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">
                      {navItems.find((item) => item.name === hoveredItem)?.preview.title}
                    </h3>
                    <p className="text-lg text-white/80">
                      {navItems.find((item) => item.name === hoveredItem)?.preview.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Content */}
            <div className="flex items-center justify-center min-h-screen relative z-20">
              <nav className="text-center">
                {/* Main Portfolio Categories */}
                <div className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-sm text-gray-400 uppercase tracking-widest mb-8"
                  >
                    Portfolio
                  </motion.h2>
                  <ul className="space-y-6">
                    {navItems.map((item, i) => (
                      <motion.li
                        key={item.name}
                        custom={i}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link href={item.href}>
                          <a
                            onClick={() => setIsOpen(false)}
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="group flex items-center justify-center space-x-4 hover:text-white transition-all duration-500 relative"
                          >
                            <span className="text-sm text-gray-400 font-mono group-hover:text-white/80 transition-colors">
                              {item.number}
                            </span>
                            <motion.span
                              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight backdrop-blur-sm"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                            >
                              {item.name}
                            </motion.span>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowUpRight className="h-6 w-6 drop-shadow-lg" />
                            </motion.div>
                          </a>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Additional Links */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="pt-8 border-t border-gray-700/50 backdrop-blur-sm"
                >
                  <div className="flex justify-center space-x-8 mb-6">
                    {additionalLinks.map((link) => (
                      <Link key={link.name} href={link.href}>
                        <a
                          onClick={() => setIsOpen(false)}
                          className="text-gray-300 hover:text-white transition-colors text-lg"
                        >
                          {link.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Ready to create something amazing?</p>
                  <Link href="/contact">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="bg-gradient-to-r from-orange-500 to-cyan-500 hover:from-orange-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full shadow-lg"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
