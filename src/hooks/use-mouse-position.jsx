"use client"

import { useState, useEffect } from "react"

function useMousePosition() {
    const [mouseY, setMouseY] = useState(0)
    const [mouseX, setMouseX] = useState(0)

    useEffect(() => {
        window.addEventListener('mousemove', (e) => getMouse(e))

        return () => window.addEventListener('mousemove', (e) => getMouse(e))
    })

    const getMouse = (e) => {
        setMouseY(e.y)
        setMouseX(e.x)
    }

    return {
        mouseY,
        mouseX
    }

}

export default useMousePosition