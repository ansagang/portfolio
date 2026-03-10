"use client"

import { useEffect, useRef, useState } from "react"
import { Icons } from "@/config/icons"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import useInView from "@/hooks/use-in-view"
import useIsMobile from "@/hooks/use-is-mobile"

export default function Video({ className = "", src, interactive = true, ...props }) {
    const videoRef = useRef(null)
    const bannerRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [paused, setPaused] = useState(true)
    const [videoUrl, setVideoUrl] = useState()
    const [bannerUrl, setBannerUrl] = useState()
    const [viewRef, inView] = useInView(true, 0.5, '0px 0px -200px 0px')
    const pathname = usePathname()
    const isMobile = useIsMobile(615)

    useEffect(() => {
        async function getProjectMediaUrl() {
            const supabase = createClient()
            const { data: video } = supabase.storage.from('portfolio').getPublicUrl('projects/' + src.video)

            if (video) {
                setVideoUrl(video.publicUrl)
            }
            if (src.banner) {
                const { data: banner } = supabase.storage.from('portfolio').getPublicUrl('projects/' + src.banner)
                setBannerUrl(banner.publicUrl)
            }
        }
        getProjectMediaUrl()

    }, [src, pathname])

    useEffect(() => {
        if (videoRef.current && videoUrl) {
            videoRef.current.load()
        }
    }, [videoUrl])

    useEffect(() => {
        if (videoRef.current && bannerUrl) {
            videoRef.current.poster = bannerUrl
        }
    }, [bannerUrl])

    useEffect(() => {
        if (isMobile) {
            if (inView) {
                if (videoUrl) videoRef.current?.play()
                if (bannerUrl) bannerRef.current.style.opacity = 0
            } else {
                if (videoUrl && videoRef.current) {
                    videoRef.current.currentTime = 0
                    videoRef.current.pause()
                }
                if (bannerUrl) bannerRef.current.style.opacity = 1
            }
        }

    }, [inView])

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
                bannerRef.current.style.display = 'none'
            }
        }
    }

    const handleMouseEnter = () => {
        if (videoUrl) videoRef.current?.play()
        if (bannerUrl) bannerRef.current.style.opacity = 0
    }
    const handleMouseLeave = () => {
        if (videoUrl && videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.pause()
        }
        if (bannerUrl) bannerRef.current.style.opacity = 1
    }

    const videoClassName = [
        "video",
        loading && "loading",
        interactive && paused && "paused",
    ].filter(Boolean).join(" ")



    return (
        <div
            onMouseEnter={interactive ? null : isMobile ? null : handleMouseEnter}
            onMouseLeave={interactive ? null : isMobile ? null : handleMouseLeave} ref={viewRef} onClick={interactive ? handleClick : undefined} className={className}>
            <video
                ref={videoRef}
                className={videoClassName}
                src={videoUrl}
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
            {bannerUrl &&
                <Image ref={bannerRef} className="video__banner" alt={src.title} width={1} height={1} unoptimized src={bannerUrl} />
            }
        </div>
    )
}
