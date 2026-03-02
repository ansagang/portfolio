"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProjectsRefreshOnBack() {
    const router = useRouter()

    useEffect(() => {
        const onPageShow = (e) => {
            // BFCache restore (Safari + sometimes others)
            if (e.persisted) router.refresh()
        }

        const onVisibility = () => {
            // Some browsers restore without persisted=true; this is a good fallback
            if (document.visibilityState === "visible") router.refresh()
        }

        window.addEventListener("pageshow", onPageShow)
        document.addEventListener("visibilitychange", onVisibility)

        return () => {
            window.removeEventListener("pageshow", onPageShow)
            document.removeEventListener("visibilitychange", onVisibility)
        }
    }, [router])

    return null
}