import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, TrackballControls } from '@react-three/drei'
import { randomWord } from '@/lib/utils'

function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = { font: '/fonts/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover

    // Tie component to the render-loop
    useFrame(({ camera }) => {
        // Make text face the camera
        ref.current.quaternion.copy(camera.quaternion)
        // Animate font color
        // ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    })
    return <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps} children={children} />
}

function Cloud({ count = 8, radius = 22, language }) {
    // Create a count x count random words with spherical distribution
    const getRandomWord = randomWord(language.app.pages.about.sections.about.words)
    const words = useMemo(() => {
        const temp = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count
        for (let i = 1; i < count + 1; i++)
            // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
            for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), getRandomWord()])
        return temp
    }, [count, radius, language])
    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function Words({ language, count, radius, ...props }) {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 70 }} {...props}>
            <fog attach="fog" args={['#000000', 0, 80]} />
            <Cloud language={language} count={count} radius={radius} />
            <TrackballControls mouseButtons={{RIGHT: null, LEFT: THREE.MOUSE.LEFT}} />
        </Canvas>
    )
}
