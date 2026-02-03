import { getSkills } from "@/actions/api"
import Chip from "../ui/chip"

export default async function SkillsList({ language }) {

    const { data: skills } = await getSkills({ lang: language.lang, revalidate: 3600 })

    return (
        <div className="skills__list">
            {
                skills ?
                    skills.length !== 0 ?
                        skills.map((skill, k) => (
                            <div key={k} className="skills__item">
                                <div className="skills__item-title title">
                                    <h1>{skill.title}</h1>
                                </div>
                                <div className="skills__item-chips">
                                    {
                                        skill.tags.map((tag, k) => (
                                            <Chip key={k} className={'skills__item-chip'} type={'secondary'}>{tag}</Chip>
                                        ))
                                    }
                                </div>
                                <hr />
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