"use client"

import Dither from "../three/dither"
import Chip from "../ui/chip"


export default function Skills({ language, skills }) {
    return (
        <section className="skills white">

      {/* <Dither
    waveColor={[0.5,0.5,0.5]}
    disableAnimation={false}
    enableMouseInteraction
    mouseRadius={0.3}
    colorNum={10}
    waveAmplitude={0.3}
    waveFrequency={2}
    waveSpeed={0.05}
  /> */}
            <div className="container">
                <div className="skills__inner inner">
                    <div className="skills__title title">
                        <h2>{language.app.pages.about.sections.skills.title}</h2>
                    </div>
                    <div className="skills__list">
                        {
                            skills ?
                                skills.length !== 0 ?
                                    skills.map((skill, k) => (
                                        <>
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
                                            </div>
                                            <hr />
                                        </>
                                    ))
                                    :
                                    null
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}