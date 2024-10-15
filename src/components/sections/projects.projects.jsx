import ListProjects from "./list.projects"
import FilterProjects from "./filter.projects"

export default async function Projects({ language, searchParams }) {

    const searchQ = searchParams?.search ? searchParams.search : ''
    const categoryQ = searchParams?.category ? searchParams.category : ''
    const limitQ = searchParams?.limit ? searchParams.limit : ''
    const sortQ = searchParams?.sort ? { code: searchParams.sort.split('.')[0], ascending: searchParams.sort.split('.')[1] == 'asc' ? true : false } : {code: 'created_at', ascending: false}


    return (
        <section className="projects">
            <div className="container">
                <div className="projects__inner inner__big">
                    <div className="projects__list">
                        {/* <FilterProjects language={language} searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ} sortQ={sortQ} /> */}
                        <ListProjects language={language} searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ} sortQ={sortQ} />
                    </div>
                </div>
            </div>
        </section>
    )
}