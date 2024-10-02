"use client"

import { useEffect, useRef, useState } from "react"
import BlogCard from "../ui/blog-card"
import Slider from "../ui/slider"
import Carousel from "../ui/carousel"
import Chip from "../ui/chip"
import Image from "next/image"
import useInView from "@/hooks/use-in-view"
// import Swipe

export default function Gallery({ language }) {

    const blogs = [
        {
            id: 1,
            title: 'aa'
        },
        {
            id: 2,
            title: 'aa'
        },
        {
            id: 3,
            title: 'aa'
        },
        {
            id: 4,
            title: 'aa'
        },
        {
            id: 5,
            title: 'aa'
        },
        {
            id: 6,
            title: 'aa'
        },
        {
            id: 7,
            title: 'aa'
        },
        {
            id: 8,
            title: 'aa'
        }
    ]

    const [bannerRef, inView] = useInView()

    // const [blogNum, setBlogNum] = useState(4)
    // const [activeBlog, setActiveBlog] = useState([])
    // const [removeBlog, setRemoveBlog] = useState(0)

    // console.log(activeBlog, removeBlog);



    // useEffect(() => {
    //     const setBlogs = activeBlog
    //     blogs.forEach((blog) => {
    //         setBlogs.push(blog.id)
    //     })
    //     setBlogs.splice(blogNum)
    //     setActiveBlog(setBlogs)
    // }, [])

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const newBlog = activeBlog
    //         newBlog.filter(blog => {
    //             newBlog.indexOf(blog) !== removeBlog
    //         })
    //         setActiveBlog(newBlog)
    //     }, 2000);

    //     console.log('aa');


    //     if (removeBlog !== blogs.length - 1) {
    //         setRemoveBlog(removeBlog + 1)
    //     } else {
    //         setRemoveBlog(0)
    //     }

    //     // Cleanup function to clear the interval when the component unmounts
    //     return () => clearInterval(intervalId);
    // }, []);



    return (
        <section className="gallery">
            <div className="container">
                <div className="gallery__inner inner">
                    <div ref={bannerRef} className={inView ? "gallery__banner white active" : "gallery__banner white"}>
                        <div className="gallery__content">
                            <div className="gallery__title title">
                                <h2>{language.app.pages.blog.meta.title}</h2>
                            </div>
                        </div>

                        <div className="gallery__filters">
                            <Chip active={true} type={'secondary'} className={'gallery__filter'}>Front-end</Chip>
                            <Chip type={'secondary'} className={'gallery__filter'}>Front-end</Chip>
                            <Chip type={'secondary'} className={'gallery__filter'}>Front-end</Chip>
                            <Chip type={'secondary'} className={'gallery__filter'}>Front-end</Chip>
                            <Chip type={'secondary'} className={'gallery__filter'}>Front-end</Chip>
                        </div>
                    </div>
                    <div className="gallery__list">
                        <div className="gallery__list title">
                            <h2>Front-end</h2>
                        </div>
                        <div className="gallery__blogs">
                            {/* <div className="gallery__blog">
                                <Image src={'/images/about-one.jpeg'} width={1} height={1} unoptimized={true} />
                            </div>
                            <div className="gallery__blog">
                                <Image src={'/images/about-one.jpeg'} width={1} height={1} unoptimized={true} />
                            </div>
                            <div className="gallery__blog">
                                <Image src={'/images/about-one.jpeg'} width={1} height={1} unoptimized={true} />
                            </div>
                            <div className="gallery__blog">
                                <Image src={'/images/about-one.jpeg'} width={1} height={1} unoptimized={true} />
                            </div>
                            <div className="gallery__blog">
                                <Image src={'/images/about-one.jpeg'} width={1} height={1} unoptimized={true} />
                            </div>
                            <div className="gallery__blog">
                                <Image src={'/images/about-one.jpeg'} width={1} height={1} unoptimized={true} />
                            </div> */}
                            <BlogCard className={'gallery__blog'} active={true} info={'Bla bla bvla'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYr7a1g0S9lgS8TONY6NEjaoHqw5FbHh1Sg&s'} />
                            <BlogCard className={'gallery__blog'} active={true} info={'Bla bla bvla'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'/images/blog__banner.png'} />

                            <BlogCard className={'gallery__blog'} active={true} info={'Bla bla bvla'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'/images/blog__banner.png'} />

                            <BlogCard className={'gallery__blog'} active={true} info={'Bla bla bvla'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'/images/blog__banner.png'} />

                            <BlogCard className={'gallery__blog'} active={true} info={'Bla bla bvla'} id={1} title={'Best Design Tips for Front-end Developer'} picture={'/images/blog__banner.png'} />

                            {/* <Slider className="gallery__slider " show={4}> 
                            <div className="gallery__blogs ">

                                <BlogCard className={'gallery__blog active '} info={'yers'} title={'9'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />
                                <BlogCard className={'gallery__blog active '} info={'yers'} title={'8'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                                <BlogCard className={'gallery__blog active '} info={'yers'} title={'7'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />
                                <BlogCard className={'gallery__blog active '} info={'yers'} title={'6'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                                <BlogCard className={'gallery__blog active '} info={'yers'} title={'5'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                                <BlogCard className={'gallery__blog active '} info={'yers'} title={'4'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                            </div>

                        </Slider> */}
                            {/* <div ref={sliderRef} className="gallery__blogs">
                            <button onClick={() => slideLeft()}>Letf</button>
                            <button onClick={() => slideRight()}>right</button>
                            
                            <BlogCard className={'gallery__blog active'} info={'yers'} title={'9'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />
                            <BlogCard className={'gallery__blog active'} info={'yers'} title={'8'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                            <BlogCard className={'gallery__blog active'} info={'yers'} title={'7'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />
                            <BlogCard className={'gallery__blog active'} info={'yers'} title={'6'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                            <BlogCard className={'gallery__blog active'} info={'yers'} title={'5'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />

                            <BlogCard className={'gallery__blog active'} info={'yers'} title={'4'} picture={'https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg'} />
                        </div> */}
                            {/* <Carousel data={[{ image: "https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg" },
 { image: "https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg" }, 
 { image: "https://i1.sndcdn.com/avatars-Q1SnXp6Hd6TPbhEP-dwISow-t240x240.jpg" }]} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}