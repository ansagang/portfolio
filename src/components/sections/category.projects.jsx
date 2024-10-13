"use client"

import { useCallback, useEffect, useState } from "react"
import Chip from "../ui/chip"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { slugify } from "@/lib/utils"

export default function CategoryProjects({facets, categoryQ}) {


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
        <div className="projects__list-filter_down">
            {
                facets ?
                    facets.length !== 0 ?
                        facets.map((facet) => (
                            <Chip onClick={() => {
                                if (category) {
                                    setCategory()
                                } else {
                                    setCategory(facet.code)
                                }
                            }} type={'primary'} active={categoryQ === facet.code} className="projects__list-filter_chip">{facet.title}</Chip>
                        ))
                        :
                        null
                    :
                    null
            }
        </div>
    )
}