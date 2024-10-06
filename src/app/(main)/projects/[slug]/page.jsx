import { getProject, getProjects } from "@/actions/api"
import Project from "@/components/sections/project.project"
import { getLanguage } from "@/lib/get-language"

async function staticParams() {
    const language = await getLanguage({})
    const { data: projects } = getProjects({ lang: language.lang })

    return projects.map((project) => ({
        id: project.id,
    }))
}

export const generateStaticParams = process.env.NODE_ENV === "production" ? staticParams : undefined;
export const dynamic = process.env.NODE_ENV === "production" ? 'auto' : 'force-dynamic';

export async function generateMetadata({ params }) {

    const { slug } = params
    const language = await getLanguage({})
    const { data: project } = await getProject({ lang: language.lang, slug: slug })

    return {
        title: project.title
    }
}

export default async function ProjectPage({ params }) {
    const { slug } = params
    const language = await getLanguage({})
    const { data: project } = await getProject({ lang: language.lang, slug: slug })

    return (
        <Project project={project} language={language} />
    )
}