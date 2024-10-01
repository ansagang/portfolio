"use client"

import { useState } from "react"
import Chip from "../ui/chip"
import Input from "../ui/input"
import ProjectCard from "../ui/project-card"
import Select from "../ui/select"

export default function Portfolio({ language }) {

    const [search, setSearch] = useState()
    const [category, setCategory] = useState()


    return (
        <section className="portfolio">
            <div className="container">
                <div className="portfolio__inner inner__small">
                    <div className="portfolio__title title">
                        <h2>Portfolip</h2>
                    </div>
                    <div className="portfolio__list">
                        <div className="portfolio__list-filter">
                            <div className="portfolio__list-filter_search">
                                <Input value={search} type={'search'} placeholder="Search some projects..." />
                            </div>
                            <div className="portfolio__list-filter_select">
                                <Select activeOption={category} setActiveOption={setCategory} options={[{ title: 'All', code: 'frontend' }, { title: 'front-end', code: 'frontend' }]} />

                            </div>
                            <div className="portfolio__list-filter_select">
                                <Select activeOption={category} setActiveOption={setCategory} options={[{ title: 'front-end', code: 'frontend' }]} />
                            </div>
                        </div>
                        <div className="portfolio__list-items">
                            <ProjectCard className="portfolio__list-item" id={1} title={'Chetam'} description={'Tuda susa'} type={'Local'} video={'takoe'} />
                            <ProjectCard className="portfolio__list-item" id={1} title={'Chetam'} description={'Tuda susa'} type={'Local'} video={'takoe'} />

                            <ProjectCard className="portfolio__list-item" id={1} title={'Chetam'} description={'Tuda susa'} type={'Local'} video={'takoe'} />
                            <ProjectCard className="portfolio__list-item" id={1} title={'Chetam'} description={'Tuda susa'} type={'Local'} video={'takoe'} />

                            <ProjectCard className="portfolio__list-item" id={1} title={'Chetam'} description={'Tuda susa'} type={'Local'} video={'takoe'} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}