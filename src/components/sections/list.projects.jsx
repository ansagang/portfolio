"use client"

import { getProjects } from "@/actions/api";
import ProjectCard from "../ui/project-card";
import SkeletonList from "../ui/skeleton-list";
import { useEffect, useState } from "react";
import FilterProjects from "./filter.projects";

export default function ListProjects({ language, searchQ, categoryQ, limitQ, sortQ }) {

    const [projects, setProjects] = useState()
    const [categories, setCategories] = useState()
    useEffect(() => {
        setProjects()
        async function get() {
            const {data, facets} = await getProjects({ lang: language.lang, search: searchQ, category: categoryQ, limit: limitQ, sort: sortQ, revalidate: 0 })
            setProjects(data)
            setCategories(facets)
        }

        get()
    }, [language])

    return (
        <>
            <FilterProjects language={language} searchQ={searchQ} sortQ={sortQ} categoryQ={categoryQ} limitQ={limitQ} categories={categories} />
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