"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Track {
  id: number
  title: string
  artist: string
  duration: string
  url: string
  waveform: number[]
}

interface AudioPlayerProps {
  tracks: Track[]
  autoPlay?: boolean
}

export default function AudioPlayer({ tracks, autoPlay = false }: AudioPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const waveformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", nextTrack)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", nextTrack)
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  useEffect(() => {
    // Animate waveform
    if (waveformRef.current && tracks[currentTrack]?.waveform) {
      const bars = waveformRef.current.children
      const waveform = tracks[currentTrack].waveform

      Array.from(bars).forEach((bar, index) => {
        const height = waveform[index] || 0
        gsap.to(bar, {
          height: `${height}%`,
          duration: 0.5,
          delay: index * 0.02,
          ease: "power2.out",
        })
      })
    }
  }, [currentTrack, tracks])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    audioRef.current.currentTime = newTime
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const currentTrackData = tracks[currentTrack]

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
      <audio ref={audioRef} src={currentTrackData?.url} preload="metadata" />

      {/* Waveform Visualization */}
      <div ref={waveformRef} className="flex items-end justify-center h-20 mb-6 space-x-1">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className={`w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-300 ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{ height: "20%" }}
          />
        ))}
      </div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-1">{currentTrackData?.title}</h3>
        <p className="text-gray-300">{currentTrackData?.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div
          ref={progressRef}
          className="w-full h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button size="icon" variant="ghost" onClick={prevTrack} className="text-white hover:text-purple-400">
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          size="icon"
          onClick={togglePlay}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </Button>

        <Button size="icon" variant="ghost" onClick={nextTrack} className="text-white hover:text-purple-400">
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsMuted(!isMuted)}
          className="text-white hover:text-purple-400"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume * 100]}
          onValueChange={(value) => setVolume(value[0] / 100)}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>

      {/* Track List */}
      <div className="mt-6 space-y-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => setCurrentTrack(index)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              index === currentTrack ? "bg-purple-500/20 border border-purple-500/30" : "hover:bg-gray-800/50"
            }`}
          >
            <div>
              <p className="text-white font-medium">{track.title}</p>
              <p className="text-gray-400 text-sm">{track.artist}</p>
            </div>
            <span className="text-gray-400 text-sm">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
