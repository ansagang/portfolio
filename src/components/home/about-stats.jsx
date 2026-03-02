"use client"

import { Icons } from "@/config/icons";
import { yearsSince } from "@/lib/utils";

import useInView from "@/hooks/use-in-view";
import IncrementingNumber from "@/components/ui/increment-number";

export default function AboutStats({ language }) {

    const [statsRef, statsInView] = useInView(false)
    const [titleRef, titleInView] = useInView(false)
    const yearsPassed = yearsSince(2020)

    return (
        <>
            <div data-text={language.app.pages.home.sections.about.title} ref={titleRef} className={titleInView ? "block__content-title title animation__text active" : "block__content-title title animation__text"}>
                <h3>{language.app.pages.home.sections.about.title}</h3>
            </div>
            <div className="block__content-info info">
                <p>{language.app.pages.home.sections.about.info}</p>
            </div>
        </>
    )
}