"use client"

import useInView from "@/hooks/use-in-view"
import Chip from "../ui/chip"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function BannerProjects({ facets, language, categoryQ }) {

    const [bannerRef, inView] = useInView()
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name, value) => {
            if (value) {
                const params = new URLSearchParams(searchParams.toString())

                params.set(name, value)

                return params.toString()
            } else {
                const params = new URLSearchParams(searchParams.toString())
                params.delete(name)

                return params.toString()
            }
        },
        [searchParams]
    )

    const [category, setCategory] = useState(categoryQ)

    useEffect(() => {
        if (category) {
            router.push(pathname + '?' + createQueryString('category', category))
        } else {
            router.push(pathname + '?' + createQueryString('category'))
        }
    }, [category])

    return (
        <div ref={bannerRef} className={inView ? "projects__banner white active" : "projects__banner white"}>
            <div className="projects__content">
                <div className="projects__title title">
                    <h2>{language.app.pages.projects.meta.title}</h2>
                </div>
            </div>
            <div className="projects__filters">
                {
                    facets ?
                        facets.length !== 0 ?
                            facets.map((facet) => (
                                <Chip onClick={() => {
                                    if (category == facet.code) {
                                        setCategory()
                                    } else {
                                        setCategory(facet.code)
                                    }
                                }} type={'secondary'} active={categoryQ === facet.code} className="projects__list-filter_chip">{facet.title}</Chip>
                            ))
                            :
                            null
                        :
                        null
                }
            </div>
        </div>
    )
}