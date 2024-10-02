"use client"

import { useState } from "react"
import Chip from "../ui/chip"
import Input from "../ui/input"
import ProjectCard from "../ui/project-card"
import Select from "../ui/select"

export default function Projects({ language }) {

    const [search, setSearch] = useState()
    const [category, setCategory] = useState()


    return (
        <section className="projects">
            <div className="container">
                <div className="projects__inner inner">
                    <div className="projects__title title">
                        <h2>{language.app.pages.projects.meta.title}</h2>
                    </div>
                    <div className="projects__list">
                        <div className="projects__list-filter">
                            <div className="projects__list-filter_search">
                                <Input value={search} type={'search'} placeholder="Search some projects..." />
                            </div>
                            <div className="projects__list-filter_select">
                                <Select activeOption={category} setActiveOption={setCategory} options={[{ title: 'All', code: 'frontend' }, { title: 'front-end', code: 'frontend' }]} />

                            </div>
                            <div className="projects__list-filter_select">
                                <Select activeOption={category} setActiveOption={setCategory} options={[{ title: 'front-end', code: 'frontend' }]} />
                            </div>
                        </div>
                        <div className="projects__list-items">
                            <ProjectCard className="projects__list-item" id={1} title={'Chetam'} description={'Tuda susa'} category={['Local']} video={'takoe'} />
                            <ProjectCard className="projects__list-item" id={1} title={'Chetam'} description={'Tuda susa'} category={['Local']} video={'takoe'} />

                            <ProjectCard className="projects__list-item" id={1} title={'Chetam'} description={'Tuda susa'} category={['Local']} video={'takoe'} />
                            <ProjectCard className="projects__list-item" id={1} title={'Chetam'} description={'Tuda susa'} category={['Local']} video={'takoe'} />

                            <ProjectCard className="projects__list-item" id={1} title={'Chetam'} description={'Tuda susa'} category={['Local']} video={'takoe'} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}