"use client"

import ProjectCard from "@/components/ui/project-card";
import Button from "../ui/button";
import { Icons } from "@/config/icons";
import { useRouter } from "next/navigation";
import InteractiveNodes from "../three/interactive-nodes";
import { useEffect, useRef, useState } from "react";
import Game from "../three/game";
import { getProjects } from "@/actions/api";

export default function Projects({ language }) {

    // const router = useRouter()
    const [projects, setProjects] = useState()
    useEffect(() => {
        setProjects()
        async function get() {
            const { data } = await getProjects({lang: language.lang, limit: 4})
            if (data) {
                setProjects(data)
            }
        }

        get()
    }, [language])

    return (
        <section className="block">
            <div className="container__fluid">
                <div className="block__inner inner">
                    <div className="block__heading">
                        <div className="block__heading-title title">
                            <h2>{language.app.pages.projects.meta.title}</h2>
                        </div>
                    </div>
                    <div className="block__content">
                        <div className="block__content-projects">
                            {/* <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} category={['Local', "MAlbaeb"]} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} id={1} />

                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} category={['Local']} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} id={1} />
                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} category={['Local']} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} id={1} />
                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} category={['Local']} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} id={1} /> */}
                            {/* <Suspense fallback={<h1>title</h1>}>
                                <ProjectsList language={language} limit={4} />
                            </Suspense> */}
                            {
                                projects ?
                                    projects.length !== 0 ?
                                        projects.map((project) => (
                                            <ProjectCard id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} slug={project.slug} />
                                        ))
                                        :
                                        null
                                    :   
                                    <h1>loading</h1>
                            }
                        </div>
                        {/* <Button onClick={() => router.push('/projects')} type={'secondary'} className={'block__content-button'}>{language.app.buttons.otherProjects}<Icons.arrow /></Button> */}
                        <Button href={'/projects'} type={'secondary'} className={'block__content-button'}>{language.app.buttons.otherProjects}<Icons.arrow /></Button>

                    </div>
                </div>
            </div>
        </section>
    )
}