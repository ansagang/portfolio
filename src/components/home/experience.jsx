import { getExperience } from "@/actions/api"
import Chip from "../ui/chip"


export default async function Experience({ language }) {

    const { data: experiences } = await getExperience({ lang: language.lang, revalidate: 3600 }) ?? {}
    const experience = experiences?.length > 0 ? experiences[experiences.length - 1] : null

    return (
        <div className="block__content-currently">
            {
                experience ?
                    <div className="currently__item">
                        <Chip className='currently__card-date' type="secondary"><div className="currently__card-date_dot"></div>{language.app.pages.home.sections.experience.button}</Chip>
                        <div className="currently__card">
                            <div className="currently__card-content">
                                <div className="currently__card-title title">
                                    <h3>
                                        {experience.title}
                                    </h3>
                                </div>
                                {
                                    experience.organization &&
                                    <div className="currently__card-org">
                                        <p>{experience.organization}</p>
                                    </div>
                                }
                                <div className="currently__card-info info">
                                    <p>{experience.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}