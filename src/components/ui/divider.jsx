"use client"

import useScrollPosition from "@/hooks/use-scroll-position"
import Image from "next/image"

export default function Divider() {

    const scrollPos = useScrollPosition()

    console.log(scrollPos);
    

    return (
        <div style={{transform: `translate(${scrollPos.scrollY}px, 0)`}}  className="divider">
            {/* <Image width={1} height={1} unoptimized src={'/images/skills-banner.png'} /> */}
        </div>
    )
}