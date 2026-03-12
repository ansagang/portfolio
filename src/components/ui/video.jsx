"use client"

import { useEffect, useRef, useState } from "react"
import { Icons } from "@/config/icons"
import Image from "next/image"

export default function Video({ videoUrl, bannerUrl, className = "", interactive = true, ...props }) {
    const videoRef = useRef(null)
    const bannerRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [paused, setPaused] = useState(true)

    useEffect(() => {
        if (!videoRef.current) return
        if (paused) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
    }, [paused])

    const handleClick = () => {
        setPaused(p => !p)
        if (bannerUrl) {
            if (paused) {
                if (bannerRef.current) bannerRef.current.style.display = 'none'
            } else {
                if (bannerRef.current) bannerRef.current.style.display = ''
            }
        }
    }

    const handleMouseEnter = () => {
        if (videoUrl) videoRef.current?.play()
        if (bannerUrl && bannerRef.current) bannerRef.current.style.opacity = 0
    }
    const handleMouseLeave = () => {
        if (videoUrl && videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.pause()
        }
        if (bannerUrl && bannerRef.current) bannerRef.current.style.opacity = 1
    }

    const videoClassName = [
        "video",
        loading && "loading",
        interactive && paused && "paused",
    ].filter(Boolean).join(" ")

    return (
        <div
            onMouseEnter={interactive ? null : handleMouseEnter}
            onMouseLeave={interactive ? null : handleMouseLeave} onClick={interactive ? handleClick : undefined} className={className}>
            <video
                ref={videoRef}
                className={videoClassName}
                src={videoUrl}
                preload="auto"
                playsInline
                muted
                loop={interactive}
                onLoadStart={() => setLoading(true)}
                onLoadedData={() => setLoading(false)}
                {...props}
            />
            {interactive && loading && <div className="video__loading" />}
            {interactive && !loading && paused && (
                <div className="video__paused">
                    <Icons.play />
                </div>
            )}
            {bannerUrl ?
                <Image ref={bannerRef} className="video__banner" alt={"Banner"} width={1} height={1} unoptimized src={bannerUrl} />
                :
                null
            }
        </div>
    )
}
