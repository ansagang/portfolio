"use client"

import { Icons } from "@/config/icons";
import useInView from "@/hooks/use-in-view";
import Words from "../three/words";

export default function AboutMe({ language }) {

    const [ref, inView] = useInView(true)

    return (
        <section className="about">
            <div className="container__fluid">
                <div className="about__inner inner">
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
                            <Words language={language} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}