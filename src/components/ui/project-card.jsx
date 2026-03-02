"use client"

import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { getProjectMedia } from "@/actions/actions"
import Chip from "./chip"
import Video from "./video"
import { Icons } from "@/config/icons"

export default function ProjectCard({ project, tilt, ...props }) {

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
                                                        <Chip type={'secondary'}>{category.title}</Chip>
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
                            <Video interactive={false} src={project.video} />
                        </TiltCard>
                        :
                        <Video interactive={false} src={project.video} />
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