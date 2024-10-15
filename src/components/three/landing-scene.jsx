"use client"

import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Outlines } from "@react-three/drei"
import { Physics, useSphere } from "@react-three/cannon"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: 'black', roughness: 1, envMapIntensity: 1 })

export default function Scene({ quantity = 0, inView }) {
  return (
    <>
      <div className="scene">
        <div className="scene__inner">
          <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}>
            <ambientLight intensity={1} />
            {/* <color attach="background" args={["#fff"]} /> */}
            <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} shadow-mapSize={[512, 512]} />
            <directionalLight position={[30, 30, 30]} />
            <Physics gravity={[0, 0, 0]} iterations={10}>
              <Clump quantity={quantity} />
              <Pointer />
            </Physics>
            {/* <EffectComposer enableNormalPass multisampling={0}>
              <SMAA />
            </EffectComposer> */}
          </Canvas>
        </div>
      </div>
    </>
  )
}

function Clump({ quantity, mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  // const { outlines } = useControls({ outlines: { value: 0.0, step: 0.01, min: 0, max: 0.05 } })
  const [ref, api] = useSphere(() => ({ args: [0.7], mass: 1.3, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }))
  useFrame((state) => {
    for (let i = 0; i < quantity; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0, 0, 0])
    }
  })
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[sphereGeometry, baubleMaterial, quantity]}>
      <Outlines color='black' thickness={0.99} />
      <meshBasicMaterial attach="material" color='#222' toneMapped={false} />
    </instancedMesh>
  )
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [2.5], position: [0, 0, 0] }))
  return useFrame((state) => api.position.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 0))
}
