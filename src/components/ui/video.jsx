"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Icons } from "@/config/icons"
import { getProjectMedia } from "@/actions/actions"

const Video = forwardRef(function Video({ className = "", src, interactive = true, ...props }, ref) {
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [paused, setPaused] = useState(true)
    const [inView, setInView] = useState(false)

    const [videoUrl, setVideoUrl] = useState()

    useEffect(() => {
        setVideoUrl()
        async function getProjectMediaUrl() {
            const { data: projectVideoUrl } = await getProjectMedia(src)
            if (projectVideoUrl) {
                setVideoUrl(projectVideoUrl)
            }
        }

        getProjectMediaUrl()
    }, [src])

    const handleMouseEnter = () => {
        if (videoUrl) {
            videoRef.current.play()
        }
    }

    const handleMouseLeave = () => {
        if (videoUrl) {
            videoRef.current.currentTime = 0
            videoRef.current.pause()
        }
    }

    useImperativeHandle(ref, () => ({
        play() {
            setPaused(false)
        },
        pause() {
            setPaused(true)
        },
        toggle() {
            setPaused(p => !p)
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

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "200px" }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!videoRef.current || !inView) return

        if (paused) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
    }, [paused, inView])

    useEffect(() => {
        if (videoRef.current && src) {
            videoRef.current.load()
        }
    }, [src])

    const handleClick = useCallback(() => {
        setPaused(p => !p)
    }, [])

    const videoClassName = [
        "video",
        loading && "loading",
        interactive && paused && "paused",
    ].filter(Boolean).join(" ")

    return (
        <div ref={containerRef} onClick={interactive ? handleClick : undefined} className={className}>
            {inView && (
                <video
                    ref={videoRef}
                    className={videoClassName}
                    src={videoUrl}
                    playsInline
                    muted
                    loop={interactive}
                    onLoadStart={() => setLoading(true)}
                    onLoadedData={() => {
                        setLoading(false)
                        if (!paused) videoRef.current?.play()
                    }}
                    onMouseEnter={interactive ? null : handleMouseEnter}
                    onMouseLeave={interactive ? null : handleMouseLeave}
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
    )
})

export default Video
