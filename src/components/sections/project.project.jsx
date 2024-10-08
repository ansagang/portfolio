"use client"

import { getProjectMedia } from "@/actions/api"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Chip from "../ui/chip"
import Button from "../ui/button"
import { Icons } from "@/config/icons"
import ContactBanner from "../ui/contact-banner"

export default function Project({ language, project }) {

    const [videoUrl, setVideoUrl] = useState()
    const [picturesUrl, setPicturesUrl] = useState([])
    const [snippetsUrl, setSnippetsUrl] = useState([])
    const [paused, setPaused] = useState(false)
    const videoRef = useRef()

    useEffect(() => {
        setVideoUrl()
        setPicturesUrl([])
        setSnippetsUrl([])
        async function getProjectMediaUrl() {
            const { data: projectVideoUrl } = await getProjectMedia(project.video)
            if (projectVideoUrl) {
                setVideoUrl(projectVideoUrl)
            }

            if (project.pictures) {
                project.pictures.forEach(async (picture) => {
                    const { data: pictureUrl } = await getProjectMedia(picture)

                    if (pictureUrl) {
                        setPicturesUrl((currentUrls) => ([...currentUrls, pictureUrl]))
                    }
                })
            }

            if (project.snippets) {
                project.snippets.forEach(async (snippet) => {
                    const { data: snippetUrl } = await getProjectMedia(snippet)

                    if (snippetUrl) {
                        setSnippetsUrl(currentUrls => ([...currentUrls, snippetUrl]))
                    }
                })
            }
        }

        getProjectMediaUrl()
    }, [project])

    console.log(snippetsUrl);


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
                        </div>
                        <div className="project__info info">
                            <p>{project.description}</p>
                        </div>
                        <div className="project__links">
                            <Button type={'primary'} className={'project__button'} href={project.link}>Github</Button>
                        </div>
                    </div>
                    <div onClick={() => {
                        setPaused(!paused)
                    }} className="project__video card">
                        <video className={paused ? "video" : "video paused"} ref={videoRef} loop={true} playsInline muted src={videoUrl}>
                        </video>
                        {
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
                        {
                            project.snippets ?
                                <div className="project__block">
                                    <div className="project__block-title title">
                                        <h2>{language.app.pages.project.sections.snippets.title}</h2>
                                    </div>
                                    <div className="project__block-gallery">
                                        {
                                            project.snippets.length === snippetsUrl.length ?
                                                snippetsUrl.map((snippeturl) => (
                                                    <Image className="project__block-image card" src={snippeturl} width={1} height={1} unoptimized />
                                                ))
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                :
                                null
                        }

                    <div className="project__block">
                            <div className="project__block-title title">
                                <h2>{language.app.pages.contact.meta.title}</h2>
                            </div>
                            <ContactBanner className={'project__block-contact'} language={language} />
                        </div>
                    </div>
                    {/* <div className="project__picture">
                        <Image src={picturesUrl[activePicture]} width={1} height={1} unoptimized={true} />
                    </div> */}
                </div>
            </div>
        </section>
    )
}