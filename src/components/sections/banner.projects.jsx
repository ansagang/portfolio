"use client"

import useInView from "@/hooks/use-in-view"
import Chip from "../ui/chip"

export default function BannerProjects({ language }) {

    const [bannerRef, inView] = useInView()

    return (
        <div ref={bannerRef} className={inView ? "projects__banner white active" : "projects__banner white"}>
            <div className="projects__content">
                <div className="projects__title title">
                    <h2>{language.app.pages.projects.meta.title}</h2>
                </div>
            </div>

            {/* <div className="projects__filters">
                <Chip active={true} type={'secondary'} className={'projects__filter'}>Front-end</Chip>
                <Chip type={'secondary'} className={'projects__filter'}>Front-end</Chip>
                <Chip type={'secondary'} className={'projects__filter'}>Front-end</Chip>
                <Chip type={'secondary'} className={'projects__filter'}>Front-end</Chip>
                <Chip type={'secondary'} className={'projects__filter'}>Front-end</Chip>
            </div> */}
        </div>
    )
}