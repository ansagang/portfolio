import { getAchievements } from "@/actions/api"
import Chip from "../ui/chip"
import Dither from "../three/dither"
import Button from "../ui/button"
import { Icons } from "@/config/icons"
import AchievementCard from "./achievement-card"

export default async function AchievementsList({ language }) {

    const { data: achievements } = await getAchievements({ lang: language.lang, revalidate: 3600 })

    return (
        <div className="achievements__list">
            {
                achievements ?
                    achievements.length !== 0 ?
                        achievements.map((achievement, k) => (
                            <AchievementCard key={k} language={language} achievement={achievement} />
                        ))
                        :
                        null
                    :
                    null
            }
        </div>
    )
}