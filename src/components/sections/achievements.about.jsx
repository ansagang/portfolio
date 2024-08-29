"use client"

import Image from "next/image"
import Link from "next/link"

export default function Achievements({language}) {
    return (
        <div className="achievements">
            <div className="container">
                <div className="achievements__inner inner">
                    <div className="achievemenets__title title">
                        <h2>Achievements</h2>
                    </div>
                    <div className="achievements__list">
                        <div className="achievements__item">
                            <div className="achievements__item-left">
                                <div className="achievements__item-picture">
                                    <Image width={1} height={1} unoptimized src={'https://infomatrix.asia/general/images/main.png'} />
                                </div>
                            </div>
                            <div className="achievements__item-right">
                                <div className="achievements__item-title title">
                                    <h3>Finalist</h3>
                                </div>
                                <div className="achievements__item-info info">
                                    <p>Infomatrix</p>
                                </div>
                            </div>
                        </div>
                        <div className="achievements__item">
                            <Link href={'https://infomatrix.asia/'} className="achievements__item-left">
                                <div className="achievements__item-picture">
                                    <Image width={1} height={1} unoptimized src={'https://infomatrix.asia/general/images/main.png'} />
                                </div>
                            </Link>
                            <div className="achievements__item-right">
                                <div className="achievements__item-title title">
                                    <h3>Finalist</h3>
                                </div>
                                <div className="achievements__item-info info">
                                    <p>Infomatrix</p>
                                </div>
                            </div>
                        </div>
                        <div className="achievements__item">
                            <div className="achievements__item-left">
                                <div className="achievements__item-picture">
                                    <Image width={1} height={1} unoptimized src={'https://infomatrix.asia/general/images/main.png'} />
                                </div>
                            </div>
                            <div className="achievements__item-right">
                                <div className="achievements__item-title title">
                                    <h3>Finalist</h3>
                                </div>
                                <div className="achievements__item-info info">
                                    <p>Infomatrix</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}