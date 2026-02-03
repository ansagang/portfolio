"use client"

import useInView from "@/hooks/use-in-view"
import Image from "next/image"

export default function AboutVisual({ language }) {

    const [ref, inView] = useInView(false)

    return (
        <div className="about__visual" ref={ref}>
            <div style={{ transitionDelay: '0s' }} className={inView ? "about__picture active animation__up" : "about__picture animation__up"}>
                <div className="about__picture-one">
                    <Image fill alt="me" unoptimized={true} src={'/images/about-one.jpeg'} />
                </div>
            </div>
            <div style={{ transitionDelay: '0.5s' }} className={inView ? "about__picture active animation__up" : "about__picture animation__up"}>
                <div className="about__picture-two">
                    <Image fill alt="me" unoptimized={true} src={'/images/about-two.jpeg'} />
                </div>
            </div>
        </div>
    )
}