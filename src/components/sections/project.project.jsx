"use client"

import { getProjectMedia } from "@/actions/api"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Chip from "../ui/chip"

export default function Project({ language, project }) {

    const [videoUrl, setVideoUrl] = useState()
    const [picturesUrl, setPicturesUrl] = useState([])
    const [activePicture, setActivePicture] = useState(0)
    console.log(picturesUrl);

    useEffect(() => {
        setVideoUrl()
        setPicturesUrl([])
        async function getProjectMediaUrl() {
            const { data: projectVideoUrl } = await getProjectMedia(project.video)
            if (projectVideoUrl) {
                setVideoUrl(projectVideoUrl)
            }

            project.pictures.forEach(async (picture) => {
                const { data: pictureUrl } = await getProjectMedia(picture)

                if (pictureUrl) {
                    setPicturesUrl((currentUrls) => ([...currentUrls, pictureUrl]))
                }
            })
        }

        getProjectMediaUrl()
    }, [project])



    return (
        <section className="project">
            <div className="container">
                <div className="project__inner inner">
                    <div className="project__content">
                        <div className="project__tags">
                            {
                                project.tags ?
                                    project.tags.length !== 0 ?
                                        project.tags.map((tag) => (
                                            <Chip type={'primary'} className={'project__tag'}>{tag}</Chip>
                                        ))
                                        :
                                        null
                                    :
                                    null
                            }
                        </div>
                        <div className="project__title title">
                            <h2>{project.title}</h2>
                        </div>
                        <div className="project__info info">
                            <p>{project.description}</p>
                        </div>
                    </div>
                    <div className="project__video card">
                        <video autoPlay={true} loop={true} preload="metadata" playsInline muted src={videoUrl}>
                            <source src={videoUrl + "#t=0.1"} />
                        </video>
                    </div>
                    {/* <div className="project__picture">
                        <Image src={picturesUrl[activePicture]} width={1} height={1} unoptimized={true} />
                    </div> */}
                </div>
            </div>
        </section>
    )
}