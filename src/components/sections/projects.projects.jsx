"use client"

import { Suspense, useRef, useState } from "react"
import Chip from "../ui/chip"
import Input from "../ui/input"
import ProjectCard from "../ui/project-card"
import Select from "../ui/select"
import useInView from "@/hooks/use-in-view"
import BannerProjects from "./banner.projects"
import ListProjects from "./list.projects"
import SkeletonList from "../ui/skeleton-list"

export default function Projects({ language, searchParams }) {

    const searchQ = searchParams?.search || undefined
    const categoryQ = searchParams?.category || undefined
    const limitQ = searchParams?.limit || undefined
    const sortQ = searchParams?.sort ? {by: searchParams.sort.split('.')[0], ascending: searchParams.sort.split('.')[1] == 'asc' ? true : false} : undefined

    const [search, setSearch] = useState()
    const [category, setCategory] = useState()

    return (
        <section className="projects">
            <div className="container">
                <div className="projects__inner inner">
                    {/* <BannerProjects language={language} /> */}
                    <div className="projects__list">
                        <div className="projects__list-filter">
                            <div className="projects__list-filter_search">
                                <Input value={search} type={'search'} placeholder="Search some projects..." />
                            </div>
                            <div className="projects__list-filter_select">
                                <Select activeOption={category} setActiveOption={setCategory} options={[{ title: 'All', code: 'frontend' }, { title: 'front-end', code: 'frontend' }]} />

                            </div>
                        </div>
                        <Suspense fallback={<SkeletonList className="projects__list-items" count={6} />} key={searchQ + categoryQ + limitQ + sortQ}>
                            <ListProjects searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ}
                            sortQ={sortQ} language={language} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    )
}