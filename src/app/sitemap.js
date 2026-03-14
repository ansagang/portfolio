import { getProjects } from "@/actions/api";
import { languages_codes } from "@/config/languages";

export default async function sitemap() {
    const staticRoutes = ['', '/about', '/projects', '/contact']

    const staticEntries = languages_codes.flatMap(lang =>
        staticRoutes.map(route => ({
            url: `${process.env.URL}${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: route === '' ? 1 : 0.7
        }))
    )

    const { data: projects } = await getProjects({ lang: 'en' })

    const projectEntries = languages_codes.flatMap(lang =>
        (projects ?? []).map(project => ({
            url: `${process.env.URL}${lang}/projects/${project.slug}`,
            lastModified: project.createdAt ?? new Date(),
            changeFrequency: "daily",
            priority: 0.5
        }))
    )

    return [...staticEntries, ...projectEntries]
}
