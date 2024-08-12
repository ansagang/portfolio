"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import { useRef, useState } from "react"

export default function ProjectCard({ title, description, type, video, ...props }) {

    const videoRef = useRef(null)

    return (
        <div className="project-card" {...props}>
            <TiltCard className="project-card__visual">
                <video playsInline preload="metadata" muted ref={videoRef} onMouseEnter={() => videoRef.current.play()} onMouseLeave={() => {
                    videoRef.current.currentTime = 0
                    videoRef.current.pause()
                }}>
                    <source src={video} />
                </video>
                {/* <Image src={'logo.png'} width={1} height={1} unoptimized={true} /> */}
                {/* <Player autoPlay={true} controls={false} src={video} /> */}
            </TiltCard>
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