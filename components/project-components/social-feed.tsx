"use client"
//
import { useState } from "react"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  bookmarked: boolean
}

export default function DemoSocialFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "SJ",
        verified: true,
      },
      content: "Just finished building an amazing React component library! The developer experience is incredible. 🚀",
      timestamp: "2h",
      likes: 124,
      comments: 18,
      shares: 7,
      liked: false,
      bookmarked: false,
    },
    {
      id: 2,
      author: {
        name: "Alex Chen",
        avatar: "AC",
        verified: false,
      },
      content: "Working on a new design system. Here's a sneak peek at our color palette and typography choices.",
      image: "/placeholder.svg?height=200&width=300",
      timestamp: "4h",
      likes: 89,
      comments: 12,
      shares: 3,
      liked: true,
      bookmarked: false,
    },
    {
      id: 3,
      author: {
        name: "Maria Garcia",
        avatar: "MG",
        verified: true,
      },
      content:
        "Tips for better code reviews: 1) Be constructive 2) Ask questions 3) Suggest improvements 4) Celebrate good code! What are your tips?",
      timestamp: "6h",
      likes: 256,
      comments: 34,
      shares: 15,
      liked: false,
      bookmarked: true,
    },
  ])

  const [newPost, setNewPost] = useState("")

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const toggleBookmark = (postId: number) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)))
  }

  const addPost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "YU",
        verified: false,
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      bookmarked: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost("")
  }

  return (
    <div className="bg-gray-50 rounded-lg h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Social Feed</h3>
      </div>

      {/* New Post */}
      <div className="bg-white p-3 border-b border-gray-200">
        <div className="flex space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            YU
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={addPost}
                disabled={!newPost.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-1 rounded-lg text-sm transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border-b border-gray-200 p-3">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {post.author.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm text-gray-800">{post.author.name}</span>
                    {post.author.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{post.timestamp}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <p className="text-sm text-gray-800 mb-2">{post.content}</p>
              {post.image && (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post content"
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-1 transition-colors ${
                    post.liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart size={16} fill={post.liked ? "currentColor" : "none"} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle size={16} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 size={16} />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
              <button
                onClick={() => toggleBookmark(post.id)}
                className={`transition-colors ${
                  post.bookmarked ? "text-yellow-500" : "text-gray-500 hover:text-yellow-500"
                }`}
              >
                <Bookmark size={16} fill={post.bookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
