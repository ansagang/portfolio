"use client"

import { Icons } from "@/config/icons";
import { yearsSince } from "@/lib/utils";

import useInView from "@/hooks/use-in-view";
import IncrementingNumber from "@/components/ui/increment-number";

export default function AboutMe({ language }) {

    const yearsPassed = yearsSince(2020)
    const [titleRef, titleInView] = useInView(false)
    const [statsRef, statsInView] = useInView(false)

    return (
        <section className="block">
            <div className="container__fluid">
                <div className="block__inner inner">
                    <div className="block__heading">
                        <div className="block__heading-title title">
                            <h2>{language.app.pages.about.meta.title}</h2>
                        </div>
                    </div>
                    <div className="block__content">
                        <div data-text={language.app.pages.home.sections.about.title} ref={titleRef} className={titleInView ? "block__content-title title animation__text active" : "block__content-title title animation__text"}>
                            <h3>{language.app.pages.home.sections.about.title}</h3>
                        </div>
                        <div className="block__content-info info">
                            <p>{language.app.pages.home.sections.about.info}</p>
                        </div>
                        <div className="block__content-stats" ref={statsRef}>
                            <div className="block__content-stat">
                                <div className="block__content-stat_number">
                                    {
                                        statsInView ?
                                            <span><IncrementingNumber end={yearsPassed} /></span>
                                            :
                                            <span>0</span>
                                    }
                                </div>
                                <div className="block__content-stat_title title">
                                    <h4>{language.app.pages.home.sections.about.yearsInDev}</h4>
                                </div>
                            </div>
                            <div className="block__content-stat">
                                <div className="block__content-stat_number">
                                    {
                                        statsInView ?
                                            <span><IncrementingNumber end={30} />+</span>
                                            :
                                            <span>0+</span>
                                    }
                                </div>
                                <div className="block__content-stat_title title">
                                    <h4>{language.app.pages.home.sections.about.completedProjects}</h4>
                                </div>
                            </div>
                            <div className="block__content-stat">
                                <div className="block__content-stat_number">
                                    <Icons.infinity width="50px" height="50px" />
                                </div>
                                <div className="block__content-stat_title title">
                                    <h4>{language.app.pages.home.sections.about.reviewsGiven}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}