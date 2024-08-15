import * as THREE from 'three'
import { createContext, useMemo, useRef, useState, useContext, useLayoutEffect, forwardRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { QuadraticBezierLine, Text } from '@react-three/drei'
import { useDrag } from '@use-gesture/react'

const context = createContext()

const Circle = forwardRef(({ children, opacity = 1, radius = 0.05, segments = 32, color = '#ff1050', ...props }, ref) => (
    <mesh ref={ref} {...props}>
        <circleGeometry args={[radius, segments]} />
        <meshBasicMaterial transparent={opacity < 1} opacity={opacity} color={color} />
        {children}
    </mesh>
))

export function Nodes({ children, containerRef }) {
    const group = useRef()
    const [nodes, set] = useState([])
    const lines = useMemo(() => {
        const lines = []
        for (let node of nodes)
            node.connectedTo
                .map((ref) => [node.position, ref.current.position])
                .forEach(([start, end]) => lines.push({ start: start.clone().add({ x: 0.35, y: 0, z: 0 }), end: end.clone().add({ x: -0.35, y: 0, z: 0 }) }))
        return lines
    }, [nodes])
    useFrame((_, delta) => group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 10)))
    return (
        <context.Provider value={set}>
            <group ref={group}>
                {lines.map((line, index) => (
                    <group key={index}>
                        <QuadraticBezierLine key={index} {...line} color="white" dashed dashScale={50} gapSize={20} />
                        <QuadraticBezierLine key={index} {...line} color="white" lineWidth={0.5} transparent opacity={0.1} />
                    </group>
                ))}
            </group>
            {children}
            {lines.map(({ start, end }, index) => (
                <group key={index} position-z={1}>
                    <Circle radius={0} position={start} />
                    <Circle radius={0} position={end} />
                </group>
            ))}
        </context.Provider>
    )
}

export const Node = forwardRef(({ color = 'black', name, connectedTo = [], position = [0, 0, 0], ...props }, ref) => {
    const set = useContext(context)
    const { size, camera } = useThree()
    const [pos, setPos] = useState(() => new THREE.Vector3(...position))
    const state = useMemo(() => ({ position: pos, connectedTo }), [pos, connectedTo])

    const containerRef = props.containerRef; // Pass containerRef as a prop

    // Register this node on mount, unregister on unmount
    useLayoutEffect(() => {
        set((nodes) => [...nodes, state])
        return () => void set((nodes) => nodes.filter((n) => n !== state))
    }, [state, pos])

    // Drag n drop, hover
    const [hovered, setHovered] = useState(false)
    const bind = useDrag(({ down, xy: [x, y] }) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const adjustedX = x - rect.left
            const adjustedY = y - rect.top


            const clampedX = Math.max(0, Math.min(rect.width, adjustedX))
            const clampedY = Math.max(0, Math.min(rect.height, adjustedY))
            setPos(new THREE.Vector3((clampedX / rect.width) * 2 - 1, -(clampedY / rect.height) * 2 + 1, 0).unproject(camera).multiply({ x: 1, y: 1, z: 0 }).clone())
        }
    })

    return (
        <Circle
            ref={ref}
            {...bind()}
            opacity={0.2}
            radius={0.5}
            color={color}
            position={pos}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            {...props} >
            <Text position={[0, 0, 1]} fontSize={0.25}>
                {name}
            </Text>
        </Circle >
    )
})
