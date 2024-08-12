"use client"

import { Icons } from "@/config/icons";
import { yearsSince } from "@/lib/utils";

export default function AboutMe({ language }) {

    const yearsPassed = yearsSince(2020)

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
                        <div className="block__content-title title">
                            <h3>I create an aesthetic design that users like at first sight and seamlessly integrates with business or product</h3>
                        </div>
                        <div className="block__content-info info">
                            <p>Every project is an opportunity to express myself and give people a cool product. I do what I love and it benefits me and the people around me. Making the best designs and exceeding market expectations. I am constantly evolving, helping other designers and writing a professional blog</p>
                        </div>
                        <div className="block__content-stats">
                            <div className="block__content-stat">
                                <div className="block__content-stat_number">
                                    <span>{yearsPassed}</span>
                                </div>
                                <div className="block__content-stat_title title">
                                    <h4>years in web development</h4>
                                </div>
                            </div>
                            <div className="block__content-stat">
                                <div className="block__content-stat_number">
                                    <span>30+</span>
                                </div>
                                <div className="block__content-stat_title title">
                                    <h4>completed projects</h4>
                                </div>
                            </div>
                            <div className="block__content-stat">
                                <div className="block__content-stat_number">
                                    <span>20+</span>
                                </div>
                                <div className="block__content-stat_title title">
                                    <h4>reviews given</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}