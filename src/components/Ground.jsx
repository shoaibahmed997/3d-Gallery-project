import React from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'

const Ground = ({height,width})=>{

    return <mesh position={[0,-12,10]} rotation={[Math.PI/2,Math.PI,0]}>
      <planeBufferGeometry args={[height,width]} />
      <MeshReflectorMaterial resolution={512} metalness={.9} roughness={.1} mirror={.5} mixBlur={6} mixStrength={1.5}  />
    </mesh>
  }

export default Ground