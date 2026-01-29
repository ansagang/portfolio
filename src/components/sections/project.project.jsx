"use client"

import { getProjectMedia } from "@/actions/actions"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Chip from "../ui/chip"
import Button from "../ui/button"
import { Icons } from "@/config/icons"

export default function Project({ language, project }) {

    const [paused, setPaused] = useState(true)
    const [loading, setLoading] = useState(false)
    const videoRef = useRef()
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



    useEffect(() => {
        if (paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [paused])

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
                    <div onClick={() => {
                        setPaused(!paused)
                    }} className="project__video card">
                        <video onLoadStart={() => setLoading(true)} onLoadedData={() => setLoading(false)} className={loading ? "video loading" : paused ? "video" : "video paused"} ref={videoRef} loop={true} playsInline muted src={video}>
                        </video>
                        {
                            loading ?
                                <div className="video__loading"></div>
                                :
                                !paused ?
                                    <div className="video__paused">
                                        <Icons.play />
                                    </div>
                                    :
                                    null
                        }
                    </div>
                    <div className="project__content">
                        <div className="project__block">
                            <div className="project__block-title title">
                                <h2>{language.app.pages.project.sections.technologies.title}</h2>
                            </div>
                            <div className="project__block-tags">
                                {
                                    project.tags ?
                                        project.tags.length !== 0 ?
                                            project.tags.map((tag) => (
                                                <Chip className={'project__block-tag'} type={'primary'}>{tag}</Chip>
                                            ))
                                            :
                                            null
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}