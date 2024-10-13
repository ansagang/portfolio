import ListProjects from "./list.projects"
import SkeletonList from "../ui/skeleton-list"
import FilterProjects from "./filter.projects"
import { unslugify } from "@/lib/utils"
import BannerProjects from "./banner.projects"


export default async function Projects({ language, searchParams }) {

    const searchQ = searchParams?.search ? searchParams.search : ''
    const categoryQ = searchParams?.category ? searchParams.category : null
    const limitQ = searchParams?.limit ? searchParams.limit : null
    const sortQ = searchParams?.sort ? { code: searchParams.sort.split('.')[0], ascending: searchParams.sort.split('.')[1] == 'asc' ? true : false } : { code: 'created_at', ascending: false }

    return (
        <section className="projects">
            <div className="container">
                <div className="projects__inner inner">
                    {/* <BannerProjects facets={facets} categoryQ={categoryQ} language={language} /> */}
                    <div className="projects__list">
                        <FilterProjects language={language} searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ} sortQ={sortQ} />
                        <ListProjects language={language} searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ} sortQ={sortQ} />
                    </div>
                </div>
            </div>
        </section>
    )
}