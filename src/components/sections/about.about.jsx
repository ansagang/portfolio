"use client"

import useInView from "@/hooks/use-in-view";
import Image from "next/image";

export default function AboutMe({ language }) {

    const [ref, inView] = useInView(false)

    return (
        <section className="about">
            <div className="container">
                <div className="about__inner inner__big">
                    <div className="about__visual" ref={ref}>
                        <div style={{ transitionDelay: '0s' }} className={inView ? "about__picture active animation__up" : "about__picture animation__up"}>
                            <div className="about__picture-one">
                                <Image width={1} height={1} unoptimized={true} src={'/images/about-one.jpeg'} />
                            </div>
                        </div>
                        <div style={{ transitionDelay: '0.5s' }} className={inView ? "about__picture active animation__up" : "about__picture animation__up"}>
                            <div className="about__picture-two">
                                <Image width={1} height={1} unoptimized={true} src={'/images/about-two.jpeg'} />
                            </div>
                        </div>
                    </div>
                    <div className="about__content">
                        <div className="about__title title">
                            <h2>{language.app.pages.about.sections.about.info1}</h2>
                            <h2>{language.app.pages.about.sections.about.info2}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}