import { getProjects } from "@/actions/api"
import ProjectCard from "../ui/project-card"
import ProjectsChipsShell from "./projects-chips-shell"
import ProjectsChips from "./projects-chips"

export default async function ProjectsList({ language, searchParams }) {

    const params = await searchParams
    const searchQ = await params?.search ? params.search : ''
    const categoriesQ = await params?.categories ? params.categories.split(',') : []

    const { data: projects, facets: categories } = await getProjects({ lang: language.lang, search: searchQ, categories: categoriesQ, cache: 'no-store' })

    return (
        <>
            {/* <ProjectsChips categories={categories} language={language} searchParams={searchParams} /> */}
            <div className="projects__list list">
                {
                    projects ?
                        projects.length > 0 ?
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                            :
                            null
                        :
                        null
                }
            </div>
        </>
    )
}