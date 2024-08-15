"use client"

import Scene from "@/components/three/landing-scene";
import { Icons } from "@/config/icons";
import { Suspense } from "react";
import useInView from "@/hooks/use-in-view";

export default function Landing({ language }) {

    const [ref, inView] = useInView(true)

    return (
        <section className="landing">
            {/* <Suspense fallback={null}> */}
                <Scene ref={ref} quantity={65} inView={inView} />
            {/* </Suspense> */}
            <div className="container__mini">
                <div className="landing__inner inner__big">
                    <div className="landing__signature">
                        <Icons.signature />
                        {/* <svg viewBox="0 0 340 333">

                            <path class="path" fill="white" stroke="black" stroke-width="4" d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
  s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
  C46.039,146.545,53.039,128.545,66.039,133.545z"/>

                        </svg> */}
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