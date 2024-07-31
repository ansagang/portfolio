"use client"

import useMousePosition from "@/hooks/use-mouse-position"
import { useEffect, useState } from "react"

export default function Cursor() {
    const mouse = useMousePosition()

    // const [active, setActive] = useState(false)

    // const body = document.querySelector('body');

    // useEffect(() => {
    //     body.addEventListener('mouseleave', () => {
    //         setActive(false)
    //     })
    //     body.addEventListener('mouseenter', () => {
    //         setActive(true)
    //     })

    //     return () => {
    //         body.addEventListener('mouseleave', () => {
    //             setActive(false)
    //         })
    //     }
    // }, [mouse])

    // useEffect(() => {
    //     body.addEventListener('mouseenter', () => {
    //         setActive(true)
    //     })

    //     return () => {
    //         body.addEventListener('mouseenter', () => {
    //             setActive(true)
    //         })
    //     }
    // })

    return (
        <div style={{ transform: `translate(${mouse.mouseX}px, ${mouse.mouseY}px)` }} className={"cursor active"}></div>
    )
}