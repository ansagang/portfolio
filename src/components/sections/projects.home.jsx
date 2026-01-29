import ProjectCard from "@/components/ui/project-card";
import Button from "../ui/button";
import { Icons } from "@/config/icons";
import SkeletonProject from "../skeletons/skeleton-project";
import { getProjects } from "@/actions/api";
import { Suspense } from "react";
import { revalidateTag } from "next/cache";

export default async function Projects({ language }) {

    const {data: projects} = await getProjects({lang: language.lang, limit: 2})
    function refreshProjects() {
        revalidateTag('projects');
    }

    // refreshProjects()
    
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
                                        projects.map((project, k) => (
                                            <ProjectCard key={k} id={project.id} title={project.title} description={project.description} categories={project.categories} video={project.video} slug={project.slug} />
                                        ))
                                        :
                                        null
                                    :   
                                    [...Array(4)].map((i) => (
                                        <SkeletonProject key={i} />
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