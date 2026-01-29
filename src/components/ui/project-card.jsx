"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getProjectMedia } from "@/actions/actions"
import Chip from "./chip"

export default function ProjectCard({ slug, id, title, description, categories, video, ...props }) {

    const videoRef = useRef()
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

    useEffect(() => {
        videoRef.current?.load();
    }, [videoUrl]);

    return (
        <div className="project-card" {...props}>
            <Link className="project-card__visual card" href={`/projects/${slug}`}>
                <TiltCard>

                    <div className="project-card__categories">
                        {
                            categories ?
                                categories.length > 0 ?
                                    categories.map((category, k) => (
                                        (
                                            <div key={k} className="project-card__category">
                                                <Chip type={'secondary'}>{category.title}</Chip>
                                            </div>
                                        )
                                    ))
                                :
                                null
                            :
                            null
                        }
                    </div>
                    {
                            <video playsInline muted ref={videoRef} onMouseEnter={() => videoRef.current.play()} onMouseLeave={() => {
                                videoRef.current.currentTime = 0
                                videoRef.current.pause()
                            }} src={videoUrl}>
                            </video>
                    }
                </TiltCard>
            </Link>
            <div className="project-card__content">
                <div className="project-card__title title">
                    <h3>{title}</h3>
                </div>
                <div className="project-card__info title">
                    <h4>{description}</h4>
                </div>
            </div>
        </div>
    )
}