"use client"

import { getProjectMedia } from "@/actions/actions"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Chip from "../ui/chip"
import Button from "../ui/button"
import { Icons } from "@/config/icons"
import { supabaseLoader } from "@/lib/utils"

export default function Project({ language, project, video }) {

    const [picturesUrl, setPicturesUrl] = useState([])
    const [snippetsUrl, setSnippetsUrl] = useState([])
    const [paused, setPaused] = useState(true)
    const [loading, setLoading] = useState(false)
    const videoRef = useRef()

    useEffect(() => {
        setPicturesUrl([])
        setSnippetsUrl([])
        async function getProjectMediaUrl() {
            if (project.pictures) {
                project.pictures.forEach(async (picture) => {
                    const { data: pictureUrl } = await getProjectMedia(picture)

                    const newUrl = supabaseLoader({src: pictureUrl, width: 100, quality:100})                    

                    if (pictureUrl) {
                        setPicturesUrl((currentUrls) => ([...currentUrls, newUrl]))
                    }
                })
            }

            if (project.snippets) {
                project.snippets.forEach(async (snippet) => {
                    const { data: snippetUrl } = await getProjectMedia(snippet)

                    const newUrl = supabaseLoader({src: snippetUrl, width: 100, quality:100})                    
                    if (snippetUrl) {
                        setSnippetsUrl(currentUrls => ([...currentUrls, newUrl]))
                    }
                })
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
                            <h2>{project.title}</h2><Button type={'primary'} className={'project__button'} href={project.link}>Github</Button>
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

                        {
                            project.pictures ?
                                <div className="project__block">
                                    <div className="project__block-title title">
                                        <h2>{language.app.pages.project.sections.pictures.title}</h2>
                                    </div>
                                    <div className="project__block-gallery pictures">
                                        {
                                            project.pictures.length === picturesUrl.length ?
                                                picturesUrl.map((pictureUrl) => (
                                                    
                                                    <Image unoptimized className="project__block-image card" src={pictureUrl} width={1} height={1} />
                                                ))
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                :
                                null
                        }
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
                                                    <Image unoptimized className="project__block-image card" src={snippeturl} width={1} height={1} />
                                                ))
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}