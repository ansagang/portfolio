"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getProjectMedia } from "@/actions/api"

export default function ProjectCard({ slug, id, title, description, category, video, ...props }) {

    const videoRef = useRef(null)
    const type = category.join(" / ")
    const [videoUrl, setVideoUrl] = useState()
    useEffect(() => {
        setVideoUrl()
        async function getProjectMediaUrl() {
            const { data: projectVideoUrl } = await getProjectMedia(video)
            if (projectVideoUrl) {
                setVideoUrl(projectVideoUrl)
            }
        }

        getProjectMediaUrl()
    }, [id])


    return (
        <div className="project-card card" {...props}>
            <Link className="project-card__visual" href={`/projects/${slug}`}>
                <TiltCard>
                    <video preload="metadata" playsInline muted ref={videoRef} onMouseEnter={() => videoRef.current.play()} onMouseLeave={() => {
                        videoRef.current.currentTime = 0
                        videoRef.current.pause()
                    }} src={videoUrl}>
                        <source src={videoUrl + "#t=0.1"} />
                    </video>
                </TiltCard>
            </Link>
            <div className="project-card__content">
                <div className="project-card__title title">
                    <h3>{title}<span> / {type}</span></h3>
                </div>
                <div className="project-card__info title">
                    <h4>{description}</h4>
                </div>
            </div>
        </div>
    )
}