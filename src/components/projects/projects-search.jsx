"use client"

import { useCallback, useEffect, useState } from "react"
import Input from "../ui/input"
import useDebounce from "@/hooks/use-debounce"
import { useRouter, useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { revalidateData } from "@/actions/actions"

export default function ProjectsSearch({ language, searchParams }) {

    const searchQ =  searchParams?.search ? searchParams.search : ''
    const searchParam = useSearchParams()

    const [search, setSearch] = useState(searchQ)

    const debouncedSearch = useDebounce(search, 500)

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
        if (search) {
            router.push(pathname + '?' + createQueryString('search', search))
            revalidateData('projects')
        } else {
            router.push(pathname + '?' + createQueryString('search'))
        }
    }, [debouncedSearch])

    return (
        <div className="projects__search">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} type={'search'} placeholder={language.app.labels.searchProjects} />
        </div>
    )
}