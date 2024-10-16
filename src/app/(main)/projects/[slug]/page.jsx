import { getProjectMedia } from "@/actions/actions"
import { getProject, getProjects } from "@/actions/api"
import Project from "@/components/sections/project.project"
import { getLanguage } from "@/lib/get-language"
import { notFound } from "next/navigation"

// export async function generateStaticParams() {
//     const { data: projects } = await getProjects({})

//     return projects.map((project) => ({
//         slug: project.slug,
//     }))
// }

export async function generateMetadata({ params }) {

    const { slug } = params
    const language = await getLanguage({})
    const {data: project} = await getProject({ lang: language.lang, slug: slug, revalidate: 0 })

    if (project) {
        return {
            title: project.title
        }
    }
}

export default async function ProjectPage({ params }) {
    const { slug } = params
    const language = await getLanguage({})
    const { data: project } = await getProject({ lang: language.lang, slug: slug, revalidate: 0 })

    if (!project) {
        notFound()
    }

    return (
        <Project project={project} language={language} />
    )
}