import { getProjects } from "@/actions/api"
import ProjectCard from "../ui/project-card"


export default async function ProjectsList({ language }) {

    const { data: projects } = await getProjects({ lang: language.lang, limit: 2, revalidate: 3600 })

    return (
        <div className="block__content-projects">
            {
                projects ?
                    projects.length > 0 ?
                        projects.map((project, k) => (
                            <ProjectCard key={k} tilt={true} project={project} />
                        ))
                        :
                        null
                    :
                    null
            }
        </div>
    )
}