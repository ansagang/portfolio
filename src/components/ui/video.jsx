"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import dynamic from "next/dynamic"
import { Icons } from "@/config/icons"
import { getProjectMedia } from "@/actions/actions"

const ReactPlayer = dynamic(() => import("react-player/file"), { ssr: false })

const Video = forwardRef(function Video(
  { className = "", src, interactive = true, ...props },
  ref
) {
  const playerRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  // Fetch public URL from Supabase storage
  useEffect(() => {
    let cancelled = false

    async function fetchUrl() {
      if (!src) {
        setVideoUrl(null)
        return
      }

      try {
        const { data } = await getProjectMedia(src)
        if (!cancelled && data) {
          setVideoUrl(data)
        }
      } catch {
        if (!cancelled) setVideoUrl(null)
      }
    }

    fetchUrl()

    return () => {
      cancelled = true
    }
  }, [src])

  // Imperative API for parent components
  useImperativeHandle(ref, () => ({
    play() {
      setPlaying(true)
    },
    pause() {
      setPlaying(false)
    },
    toggle() {
      setPlaying((p) => !p)
    },
    load() {
      const internal = playerRef.current?.getInternalPlayer()
      if (internal) internal.load()
    },
    get element() {
      return playerRef.current?.getInternalPlayer() || null
    },
    set currentTime(t) {
      playerRef.current?.seekTo(t, "seconds")
    },
  }))

  // Interactive mode: click to toggle play/pause
  const handleClick = useCallback(() => {
    if (!interactive) return
    setPlaying((p) => !p)
  }, [interactive])

  // Non-interactive mode: hover to play
  const handleMouseEnter = useCallback(() => {
    if (interactive || !videoUrl) return
    setPlaying(true)
  }, [interactive, videoUrl])

  // Non-interactive mode: mouse leave to pause & reset
  const handleMouseLeave = useCallback(() => {
    if (interactive) return
    setPlaying(false)
    playerRef.current?.seekTo(0, "seconds")
  }, [interactive])

  const paused = !playing

  return (
    <div
      className={className}
      onClick={interactive ? handleClick : undefined}
      onMouseEnter={!interactive ? handleMouseEnter : undefined}
      onMouseLeave={!interactive ? handleMouseLeave : undefined}
    >
      <div className={`video ${loading ? "loading" : ""} ${interactive && paused ? "paused" : ""}`}>
        {videoUrl && (
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            url={videoUrl}
            playing={playing}
            loop={interactive}
            muted
            playsInline
            width="100%"
            height="100%"
            onReady={() => setLoading(false)}
            onBuffer={() => setLoading(true)}
            onBufferEnd={() => setLoading(false)}
            config={{
              file: {
                attributes: {
                  preload: "metadata",
                },
              },
            }}
            {...props}
          />
        )}

        {interactive && loading && <div className="video__loading" />}
        {interactive && !loading && paused && (
          <div className="video__paused">
            <Icons.play />
          </div>
        )}
      </div>
    </div>
  )
})

export default Video
