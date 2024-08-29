"use client"

import { Icons } from "@/config/icons";
import useInView from "@/hooks/use-in-view";
import Words from "../three/words";
import Image from "next/image";

export default function AboutMe({ language }) {

    const [ref, inView] = useInView(false)

    return (
        <section className="about">
            <div className="container">
                <div className="about__inner inner__big">
                    {/* <div className="about__banner black">
                        <div className="about__left">
                            <div className="about__left-content">
                                <div className="about__left-title title">
                                    <h2>{language.app.pages.about.meta.title}</h2>
                                </div>
                                <div className="about__left-info info">
                                    <p>Best designs for web developer bla bawawfa awfawf awf awfa wfawfawfawfawaw fa wfawf aw fa wfa wfaw faw fawfawfawfawfawfa</p>
                                    <p>Developer Best designs for Web Developer Best designs for Web Developer Best designs for Web
                                        Best designs for Web Developer Best designs for Web Developer Best designs for Web Developer Best designs for Web Developer Best designs for Web </p>
                                </div>
                            </div>
                        </div>
                        <div className="about__right">
                            <div className="about__right-visual">
                                <Words count={8} radius={20} language={language} />
                            </div>
                        </div>
                    </div> */}
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
                            <h2>Born in Astana, Kazakhstan. I've spent the past 4+ years collaborating with VC-backed products on branding, websites, apps, and marketing.</h2>
                            <h2>I join forces with founders to create compelling stories and digital experiences. Ones that make their products shine, resonate with users, and attract more investors.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}