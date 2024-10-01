"use client"

import { Icons } from "@/config/icons";

import useInView from "@/hooks/use-in-view";
import BlogCard from "../ui/blog-card";
import Button from "../ui/button";

export default function Blog({ language }) {

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
                            <BlogCard info={'Bla bla bvla'} style={{transitionDelay: '0s'}} className={inView ? 'active animation__up' : 'animation__up'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?cs=srgb&dl=pexels-pixabay-53435.jpg&fm=jpg'} />
                            <BlogCard style={{transitionDelay: '0.5s'}} className={inView ? 'active animation__up' : 'animation__up'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e2422641871883.57b7605716279.png'} />
                            <BlogCard style={{transitionDelay: '1s'}} className={inView ? 'active animation__up' : 'animation__up'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'https://symbolsage.com/wp-content/uploads/2020/08/gray-color-in-nature.jpg'} />
                        </div>
                        <Button onClick={() => router.push('/blog')} type={'secondary'} className={'block__content-button'}>{language.app.buttons.otherArticles}<Icons.arrow /></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}