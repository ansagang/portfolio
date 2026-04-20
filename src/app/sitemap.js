import { getProjects } from "@/actions/api";
import { languages_codes } from "@/config/languages";
import { BASE_URL } from "@/lib/base-url";

function buildLanguageAlternates(path) {
    const languages = Object.fromEntries(
        languages_codes.map(code => [code, `${BASE_URL}/${code}${path}`])
    )
    languages['x-default'] = `${BASE_URL}/en${path}`
    return languages
}

export default async function sitemap() {
    const staticRoutes = ['', '/about', '/projects', '/contact']

    const staticEntries = languages_codes.flatMap(lang =>
        staticRoutes.map(route => ({
            url: `${BASE_URL}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: route === '' ? 1 : 0.7,
            alternates: {
                languages: buildLanguageAlternates(route),
            },
        }))
    )

    const { data: projects } = await getProjects({ lang: 'en' })

    const projectEntries = languages_codes.flatMap(lang =>
        (projects ?? []).map(project => ({
            url: `${BASE_URL}/${lang}/projects/${project.slug}`,
            lastModified: project.createdAt ?? new Date(),
            changeFrequency: "daily",
            priority: 0.5,
            alternates: {
                languages: buildLanguageAlternates(`/projects/${project.slug}`),
            },
        }))
    )

    return [...staticEntries, ...projectEntries]
}
