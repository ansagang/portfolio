"use client"

import Image from "next/image"
import Words from "../three/words"
import Link from "next/link"
import Button from "../ui/button"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export default function NotFound({ language }) {

    const pathname = usePathname()
    const router = useRouter()

    return (
        <section className="not-found">
            <div className="container">
                <div className="not-found__inner">
                    <div className="not-found__visual">
                        <div className="not-found__visual-digit">
                            <h1>4</h1>
                        </div>
                        <div className="not-found__visual-circle"><Words count={5} radius={14} language={language} /></div>
                        <div className="not-found__visual-digit">
                            <h1>4</h1>
                        </div>
                    </div>
                    <div className="not-found__content">
                        <div className="not-found__title title">
                            <h2>{language.app.pages.notFound.meta.title}</h2>
                        </div>
                        <div className="not-found__info info">
                            <p>{language.app.pages.notFound.meta.description}: <code>{pathname}</code></p>
                        </div>
                        <Button onClick={() => router.back()} type={'primary'}>Go back</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}