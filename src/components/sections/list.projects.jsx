import { getProjects } from "@/actions/api";
import ProjectCard from "../ui/project-card";

export default async function ListProjects({ language, searchQ, categoryQ, limitQ, sortQ }) {

    const { data: projects } = await getProjects({ lang: language.lang, search: searchQ, category: categoryQ, limit: limitQ, sort: sortQ })


    return (
        <div className="projects__list-items">
            {
                projects ?
                    projects.length !== 0 ?
                        projects.map((project) => (
                            <ProjectCard className="projects__list-item" id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} slug={project.slug} />
                        ))
                        :
                        null
                    :
                    null
            }
        </div>
    )
}