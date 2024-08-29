"use client"

import { Icons } from "@/config/icons"
import { useState } from "react"

export default function Experience({ language }) {

    const [active, setActive] = useState(0)

    return (
        <section className="experience">
            <div className="container">
                <div className="experience__inner inner">
                    <div className="experience__title title">
                        <h2>Experience</h2>
                    </div>
                    <div className="experience__list">
                        <div className={active === 1 ? "experience__item active" : "experience__item"} onClick={() => {
                            if (active !== 1) {
                                setActive(1)
                            } else {
                                setActive(0)
                            }
                        }}>
                            <div className="experience__item-left">
                                <div className="experience__item-year">
                                    <span>2019</span>
                                </div>
                            </div>
                            <div className="experience__item-right">
                                <div className="experience__item-visible">
                                    <div className="experience__item-title title">
                                        <h3>Front-end Developer</h3>
                                    </div>
                                    <div className="experience__item-description info">
                                        <p>Astana, Kazakhstan</p>
                                    </div>
                                    <div className="experience__item-arrow">
                                        <Icons.downArrow />
                                    </div>
                                </div>
                                <div className="experience__item-invisible">
                                    <div className="experience__item-details info">
                                        <p>I worked as ad awd lawpd lawpd lawpd awd awd aw awd awd awdawdawawdawdawdawdawdawd I worked as ad awd lawpd lawpd lawpd awd awd aw awd awd awdawdawawdawdawdawdawdawd</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={active === 2 ? "experience__item active" : "experience__item"} onClick={() => {
                            if (active !== 2) {
                                setActive(2)
                            } else {
                                setActive(0)
                            }
                        }}>
                            <div className="experience__item-left">
                                <div className="experience__item-year">
                                    <span>2019</span>
                                </div>
                            </div>
                            <div className="experience__item-right">
                                <div className="experience__item-visible">
                                    <div className="experience__item-title title">
                                        <h3>Front-end Developer</h3>
                                    </div>
                                    <div className="experience__item-description info">
                                        <p>Morrison Academy &ndash; Astana, Kazakhstan</p>
                                    </div>
                                    <div className="experience__item-arrow">
                                        <Icons.downArrow />
                                    </div>
                                </div>
                                <div className="experience__item-invisible">
                                    <div className="experience__item-details info">
                                        <p>I worked as ad awd lawpd lawpd lawpd awd awd aw awd awd awdawdawawdawdawdawdawdawd I worked as ad awd lawpd lawpd lawpd awd awd aw awd awd awdawdawawdawdawdawdawdawd</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience__item">
                            <div className="experience__item-left">
                                <div className="experience__item-year">
                                    <span>2019</span>
                                </div>
                            </div>
                            <div className="experience__item-right">
                                <div className="experience__item-visible">
                                    <div className="experience__item-title title">
                                        <h3>Front-end Developer</h3>
                                    </div>
                                    <div className="experience__item-description info">
                                        <p>Astana, Kazakhstan</p>
                                    </div>
                                    <div className="experience__item-arrow">
                                        <Icons.downArrow />
                                    </div>
                                </div>
                                <div className="experience__item-invisible">
                                    <div className="experience__item-details info">
                                        <p>I worked as ad awd lawpd lawpd lawpd awd awd aw awd awd awdawdawawdawdawdawdawdawd I worked as ad awd lawpd lawpd lawpd awd awd aw awd awd awdawdawawdawdawdawdawdawd</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}