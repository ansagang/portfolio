"use client"

import { useCallback, useEffect, useState } from "react"
import Input from "../ui/input"
import useDebounce from "@/hooks/use-debounce"
import { useRouter, useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { revalidateData } from "@/actions/actions"
import Chip from "../ui/chip"
import { slugify } from "@/lib/utils"

export default function ProjectsChips({ language, searchParams, categories }) {

    const categoryQ = searchParams?.categories ? searchParams.categories.split(',') : ''
    const searchParam = useSearchParams()

    const [categoriesQ, setCategoriesQ] = useState(categoryQ)

    const router = useRouter()
    const pathname = usePathname()

    const createQueryString = useCallback(
        (name, value) => {
            if (value) {
                const params = new URLSearchParams(searchParam.toString())

                params.set(name, value)

                return params.toString()
            } else {
                const params = new URLSearchParams(searchParam.toString())
                params.delete(name)

                return params.toString()
            }
        },
        [searchParam]
    )


    useEffect(() => {
        if (categoriesQ) {
            const categorySlug = categoriesQ.join(',');
            router.push(pathname + '?' + createQueryString('categories', categorySlug))
        } else {
            router.push(pathname + '?' + createQueryString('categories'))
        }
    }, [categoriesQ])

    function updateCategory(category) {
        if (categoriesQ.includes(slugify(category))) {
            const arr = categoriesQ.filter((categoryQ) => categoryQ !== slugify(category))
            setCategoriesQ(arr)
        } else {
            setCategoriesQ([...categoriesQ, slugify(category)])
        }
    }

    return (
        <div className="projects__chips-container">
            <div className="projects__chips">
                {
                    categories ?
                        categories.length > 0 ?
                            categories.map((category, k) => (
                                <Chip key={k} active={categoriesQ.includes(slugify(category))} onClick={() => updateCategory(category)} className={'project__chip'} type="primary">{category}</Chip>
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