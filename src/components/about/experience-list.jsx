import Chip from "../ui/chip"
import Dither from "../three/dither"
import Button from "../ui/button"
import { Icons } from "@/config/icons"
import { getExperience } from "@/actions/api"

export default async function ExperienceList({ language }) {

    const { data: experiences } = await getExperience({ lang: language.lang, revalidate: 3600 })

    return (
        <div className="experience__list">
            {
                experiences ?
                    experiences.length !== 0 ?
                        experiences.map((experience, k) => (
                            <div className="experience__item" key={k}>
                                <div className="experience__item-date">
                                    <span>{experience.year}</span>
                                </div>
                                <div className="experience__item-content">
                                    <div className="experience__item-title title">
                                        <h3>{experience.title}{experience.organization ? ` — ${experience.organization}` : null}</h3>
                                    </div>
                                    <div className="experience__item-info info">
                                        <p>{experience.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        null
                    :
                    null
            }
        </div>
    )
}