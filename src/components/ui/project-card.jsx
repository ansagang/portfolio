import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import { getMedia } from "@/actions/api"
import Image from "next/image"

export default async function ProjectCard({ project, tilt, ...props }) {

    const {data: banner} = await getMedia({media: project.banner, revalidate: 3600})            

    return (
        <div className="project-card" {...props}>
            <Link className="card" href={`/projects/${project.slug}`}>
                {
                    // tilt ?
                        <TiltCard>
                            {banner && <Image className="project-card__visual" alt="banner" src={banner} width={1} height={1} unoptimized/>}
                        </TiltCard>
                        // :
                        // <Image className="project-card__visual" src={banner} />
                }
            </Link>
            <div className="project-card__content">
                <div className="project-card__title title">
                    <h3>{project.title}</h3>
                </div>
                <div className="project-card__info info">
                    <p>{project.description}</p>
                </div>
            </div>
        </div>
    )
}