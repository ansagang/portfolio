"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Icons } from "@/config/icons"
import { getProjectMedia } from "@/actions/actions"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function Video({ className = "", src, interactive = true, ...props }) {
    const videoRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [paused, setPaused] = useState(true)
    const [videoUrl, setVideoUrl] = useState()
    const pathname = usePathname()

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
        }
        async function getProjectMediaUrl() {
            const supabase = createClient()
            const { data } = supabase.storage.from('portfolio').getPublicUrl('projects/' + src)

            if (data) {
                setVideoUrl(data.publicUrl)
            }
        }
        getProjectMediaUrl()
        console.log(videoUrl);


    }, [src, pathname])

    useEffect(() => {
        const onPageShow = (e) => {
            if (e.persisted && videoRef.current) {
                videoRef.current.load()
            }
        }
        window.addEventListener("pageshow", onPageShow)
        return () => window.removeEventListener("pageshow", onPageShow)
    }, [])

    useEffect(() => {
        if (!videoRef.current) return
        if (paused) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
    }, [paused])

    const handleClick = () => setPaused(p => !p)

    const handleMouseEnter = () => {
        if (videoUrl) videoRef.current?.play()
    }

    const handleMouseLeave = () => {
        if (videoUrl && videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.pause()
        }
    }

    const videoClassName = [
        "video",
        loading && "loading",
        interactive && paused && "paused",
    ].filter(Boolean).join(" ")



    return (
        <div onClick={interactive ? handleClick : undefined} className={className}>
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
            {interactive && loading && <div className="video__loading" />}
            {interactive && !loading && paused && (
                <div className="video__paused">
                    <Icons.play />
                </div>
            )}
        </div>
    )
}
