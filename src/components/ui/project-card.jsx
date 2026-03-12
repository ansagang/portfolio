import { TiltCard } from "@/components/ui/tilt-card"
import Link from "next/link"
import Video from "./video"
import { getMedia } from "@/actions/api"

export default async function ProjectCard({ project, tilt, ...props }) {

    const {data: video} = await getMedia({ media: project.video, revalidate: 3600 })
    const {data: banner} = await getMedia({media: project.banner, revalidate: 3600})            

    return (
        <div className="project-card" {...props}>
            <Link className="card" href={`/projects/${project.slug}`}>
                {
                    tilt ?
                        <TiltCard>
                            <Video className="project-card__visual" interactive={false} videoUrl={video} bannerUrl={banner} />
                        </TiltCard>
                        :
                        <Video className="project-card__visual" interactive={false} videoUrl={video} bannerUrl={banner} />
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