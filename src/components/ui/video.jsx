"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { Icons } from "@/config/icons"
import { getProjectMedia } from "@/actions/actions"

function withBust(url) {
  if (!url) return url
  const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost")
  u.searchParams.set("__v", String(Date.now()))
  return u.toString()
}

const Video = forwardRef(function Video(
  { className = "", src, interactive = true, ...props },
  ref
) {
  const videoRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [paused, setPaused] = useState(true)
  const [videoUrl, setVideoUrl] = useState(undefined)

  // Used to force-remount the <video> element when needed
  const [mountKey, setMountKey] = useState(0)

  const safePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    const p = el.play()
    if (p && typeof p.catch === "function") p.catch(() => {})
  }, [])

  const forceReloadElement = useCallback(() => {
    // Remount is the most reliable "video source is stuck" fix across browsers
    setMountKey((k) => k + 1)
  }, [])

  const fetchUrl = useCallback(async () => {
    if (!src) {
      setVideoUrl(undefined)
      return
    }

    try {
      const { data } = await getProjectMedia(src)
      // If your URLs can be cached/stale, busting helps.
      // If your URLs are already stable, busting is harmless.
      setVideoUrl(data ? withBust(data) : undefined)
    } catch {
      setVideoUrl(undefined)
    }
  }, [src])

  // Initial + on src change
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      setVideoUrl(undefined)
      await fetchUrl()
      if (!cancelled) forceReloadElement()
    })()

    return () => {
      cancelled = true
    }
  }, [fetchUrl, forceReloadElement])

  // When videoUrl changes, load + respect paused state
  useEffect(() => {
    const el = videoRef.current
    if (!el || !videoUrl) return

    // Ensure the element actually reloads the new source
    el.load()
    if (!paused) safePlay()
    else el.pause()
  }, [videoUrl, paused, safePlay])

  // BIG FIX: on Back/Forward restore + tab visibility restore, refetch URL + remount video
  useEffect(() => {
    const onPageShow = async () => {
      // When coming back, force a fresh URL + fresh <video> element
      await fetchUrl()
      forceReloadElement()
    }

    const onVis = async () => {
      if (document.visibilityState !== "visible") return
      await fetchUrl()
      forceReloadElement()
    }

    window.addEventListener("pageshow", onPageShow)
    document.addEventListener("visibilitychange", onVis)

    return () => {
      window.removeEventListener("pageshow", onPageShow)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [fetchUrl, forceReloadElement])

  // Click / hover behaviors (same as your intent)
  const handleClick = useCallback(() => {
    if (!interactive) return
    setPaused((p) => !p)
  }, [interactive])

  const handleMouseEnter = useCallback(() => {
    if (interactive) return
    if (!videoUrl) return
    safePlay()
  }, [interactive, videoUrl, safePlay])

  const handleMouseLeave = useCallback(() => {
    if (interactive) return
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    el.pause()
  }, [interactive])

  useImperativeHandle(ref, () => ({
    play() {
      setPaused(false)
    },
    pause() {
      setPaused(true)
    },
    toggle() {
      setPaused((p) => !p)
    },
    load() {
      videoRef.current?.load()
    },
    get element() {
      return videoRef.current
    },
    set currentTime(t) {
      if (videoRef.current) videoRef.current.currentTime = t
    },
  }))

  const videoClassName = useMemo(() => {
    return ["video", loading && "loading", interactive && paused && "paused"]
      .filter(Boolean)
      .join(" ")
  }, [loading, interactive, paused])

  return (
    <div
      className={className}
      onClick={interactive ? handleClick : undefined}
      onMouseEnter={!interactive ? handleMouseEnter : undefined}
      onMouseLeave={!interactive ? handleMouseLeave : undefined}
    >
      <video
        key={mountKey}                 // <-- forces a fresh element after back
        ref={videoRef}
        className={videoClassName}
        playsInline
        muted
        loop={interactive}
        preload="metadata"
        onLoadStart={() => setLoading(true)}
        onLoadedData={() => setLoading(false)}
        {...props}
      >
        {videoUrl ? <source src={videoUrl} /> : null}
      </video>

      {interactive && loading && <div className="video__loading" />}
      {interactive && !loading && paused && (
        <div className="video__paused">
          <Icons.play />
        </div>
      )}
    </div>
  )
})

export default Video