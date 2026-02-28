"use client"

import { getProjectMedia } from "@/actions/actions"
import { useEffect, useState } from "react"
import Chip from "../ui/chip"
import Button from "../ui/button"
import Video from "../ui/video"

export default function Project({ language, project }) {

    const [video, setVideo] = useState()

    useEffect(() => {
        setVideo()

        async function getProjectMediaUrl() {
            if (project.video) {
                const { data } = await getProjectMedia(project.video)

                if (data) {
                    setVideo(data)
                }
            }
        }

        getProjectMediaUrl()
    }, [project])

    return (
        <section className="project">
            <div className="container">
                <div className="project__inner inner">
                    <div className="project__header">
                        <div className="project__title title">
                            <h2>{project.title}</h2>
                            {
                                project.link ?
                                    <Button type={'primary'} className={'project__button'} href={project.link}>Github</Button>
                                    :
                                    null
                            }
                        </div>
                        <div className="project__info info">
                            <p>{project.description}</p>
                        </div>
                        <div className="project__links">
                        </div>
                    </div>
                    <Video className="project__video card" src={video} />
                </div>
            </div>
        </section>
    )
}