"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function HeroProjects({ language }) {

    const [number, setNumber] = useState(6)
    const [randomNumber, setRandomNumber] = useState(null);

    // Function to pick a random number between 1 and maxNumber
    const pickRandomNumber = (maxNumber) => {
        const num = Math.floor(Math.random() * maxNumber) + 1;
        setRandomNumber(num);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            pickRandomNumber(number)
        }, 2000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="projects">
            <div className="container">
                <div className="projects__inner inner__big">
                    <div className="projects__left">
                        <div className="projects__content">
                            <div className="projects__title title">
                                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eius simil</h2>
                                <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa bland</h2>
                            </div>
                        </div>
                    </div>
                    <div className="projects__right">
                        <div className="projects__visual">
                            <div className={randomNumber === 1 ? "projects__visual-img active" : "projects__visual-img"}>
                                <Image width={1} height={1} unoptimized src={"https://cdn.prod.website-files.com/643f7373d3f6653157617339/650a831a122b388d02f5a641_ui-ux-design-agency-musemind.jpg"} />
                            </div>
                            <div className={randomNumber === 2 ? "projects__visual-img active" : "projects__visual-img"}>
                                <Image width={1} height={1} unoptimized src={"https://cdn.prod.website-files.com/643f7373d3f6653157617339/650a831a122b388d02f5a641_ui-ux-design-agency-musemind.jpg"} />
                            </div>
                            <div className={randomNumber === 3 ? "projects__visual-img active" : "projects__visual-img"}>
                                <Image width={1} height={1} unoptimized src={"https://cdn.prod.website-files.com/643f7373d3f6653157617339/650a831a122b388d02f5a641_ui-ux-design-agency-musemind.jpg"} />
                            </div>
                            <div className={randomNumber === 4 ? "projects__visual-img active" : "projects__visual-img"}>
                                <Image width={1} height={1} unoptimized src={"https://cdn.prod.website-files.com/643f7373d3f6653157617339/650a831a122b388d02f5a641_ui-ux-design-agency-musemind.jpg"} />
                            </div>
                            <div className={randomNumber === 5 ? "projects__visual-img active" : "projects__visual-img"}>
                                <Image width={1} height={1} unoptimized src={"https://cdn.prod.website-files.com/643f7373d3f6653157617339/650a831a122b388d02f5a641_ui-ux-design-agency-musemind.jpg"} />
                            </div>
                            <div className={randomNumber === 6 ? "projects__visual-img active" : "projects__visual-img"}>
                                <Image width={1} height={1} unoptimized src={"https://cdn.prod.website-files.com/643f7373d3f6653157617339/650a831a122b388d02f5a641_ui-ux-design-agency-musemind.jpg"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}