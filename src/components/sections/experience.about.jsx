"use client"

import { Icons } from "@/config/icons"
import { useState } from "react"

export default function Experience({ language, experience }) {

    const [active, setActive] = useState()

    return (
        <section className="experience">
            <div className="container">
                <div className="experience__inner inner__small">
                    <div className="experience__title title">
                        <h2>{language.app.pages.about.sections.experience.title}</h2>
                    </div>
                    <div className="experience__list">
                        {
                            experience ?
                                experience.length !== 0 ?
                                    experience.map((item, k) => (
                                        <div key={k} className={active === k ? "experience__item active" : "experience__item"} onClick={() => {
                                            if (active !== k) {
                                                setActive(k)
                                            } else {
                                                setActive()
                                            }
                                        }}>
                                            <div className="experience__item-left">
                                                <div className="experience__item-year">
                                                    <span>{item.year}</span>
                                                </div>
                                            </div>
                                            <div className="experience__item-right">
                                                <div className="experience__item-visible">
                                                    <div className="experience__item-title title">
                                                        <h3>{item.title}</h3>
                                                    </div>
                                                    <div className="experience__item-description info">
                                                        <p>{item.occupation} - {item.location}</p>
                                                    </div>
                                                    <div className="experience__item-arrow">
                                                        <Icons.downArrow />
                                                    </div>
                                                </div>
                                                <div className="experience__item-invisible">
                                                    <div className="experience__item-details info">
                                                        <p>{item.description}</p>
                                                    </div>
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
                </div>
            </div>
        </section>
    )
}