import React, { Suspense } from 'react'
import { OrbitControls, useTexture, useGLTF } from '@react-three/drei'
import { Canvas, } from '@react-three/fiber'
import {DoubleSide} from 'three'
import Loading from '../components/Loading'
import { useQuery } from 'react-query'

const StyleA = () => {
    let token = localStorage.getItem('3dlibAccessToken')
    const fetchUserData = async()=>{
        let url = window.location.origin +"/api/gallery"
        return fetch(url,{headers:{"Content-type":"application/json",token}}).then(res=> { return res.json()})
    }

    const {isLoading,data} = useQuery('images',fetchUserData,{
        staleTime:300000,
        refetchOnMount:false,
    })


    if(isLoading){ 
        return (
            <h1>Loading....</h1>
        )
    }else{

        let images = data?.data

    return (
        <div className='h-screen bg-[#222222]'>
        <Canvas>
        <Suspense fallback={<Loading />}>
        <OrbitControls maxDistance={300} />
        <pointLight color={'#8A0303'} intensity={10} decay={30} position={[10,10,10]} />
        <pointLight color={'#8A0303'} intensity={10} decay={30} position={[-10,-10,-10]} />
        <mesh rotation={[0,-Math.PI/2,0]} scale={[10,10,10]} position={[100,-330,0]} >
            <DragonModel />
        </mesh>
        <CubeWorld />
        {images.map((item,i)=>{
            let x = Math.floor(Math.random() * (70 - -70 + 1)) + -70;
            let y = Math.floor(Math.random() * (70 - -70 + 1)) + -70;
            let z = Math.floor(Math.random() * (70 - -70 + 1)) + -70;
            return <ImageBox pos={[x,y,z]} item={item} key={i} />
        })}
        </Suspense>
        </Canvas>
    </div>
  )}
}

const ImageBox = ({pos,item})=>{
    let imgurl  = window.location.origin +"/"+ item.filepath
    let texture = useTexture(imgurl)

    return (
        <Suspense fallback={<Loading />}>
            <mesh position={pos}>
            <planeBufferGeometry attach='geometry' args={[30,40]} />
            <meshBasicMaterial side={DoubleSide} map={texture} />
            </mesh>
        </Suspense>
        )
}

const CubeWorld = ()=>{
    // let texture = useTexture('black-hole-3.jpeg')
    return (
        <Suspense fallback={<Loading />}>
        <mesh >
            <boxBufferGeometry args={[180,180,180]} attach="geometry" />
            {/* <meshBasicMaterial side={DoubleSide} map={texture} /> */}
            <meshPhongMaterial side={DoubleSide}  />
        </mesh>
        </Suspense>
    )
}

const DragonModel = ()=>{
    const gltf = useGLTF('/dragon/scene.gltf')

    return(
        <Suspense fallback={<Loading />}>
            <primitive object={gltf.scene} />
        </Suspense>
    )
}




export default StyleA