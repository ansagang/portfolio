import { getProjects } from "@/actions/api"
import { Suspense } from "react"
import SkeletonProjects from "../skeletons/skeleton-projects"
import ProjectCard from "../ui/project-card"


export default async function ProjectsList({ language }) {

    const { data: projects } = await getProjects({ lang: language.lang, limit: 2, revalidate: 3600 })

    return (
        <div className="block__content-projects">
            <Suspense fallback={<SkeletonProjects number={2} />}>
                {
                    projects.map((project, k) => (
                        <ProjectCard key={k} id={project.id} title={project.title} description={project.description} categories={project.categories} video={project.video} slug={project.slug} />
                    ))
                }
            </Suspense>
        </div>
    )
}