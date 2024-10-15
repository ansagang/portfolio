"use client"

import ProjectCard from "@/components/ui/project-card";
import Button from "../ui/button";
import { Icons } from "@/config/icons";
import SkeletonProject from "../ui/skeleton-project";

export default function Projects({ language, projects }) {
    
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
                            {
                                projects ?
                                    projects.length !== 0 ?
                                        projects.map((project) => (
                                            <ProjectCard id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} slug={project.slug} />
                                        ))
                                        :
                                        null
                                    :   
                                    [...Array(4)].map((i) => (
                                        <SkeletonProject />
                                    ))
                            }
                        </div>
                        <Button href={'/projects'} type={'secondary'} className={'block__content-button'}>{language.app.buttons.otherProjects}<Icons.arrow /></Button>

                    </div>
                </div>
            </div>
        </section>
    )
}