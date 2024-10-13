"use client"

import { getProjects } from "@/actions/api";
import ProjectCard from "../ui/project-card";
import FilterProjects from "./filter.projects";
import CategoryProjects from "./category.projects";
import { unslugify } from "@/lib/utils";
import SkeletonList from "../ui/skeleton-list";
import { useEffect, useState } from "react";

export default function ListProjects({ language, searchQ, categoryQ, limitQ, sortQ }) {

    const [projects, setProjects] = useState()
    useEffect(() => {
        setProjects()
        async function get() {
            const data = await getProjects({ lang: language.lang, search: searchQ, category: categoryQ, limit: limitQ, sort: sortQ })
            if (data) {
                setProjects(data.data)
            }

        }

        get()
    }, [language])

    return (
        <>
            {/* {
                projects ?
                    projects.length !== 0 ?
                        (
                            <div className="projects__list-items">
                                {
                                    projects.map((project) => (
                                        <ProjectCard key={project.id} className="projects__list-item" id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} slug={project.slug} />
                                    ))
                                }
                            </div>
                        )
                        :
                        null
                    :
                    <SkeletonList className="projects__list-items" count={6} />
            } */}
            {
                <div className="projects__list-items">
                    {
                        projects ?
                            projects.length !== 0 ?
                                (
                                    projects.map((project) => (
                                        <ProjectCard key={project.id} className="projects__list-item" id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} slug={project.slug} />
                                    ))
                                )
                                :
                                null
                            :
                            <SkeletonList count={6} />
                    }
                </div>

            }
        </>
    )
}