"use client"

import useDebounce from "@/hooks/use-debounce"
import useInView from "@/hooks/use-in-view"
import useScrollPosition from "@/hooks/use-scroll-position"
import { useEffect, useRef, useState } from "react"

function ExperienceItem({ experience }) {
    const [itemRef, inView] = useInView(false, 1, '0px 0px -200px 0px')

    return (
        <div ref={itemRef} className={inView ? "experience__item active" : "experience__item"}>
            <span className="experience__item-circle" aria-hidden="true" />

            <div className="experience__card-date">
                <span>{experience.year}</span>
            </div>
            <div className="experience__card">
                <div className="experience__card-content">
                    <div className="experience__card-title title">
                        <h3>
                            {experience.title}
                        </h3>
                    </div>
                    {
                        experience.organization &&
                        <div className="experience__card-org">
                            <p>{experience.organization}</p>
                        </div>
                    }
                    <div className="experience__card-info info">
                        <p>{experience.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ExperienceList({ experiences = [] }) {

    const {scrollY} = useScrollPosition()
    const listRef = useRef(null)
    const [lineHeight, setLineHeight] = useState(0)

    useEffect(() => {
        if (!listRef.current) return
        if (typeof window === "undefined") return

        const rect = listRef.current.getBoundingClientRect()
        const maxH = Math.max(rect.height - 8, 0)
        const scrolled = Math.max(0, window.innerHeight * 0.4 - rect.top)
        const progress = Math.min(1, Math.max(0, scrolled / rect.height))
        setLineHeight(maxH * progress)
    }, [scrollY])


    return (
        <div className="experience__timeline">
            <div className="experience__line"></div>
            <div
                className="experience__line-progress"
                style={{ height: `${lineHeight}px` }}
            ></div>
            <div ref={listRef} className="experience__list">
                {
                    experiences ?
                        experiences.length !== 0 ?
                            experiences.map((experience, k) => (
                                <ExperienceItem experience={experience} key={k} />
                            ))
                            :
                            null
                        :
                        null
                }
            </div>
        </div>
    )
}