import { getProjects } from "@/actions/api"
import Chip from "../ui/chip"
import ProjectsChips from "./projects-chips"

export default async function ProjectsChipsShell({ language, searchParams }) {
    const params = await searchParams
    const searchQ = await params?.search ? params.search : ''

    const { facets: categories } = await getProjects({ lang: language.lang, search: searchQ })

    return (
        <ProjectsChips categories={categories} language={language} searchParams={searchParams} />
    )
}