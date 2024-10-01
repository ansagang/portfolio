"use client"

import Image from "next/image"
import Link from "next/link"
import Chip from "./chip"

export default function BlogCard({ className, active, id, info = null, title, picture, ...props }) {

    return (
        <Link href={`/blog/${id}`} className={active ? `blog-card ${className} show` : `blog-card ${className}`} {...props}>
            <div className="blog-card__visual">
                <Image src={picture} width={1} height={1} unoptimized={true} />
            </div>
            <div className="blog-card__bottom">
                <div className="blog-card__content">
                    <div className="blog-card__title title">
                        <h3>{title}</h3>
                    </div>
                    <div className="blog-card__info info">
                        <p>{info}</p>
                    </div>
                </div>

                <div className="blog-card__chips">
                        <Chip type={'secondary'} className={'blog-card__chip'}>Tag</Chip>
                        <Chip type={'secondary'} className={'blog-card__chip'}>Tag</Chip>
                    </div>
            </div>
        </Link>
    )
}