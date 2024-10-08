import { getProject, getProjects } from "@/actions/api"
import Project from "@/components/sections/project.project"
import { getLanguage } from "@/lib/get-language"
import { notFound } from "next/navigation"

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
    const data = await getProject({ lang: language.lang, slug: slug })

    if (!data) {
        notFound()
    }

    return (
        <Project project={data.data} language={language} />
    )
}