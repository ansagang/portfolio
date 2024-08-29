"use client"

import { HorizontalTiles } from "../three/horizontal-tiles"

export default function Gallery({language}) {
    return (
        <section className="gallery">
            <div className="container">
                <div className="gallery__inner inner__big">
                    <div className="gallery__title title">
                        <h1>Projects</h1>
                    </div>
                    <div className="gallery__info info">
                        <p>Here are some of my projecyts gallery</p>
                    </div>
                    <div className="gallery__visual">
                    </div>
                </div>
            </div>
        </section>
    )
}