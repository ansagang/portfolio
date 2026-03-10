"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import Chip from "./chip"
import Video from "./video"
import { Icons } from "@/config/icons"

export default function ProjectCard({ project, tilt, ...props }) {

    return (
        <div className="project-card" {...props}>
            <Link className="card" href={`/projects/${project.slug}`}>
                {
                    tilt ?
                        <TiltCard>
                            <Video className="project-card__visual" interactive={false} src={project} />
                        </TiltCard>
                        :
                        <Video className="project-card__visual" interactive={false} src={project} />
                }
            </Link>
            <div className="project-card__content">
                <div className="project-card__title title">
                    <h3>{project.title}</h3>
                </div>
                <div className="project-card__info info">
                    <p>{project.description}</p>
                </div>
            </div>
        </div>
    )
}