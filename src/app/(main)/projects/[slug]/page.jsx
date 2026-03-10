import { getProject, getProjects } from "@/actions/api"
import Project from "@/components/sections/project.project"
import Button from "@/components/ui/button"
import Chip from "@/components/ui/chip"
import Video from "@/components/ui/video"
import { Icons } from "@/config/icons"
import { socials } from "@/config/socials"
import { getLanguage } from "@/lib/get-language"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {

    const { slug } = await params
    const language = await getLanguage({})
    const { data: project } = await getProject({ lang: language.lang, slug: slug, revalidate: 0 })

    if (project) {
        return {
            title: project.title,
            description: project.description
        }
    }
}

export default async function ProjectPage({ params }) {
    const { slug } = await params
    const language = await getLanguage({})
    const { data: project } = await getProject({ lang: language.lang, slug: slug, revalidate: 0 })

    if (!project) {
        notFound()
    }

    const social = socials.find((x) => x.title == 'Github')

    return (
        <section className="project">
            <div className="container">
                <div className="project__inner inner">
                    <div className="project__breadcrump info">
                        <p><Link href={'/projects'}>{language.app.pages.projects.meta.title}</Link></p>
                        <Icons.arrow />
                        <p>{project.title}</p>
                    </div>
                    <div className="project__container">
                        <div className="project__header">
                            <div className="project__header-left">
                                <div className="project__title title">
                                    <h1>{project.title}</h1>
                                </div>
                                <div className="project__info info">
                                    <p>{project.description}</p>
                                </div>
                            </div>
                            <div className="project__header-right">
                                <div className="project__buttons">
                                    {
                                        project.github && (
                                            <Button className={'project__button'} type={'primary'} href={project.github}><Image alt={social.title} width={1} height={1} unoptimized src={social.logo} />Github</Button>
                                        )
                                    }
                                    {
                                        project.link && (
                                            <Button type={'secondary'} href={project.link}>{language.app.pages.project.meta.title}<Icons.arrow /></Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <Video className="project__video video card" src={project} interactive={true} />
                    </div>
                    <div className="project__footer">
                        {
                            project.key_features && project.key_features.length > 0 ?
                                <div className="project__section">
                                    <div className="project__section-title title">
                                        <h2>{language.app.pages.project.sections.keyFeatures.title}</h2>
                                    </div>
                                    <div className="project__section-info info">
                                        <p>{language.app.pages.project.sections.keyFeatures.description}</p>
                                    </div>
                                    <div className="project__features">
                                        {
                                            project.key_features.map((feature, index) => (
                                                <div className="project__feature" key={index}>
                                                    <div className="project__feature-icon">
                                                        <span>✓</span>
                                                    </div>
                                                    <div className="project__feature-info info">
                                                        <p>{feature}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            project.tech_stack && project.tech_stack.length > 0 ?
                                <div className="project__section">
                                    <div className="project__section-title title">
                                        <h2>{language.app.pages.project.sections.techStack.title}</h2>
                                    </div>
                                    <div className="project__section-info info">
                                        <p>{language.app.pages.project.sections.techStack.description}</p>
                                    </div>
                                    <div className="project__techs">
                                        {
                                            project.tech_stack.map((tech, index) => (
                                                <Chip key={index}>{tech}</Chip>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}