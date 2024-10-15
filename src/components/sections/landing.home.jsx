"use client"

import Scene from "@/components/three/landing-scene";
import { Icons } from "@/config/icons";
import useInView from "@/hooks/use-in-view";

export default function Landing({ language }) {

    const [ref, inView] = useInView(true)

    return (
        <section className="landing">
                <Scene ref={ref} quantity={65} inView={inView} />
            <div className="container__mini">
                <div className="landing__inner inner__big">
                    <div className="landing__signature">
                        <Icons.signature />
                    </div>
                    <div className="landing__title title">
                        <h1>{language.app.pages.home.sections.landing.title}</h1>
                    </div>
                    <div className="landing__info info">
                        <p>{language.app.pages.home.sections.landing.info}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}