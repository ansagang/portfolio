"use client"

import { Icons } from "@/config/icons";

import useInView from "@/hooks/use-in-view";
import BlogCard from "../ui/blog-card";
import Button from "../ui/button";

export default function Blog({ language, blogs }) {

    const [cardRef, inView] = useInView(false)


    return (
        <section className="block">
            <div className="container__fluid">
                <div className="block__inner inner">
                    <div className="block__heading">
                        <div className="block__heading-title title">
                            <h2>{language.app.pages.blog.meta.title}</h2>
                        </div>
                    </div>
                    <div className="block__content">
                        <div ref={cardRef} className="block__content-articles">
                            {
                                blogs ?
                                    blogs.length !== 0 ?
                                        blogs.map((blog, k) => (
                                            <BlogCard key={k} info={blog.description} style={{ transitionDelay: `${0.1 * k}s` }} className={inView ? 'active animation__up' : 'animation__up'} id={blog.id} title={blog.title} picture={blog.banner} />
                                        ))
                                        :
                                        null
                                    :
                                    null
                            }
                        </div>
                        <Button onClick={() => router.push('/blog')} type={'secondary'} className={'block__content-button'}>{language.app.buttons.otherArticles}<Icons.arrow /></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}