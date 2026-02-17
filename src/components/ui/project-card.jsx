"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getProjectMedia } from "@/actions/actions"
import Chip from "./chip"
import { Icons } from "@/config/icons"

export default function ProjectCard({ project, tilt, ...props }) {

    const videoRef = useRef()
    const [videoUrl, setVideoUrl] = useState()

    useEffect(() => {
        setVideoUrl()
        async function getProjectMediaUrl() {
            const { data: projectVideoUrl } = await getProjectMedia(project.video)
            if (projectVideoUrl) {
                setVideoUrl(projectVideoUrl)
            }
        }

        getProjectMediaUrl()
    }, [project.id])

    useEffect(() => {
        videoRef.current?.load();
    }, [videoUrl]);



    return (
        <div className="project-card" {...props}>
            <Link className="project-card__visual card" href={`/projects/${project.slug}`}>
                {
                    tilt ?
                        <TiltCard>

                            <div className="project-card__categories">
                                {
                                    project.categories ?
                                        project.categories.length > 0 ?
                                            project.categories.map((category, k) => (
                                                k < 2 ?
                                                    <div key={k} className="project-card__category">
                                                        <Chip type={'secondary'}>{category}</Chip>
                                                    </div>
                                                    :
                                                    null
                                            ))
                                            :
                                            null

                                        :
                                        null
                                }
                                {
                                    project.categories ?
                                        project.categories.length > 2 ?
                                            <div className="project-card__category">
                                                <Chip className={'circle'} type={'secondary'}><Icons.arrow /></Chip>
                                            </div>
                                            :
                                            null

                                        :
                                        null
                                }
                            </div>
                            <video playsInline muted ref={videoRef} onMouseEnter={() => {
                                if (videoUrl) {
                                    videoRef.current.play()
                                }
                            }} onMouseLeave={() => {
                                if (videoUrl) {
                                    videoRef.current.currentTime = 0
                                    videoRef.current.pause()
                                }
                            }} src={videoUrl}>
                            </video>
                        </TiltCard>
                        :
                        <div>
                            <video playsInline muted ref={videoRef} onMouseEnter={() => {
                                if (videoUrl) {
                                    videoRef.current.play()
                                }
                            }} onMouseLeave={() => {
                                if (videoUrl) {
                                    videoRef.current.currentTime = 0
                                    videoRef.current.pause()
                                }
                            }} src={videoUrl}>
                            </video>
                        </div>
                }
            </Link>
            <div className="project-card__content">
                <div className="project-card__title title">
                    <h3>{project.title}</h3>
                </div>
                <div className="project-card__info title">
                    <h4>{project.description}</h4>
                </div>
            </div>
        </div>
    )
}