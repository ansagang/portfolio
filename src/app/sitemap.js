import { getLanguage } from "@/lib/get-language";
import { getProjects } from "@/actions/api";

const BASE_URL = process.env.URL

export default async function sitemap() {
    const language = await getLanguage({})

    const {data: projects} = await getProjects({lang: language.lang})
    const projectEntries = projects?.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: project.createdAt, changeFrequency: "daily", priority: 0.5
    })) ?? []

    return [
        { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
        { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
        ...projectEntries
    ]
}
