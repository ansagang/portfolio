import { useState, createRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Node, Nodes } from './nodes'

export default function InteractiveNodes({containerRef}) {
  const [[a, b, c, d, e]] = useState(() => [...Array(5)].map(createRef))
  return (
    <Canvas orthographic camera={{ zoom: 80 }}>
      <Nodes>
        <Node containerRef={containerRef} ref={a} name="a" color="#204090" position={[-2, 2, 0]} connectedTo={[b, c, e]} />
        <Node containerRef={containerRef} ref={b} name="b" color="#904020" position={[2, -3, 0]} connectedTo={[d, a]} />
        <Node containerRef={containerRef} ref={c} name="c" color="#209040" position={[-0.25, 0, 0]} />
        <Node containerRef={containerRef} ref={d} name="d" color="#204090" position={[0.5, -0.75, 0]} />
        <Node containerRef={containerRef} ref={e} name="e" color="#204090" position={[-0.5, -1, 0]} />
      </Nodes>
    </Canvas>
  )
}