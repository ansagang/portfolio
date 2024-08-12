"use client"

import { Icons } from "@/config/icons";
import ProjectCard from "@/components/ui/project-card";

export default function Projects({ language }) {

    return (
        <section className="block">
            <div className="container__fluid">
                <div className="block__inner inner">
                    <div className="block__heading">
                        <div className="block__heading-title title">
                            <h2>{language.app.pages.projects.meta.title}</h2>
                        </div>
                        <div className="block__heading-info title">
                            <h4>I have a proven track record of my projects</h4>
                        </div>
                    </div>
                    <div className="block__content">
                        <div className="block__content-projects">
                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} type={'Corporare website'} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} />

                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} type={'Corporare website'} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} />
                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} type={'Corporare website'} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} />
                            <ProjectCard title={'Navicon'} description={'I have a proven track record of my own product and over 30 projects that have helped clients grow'} type={'Corporare website'} video={'https://azpfacrylvtimqbpwxgo.supabase.co/storage/v1/object/public/project_video/project-utracesolutions.mp4?t=2024-08-12T19%3A56%3A47.226Z'} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}