import { Canvas } from '@react-three/fiber'
import React, { useRef }  from 'react'
import {OrbitControls, useHelper, useTexture} from '@react-three/drei'
import { PointLightHelper } from 'three'
import { DirectionalLightHelper } from 'three'




const SphereMesh = ()=>{
  let texture = useTexture('sharingan-2.jpeg')
  return (
    <mesh>
      <sphereBufferGeometry />
      <meshPhongMaterial map={texture} metalness={.9} roughness={.5} />
    </mesh>
  )
}

const Pointlighthelper = ({refer})=>{
  useHelper(refer,PointLightHelper,3,'cyan')

}




const Test = () => {
  const refer = useRef()
  const pointLightRef = useRef()
  

  return (
      <div className='h-screen'>

    <Canvas>
        <OrbitControls />
        <ambientLight intensity={1} />
       <SphereMesh />
    </Canvas>
      </div>
  )
}

const DirLightHelper = ({refer})=>{
  useHelper(refer,DirectionalLightHelper,3,'teal')

}

export default Test