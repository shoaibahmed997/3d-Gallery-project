import { MeshReflectorMaterial, OrbitControls, Text, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { sRGBEncoding } from 'three'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide } from 'three'
import Loading from './Loading'
import Ground from './Ground'
import useAuth from '../hooks/useAuth'

const VText = ({username,video})=>{
  return(
    <mesh position={[0,1,-5]}>
      <Text maxWidth={5} font={'Inter-Bold.woff'} fontSize={10} letterSpacing={-0.06} lineHeight={.8} > <meshBasicMaterial side={DoubleSide} toneMapped={false} > <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} /> </meshBasicMaterial > Hello {username}
      </Text>
    </mesh>
  )

}


const Torch = ({pos})=>{
  const group = useRef()
  const {scene,animations}  = useGLTF('/torch/scene.gltf')
  const copiedScene = useMemo(() => scene.clone(), [scene])
  const {actions} = useAnimations(animations,group)
  useEffect(()=>{
    actions.Burning.play()
  })
  return (
    <Suspense fallback={<Loading />}>
      <group ref={group}>
        <mesh scale={[.7,.7,.7]} position={pos}>
            <primitive object={copiedScene} />
        </mesh>
      </group>
    </Suspense>
  )
  
}



const MyModel = ()=>{
  const {scene} = useGLTF('/throne/scene.gltf')
  const light1 = useRef()
  const light2 = useRef()

  return (
    <Suspense fallback={<Loading />}>

    <mesh rotation={[0,Math.PI,0]} position={[0,-12,9]}>
      <pointLight ref={light1} distance={30} color={'#f07f13'}  position={[5,4,0]}  intensity={4} />
      <pointLight ref={light2} distance={30} color={'#f07f13'}  position={[-5,4,0]} intensity={4}  />

      <mesh scale={[2,2,2]} >
        <primitive object={scene} />
      </mesh>
    </mesh>
    </Suspense>

  )
}




const VideoText = () => {
  const user = useAuth()
  const [video] = useState(() =>
  Object.assign(document.createElement('video'), { src: '/stock.mp4', crossOrigin: 'Anonymous', loop: true, muted: true, }),[])
  useEffect(() => void video.play(), [video])
  
  return (
    <div className='h-screen bg-black'>
        <Canvas camera={{position:[-4.91,8.53,10.26]}}>
        <Suspense fallback={<Loading />}>
          <OrbitControls maxDistance={30} autoRotate={false}  />

          <ambientLight intensity={.1} />
          <VText username={user?.nickname} video={video}  />
          <Ground height={60} width={60} />
          <group  position={[0,0,3]}>

          <MyModel />
          <Torch pos={[5,-16,9]}  />
          <Torch pos={[-5,-16,9]}  />
          </group>
        </Suspense>
        </Canvas>
    </div>
  )
}

export default VideoText