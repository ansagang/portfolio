"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Input from "../ui/input"
import Select from "../ui/select"
import { slugify } from "@/lib/utils"
import Chip from "../ui/chip"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import SkeletonChip from "../ui/skeleton-chip"
import SkeletonCategories from "../ui/skeleton-categories"
import { getProjects } from "@/actions/api"
import useDebounce from "@/hooks/use-debounce"

export default function FilterProjects({ language, searchQ, categoryQ, limitQ, sortQ }) {


    const sortOptions = [
        {
            title: language.app.labels.sortByNewest,
            code: "created_at",
            ascending: 'desc'
        },
        {
            title:language.app.labels.sortByOldest,
            code: "created_at",
            ascending: 'asc'
        }
    ]

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



    const [search, setSearch] = useState(searchQ)
    const [sort, setSort] = useState(sortQ ? sortOptions.find((item) => item.code == sortQ.code) : sortOptions[0])
    const [limit, setLimit] = useState(limitQ)
    const [category, setCategory] = useState(categoryQ)

    const categoryOptions = []

    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        if (sort) {
            router.push(pathname + '?' + createQueryString('sort', sort.code + '.' + sort.ascending))
        } else {
            router.push(pathname + '?' + createQueryString('sort'))
        }
    }, [sort, language])

    useEffect(() => {
        if (category) {
            router.push(pathname + '?' + createQueryString('category', category))
        } else {
            router.push(pathname + '?' + createQueryString('category'))
        }
    }, [category, language])

    const [categories, setCategories] = useState()
    useEffect(() => {
        async function get() {
            const { facets: facets } = await getProjects({ lang: language.lang })
            if (facets) {
                setCategories(facets)
            }
        }

        get()
    }, [language])

    const debouncedSearch = useDebounce(search, 1000)

    useEffect(() => {
        if (search) {
            router.push(pathname + '?' + createQueryString('search', search))
        } else {
            router.push(pathname + '?' + createQueryString('search'))
        }
    }, [debouncedSearch, language])

    return (
        <div className="projects__list-filters">
            <div className="projects__list-filter_up">
                <div className="projects__list-filter_search">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} type={'search'} placeholder={language.app.labels.searchProjects} />
                </div>
                <div className="projects__list-filter_select">
                    <Select setActiveOption={setSort} activeOption={sort} options={sortOptions} />
                </div>
            </div>
            <div className="projects__list-filter_down">
                {
                    categories ?
                        categories.length !== 0 ?
                            categories.map((item) => (
                                <Chip onClick={() => {
                                    if (category == item.code) {
                                        setCategory()
                                    } else {
                                        setCategory(item.code)
                                    }
                                }} type={'primary'} active={categoryQ === item.code} className="projects__list-filter_chip">{item.title}</Chip>
                            ))
                            :
                            null
                        :
                        <SkeletonCategories count={10} />
                }
            </div>
        </div>
    )
}