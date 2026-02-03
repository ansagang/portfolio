"use client"

import { Icons } from "@/config/icons"
import Dither from "../three/dither"
import Chip from "../ui/chip"
import { useRef, useState } from "react"

export default function AchievementCard({ language, achievement }) {

    const cardRef = useRef()

    const amplitudes = [0.3]

    const [waveColor, setWaveColor] = useState([0.7, 0.7, 0.7])
    const [waveAmplitude, setWaveAmplitude] = useState(amplitudes[Math.floor(Math.random() * amplitudes.length)])
    return (
        <div ref={cardRef} className="achievement__card white" onMouseLeave={() => {
            setWaveColor([0.7, 0.7, 0.7])
        }} onMouseEnter={() => {
            setWaveColor([Math.random()+0.2, Math.random()+0.2, Math.random()+0.2])
        }}>
            <Dither
                waveColor={waveColor}
                disableAnimation={false}
                enableMouseInteraction
                mouseRadius={0.3}
                colorNum={6}
                waveAmplitude={waveAmplitude}
                waveFrequency={1}
                waveSpeed={0.05}
            />
            <div className="achievement__card-content">
                <div className="achievement__card-title title">
                    <h3>{achievement.title}, {achievement.year}</h3>
                </div>
                <div className="achievement__card-info info">
                    <p2>{achievement.description}</p2>
                </div>
            </div>
            <div className="achievement__card-buttons">
                {/* {
                    achievement.link ?
                        <Chip className={'achievement__card-button active'} type='blurred'><a href={achievement.link}>{language.app.buttons.view}</a></Chip>
                        :
                        null
                } */}
                {
                    achievement.organization ?
                        <Chip className={'achievement__card-button'} type='secondary'><a href={achievement.organization}>{language.app.buttons.organization}</a><Icons.arrow /></Chip>
                        :
                        null
                }
            </div>
        </div>
    )
}