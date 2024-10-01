"use client"

import Image from "next/image"
import Words from "../three/words"
import Link from "next/link"
import Button from "../ui/button"

export default function NotFound({ language }) {
    return (
        <section className="not-found">
            <div className="container">
                <div className="not-found__inner">
                    <div className="not-found__visual">
                        <div className="not-found__visual-digit">
                            <h1>4</h1>
                        </div>
                        <div className="not-found__visual-circle"></div>
                        <div className="not-found__visual-digit">
                            <h1>4</h1>
                        </div>
                    </div>
                    <div className="not-found__content">
                        <div className="not-found__title title">
                            <h2>{language.app.pages.notFound.meta.title}</h2>
                        </div>
                        <div className="not-found__info info">
                            <p>`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi sunt possimus sint aspernatur quis.</p>
                        </div>
                        <Button type={'primary'} href={'/'}>Go back</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}