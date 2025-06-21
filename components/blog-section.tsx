"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const blogPosts = [
  {
    id: 1,
    title: "The Future of WebGL in Creative Development",
    excerpt: "Exploring how WebGL is revolutionizing interactive web experiences and what's coming next.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Web Development",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Building Virtual Instruments with JUCE",
    excerpt: "A deep dive into audio programming and creating professional-grade virtual instruments.",
    date: "2024-01-08",
    readTime: "8 min read",
    category: "Audio Programming",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Advanced Blender Addon Development",
    excerpt: "Tips and techniques for creating powerful Blender addons that enhance your 3D workflow.",
    date: "2024-01-01",
    readTime: "6 min read",
    category: "3D Development",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

        gsap.fromTo(
          gridRef.current?.children || [],
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.3, ease: "power3.out" },
        )
      },
    })
  }, [])

  return (
    <section id="blog" ref={sectionRef} className="section min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            INSIGHTS
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my creative journey
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                    {post.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  {post.readTime}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors duration-300">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
