"use client"
//
import { useState, useRef, useEffect } from "react"
import { Send, Smile, Paperclip, Phone, Video, MoreVertical } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type: "text" | "image" | "file"
}

export default function DemoChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How can I help you today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: 2,
      text: "I'm looking for help with my project",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
    {
      id: 3,
      text: "I'd be happy to help! What kind of project are you working on?",
      sender: "bot",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers] = useState(["Alice", "Bob", "Charlie"])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's interesting! Tell me more.",
        "I understand. Let me help you with that.",
        "Great question! Here's what I think...",
        "That sounds like a fun project!",
        "I can definitely help you with that.",
      ]

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="bg-white rounded-lg h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">AI</span>
          </div>
          <div>
            <div className="font-semibold text-sm">AI Assistant</div>
            <div className="text-xs opacity-80">Online</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="hover:bg-blue-700 p-1 rounded">
            <Phone size={16} />
          </button>
          <button className="hover:bg-blue-700 p-1 rounded">
            <Video size={16} />
          </button>
          <button className="hover:bg-blue-700 p-1 rounded">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Online Users */}
      <div className="px-3 py-1 bg-gray-50 border-t">
        <div className="flex items-center space-x-2">
          <div className="text-xs text-gray-500">Online:</div>
          <div className="flex space-x-1">
            {onlineUsers.map((user, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-green-400 rounded-full text-xs flex items-center justify-center text-white font-bold"
              >
                {user[0]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-gray-50">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <Smile size={18} />
          </button>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
