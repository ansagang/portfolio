"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import { useRef, useState } from "react"

export default function ProjectCard({ id, title, description, category, video, ...props }) {

    const videoRef = useRef(null)
    const type = category.join(" / ")

    return (
        <div className="project-card" {...props}>
            <Link className="project-card__visual" href={`/projects/${id}`}>
                <TiltCard>
                    <video playsInline muted ref={videoRef} onMouseEnter={() => videoRef.current.play()} onMouseLeave={() => {
                        videoRef.current.currentTime = 0
                        videoRef.current.pause()
                    }}>
                        <source src={video} />
                    </video>
                    {/* <Image src={'logo.png'} width={1} height={1} unoptimized={true} /> */}
                    {/* <Player autoPlay={true} controls={false} src={video} /> */}
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