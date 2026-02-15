"use client"

import { Icons } from "@/config/icons"
import Dither from "../three/dither"
import Chip from "../ui/chip"
import { useState } from "react"
import SpotlightCard from "../ui/spotlight-card"

export default function AchievementCard({ language, achievement }) {

    // const description = achievement.description.

    const [spotlightColor, setSpotlightColor] = useState()

    function randomColor() {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        setSpotlightColor(`rgba(${r}, ${g}, ${b}, 0.45)`)
    }

    return (
        <SpotlightCard spotlightColor={spotlightColor} className="achievement__card white card" onMouseLeave={() => {
            setSpotlightColor()
        }} onMouseEnter={() => {
            randomColor()
        }}>
            <div className="achievement__card-content">
                <div className="achievement__card-title title">
                    <h3>{achievement.title} — {achievement.year}</h3>
                </div>
                <div className="achievement__card-info info">
                    <p>{achievement.description}</p>
                </div>
            </div>
            <div className="achievement__card-buttons">
                {
                    achievement.organization ?
                        <Chip className={'achievement__card-button'} type='secondary'><a href={achievement.organization}>{language.app.buttons.organization}</a><Icons.arrow /></Chip>
                        :
                        null
                }
            </div>
        </SpotlightCard>
    )
}