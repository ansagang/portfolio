import { getLanguage } from "@/actions/actions";
import { getProjects } from "@/actions/api";

export default async function sitemap() {
    const language = await getLanguage({})

    const {data: projects} = await getProjects({lang: language.lang})
    const project = projects?.map((project) => {
        return {
            url: `https://www.angsar-aben.kz/${project.slug}`,
            lastModified: project.createdAt
        }
    })

    return [
        {
            url: "https://www.angsar-aben.kz",
            lastModified: new Date()
        },
        {
            url: "https://www.angsar-aben.kz/about",
            lastModified: new Date()
        },
        {
            url: "https://www.angsar-aben.kz/projects",
            lastModified: new Date()
        },
        {
            url: "https://www.angsar-aben.kz/contact",
            lastModified: new Date()
        },
        ...project
    ]
}