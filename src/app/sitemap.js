import { getLanguage } from "@/lib/get-language";
import { getProjects } from "@/actions/api";

const BASE_URL = "https://www.angsar-aben.kz"

export default async function sitemap() {
    const language = await getLanguage({})

    const {data: projects} = await getProjects({lang: language.lang})
    const projectEntries = projects?.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: project.createdAt
    })) ?? []

    return [
        { url: `${BASE_URL}`, lastModified: new Date() },
        { url: `${BASE_URL}/about`, lastModified: new Date() },
        { url: `${BASE_URL}/projects`, lastModified: new Date() },
        { url: `${BASE_URL}/contact`, lastModified: new Date() },
        ...projectEntries
    ]
}
