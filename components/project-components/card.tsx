"use client"
//
import { useState, useRef, useEffect } from "react"
import { Heart, Share2, MessageCircle, Bookmark, MoreHorizontal, Eye } from "lucide-react"
import { gsap } from "gsap"

export default function DemoCard() {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likes, setLikes] = useState(42)
  const [views, setViews] = useState(1247)
  const [comments] = useState(12)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    if (!card || !image) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(image, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleLike = () => {
    setLiked(!liked)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))

    // Animate heart
    gsap.fromTo(
      ".heart-icon",
      { scale: 1 },
      {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
    )
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    gsap.fromTo(
      ".bookmark-icon",
      { scale: 1, rotation: 0 },
      {
        scale: 1.2,
        rotation: 360,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
    )
  }

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform-gpu cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={imageRef}
        className="h-24 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              bookmarked ? "bg-yellow-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Bookmark className="bookmark-icon" size={14} fill={bookmarked ? "currentColor" : "none"} />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all">
            <MoreHorizontal size={14} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-white text-xs">
          <Eye size={12} />
          <span>{views.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-0">Interactive Card</h3>
            <p className="text-gray-600 text-sm">Advanced hover effects with 3D transforms and smooth animations</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-all ${
                liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
            >
              <Heart className="heart-icon" size={16} fill={liked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm font-medium">{comments}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-green-500 transition-colors transform hover:scale-110">
            <Share2 size={16} />
          </button>
        </div>

        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Created by John Doe • 2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
