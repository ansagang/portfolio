import ProjectCard from "../ui/project-card"
import getProjects from "@/actions/projects";

export default async function ProjectsLoader({ language, category, limit, sort, search }) {

    const { data: projects, count, facets } = await getProjects({ lang: language, category: category, search: search, limit: limit, sort: sort })

    console.log(count, facets);
    

    return (
        projects ?
            projects.length !== 0 ?
                projects.map((project) => (
                    <ProjectCard id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} />
                ))
                :
                null
            :
            null
    )
}