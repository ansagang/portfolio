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
    const data = await getProject({ lang: language.lang, slug: slug })

    if (data) {
        return {
            title: data.data.title
        }
    }
}

export default async function ProjectPage({ params }) {
    const { slug } = params
    const language = await getLanguage({})
    const { data: project } = await getProject({ lang: language.lang, slug: slug, revalidate: 3600 })
    const {data: video} = await getProjectMedia(project.video)

    if (!project) {
        notFound()
    }

    return (
        <Project project={project} language={language} video={video}/>
    )
}