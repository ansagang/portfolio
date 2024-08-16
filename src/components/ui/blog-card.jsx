"use client"

import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ className, id, title, picture, ...props }) {

    return (
        <Link href={`/blog/${id}`} className={`blog-card ${className}`} {...props}>
            <div className="blog-card__visual">
                <Image src={picture} width={1} height={1} unoptimized={true} />
            </div>
            <div className="blog-card__content">
                <div className="blog-card__title title">
                    <h3>{title}</h3>
                </div>
            </div>
        </Link>
    )
}