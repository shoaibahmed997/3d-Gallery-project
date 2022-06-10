import { Canvas,  useFrame, } from '@react-three/fiber'
import React ,{Suspense, useRef} from 'react'
import {OrbitControls,Text,Stars, useTexture, useGLTF} from '@react-three/drei'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import * as three from 'three'
import { DoubleSide } from 'three';
import { useDispatch } from 'react-redux';


const clock = new three.Clock()


const BlackHoleMesh = ({pos})=>{
    let texture = useTexture('sharingan-2.jpeg')

    return(
        <Suspense fallback={<Loading />}>

        <mesh position={pos} rotation={pos}>
            <sphereBufferGeometry  attach='geometry' />
            <meshStandardMaterial roughness={0.5} metalness={.9} map={texture}/>
        </mesh>
        </Suspense>
    )
}

const HeaderMesh = ({navigate,dispatch})=>{
    // const [selected, setselected] = useState(0);
    
    let selected = 0;
    const firstref = useRef()
    const secondref = useRef()
    const thirfref = useRef()
    const forthref = useRef()
    const fifthref = useRef()
    const sixthref = useRef()
    const handleSelection = (id)=>{
        // setselected(id)
        selected = id
        if (id===1){
            navigate('/login')
        }
        else if (id===2){
            navigate('/upload')
        }
        else if (id===3){
            navigate('/profile')
        }
        else if (id===4){
            navigate('/gallery')
        }
        else if (id===5){
            localStorage.removeItem('3dlibAccessToken')
            dispatch({type:"REMOVE_USER"})
            alert('Logged Out')
        }
    }

    useFrame(()=>{
        firstref.current.position.x = Math.cos(clock.getElapsedTime()*.5) *15
        firstref.current.position.z = Math.sin(clock.getElapsedTime()*.5) *15

        secondref.current.position.x = Math.cos(clock.getElapsedTime()*.26) *15
        secondref.current.position.z = Math.sin(clock.getElapsedTime()*.26) *15
        
        thirfref.current.position.x = Math.cos(clock.getElapsedTime()*.3) *10
        thirfref.current.position.z = Math.sin(clock.getElapsedTime()*.3) *10
        
        forthref.current.position.x = Math.cos(clock.getElapsedTime()*.38) *13
        forthref.current.position.z = Math.sin(clock.getElapsedTime()*.38) *13

        fifthref.current.position.x = Math.cos(clock.getElapsedTime()*.45) *14
        fifthref.current.position.z = Math.sin(clock.getElapsedTime()*.45) *14

        sixthref.current.position.x = Math.cos(clock.getElapsedTime()*.50) *12
        sixthref.current.position.z = Math.sin(clock.getElapsedTime()*.50) *12
        
    })

    return (
        <Suspense fallback={<Loading />}>
        <group position={[0,2,0]} >
        <Text scale={[15,15,15]} ref={firstref}  onClick={()=>handleSelection(0)}  position={[-4,0,6]} >Hello there <meshBasicMaterial side={DoubleSide} /> </Text>
        <Text scale={[15,15,15]} ref={secondref} onClick={()=>handleSelection(1)} position={[-3,-2,3]}>Login <meshBasicMaterial side={DoubleSide} /></Text>
        <Text scale={[15,15,15]} ref={thirfref}  onClick={()=>handleSelection(2)}  position={[0,-4,2]}>Upload <meshBasicMaterial side={DoubleSide} /></Text>
        <Text scale={[15,15,15]} ref={forthref}  onClick={()=>handleSelection(3)}  position={[-4,-6,-2]}>Profile <meshBasicMaterial side={DoubleSide} /></Text>
        <Text scale={[15,15,15]} ref={fifthref}  onClick={()=>handleSelection(4)}  position={[4,-8,-4]}>Gallery <meshBasicMaterial  side={DoubleSide}/></Text>
        <Text scale={[15,15,15]} ref={sixthref}  onClick={()=>handleSelection(5)}  position={[5,-10,-6]}>Logout <meshBasicMaterial  side={DoubleSide}/></Text>
        </group>
        </Suspense>
    )

    
}

const Mymodel = ()=>{
    const gltf = useGLTF('/itachi/scene.gltf')
    // const gltf = useGLTF('/knight/scene.gltf')
    return (
        <Suspense fallback={<Loading />}>
          <primitive object={gltf.scene} />
        </Suspense>
      )
}


let blackholes = [...Array(100).keys()]

const Homepage = () => {
    let navigate = useNavigate()
    let dispatch  = useDispatch()
    return (
        <div className='h-screen bg-[#222222]'>
      <Canvas camera={{position:[0,5,5]}} >
      <Suspense fallback={<Loading />}>

          <OrbitControls maxDistance={80} />

          <ambientLight intensity={0.3} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <pointLight  color={"#8A0303"} position={[0,0,5]} intensity={10} decay={10} />   
        <pointLight color={"#8A0303"} position={[-5,0,0]} intensity={10} decay={10} />   
        <pointLight color={"#8A0303"} position={[5,0,0]} intensity={10} decay={10} />   

        <HeaderMesh dispatch={dispatch} navigate={navigate} />
           
        <mesh scale={[5,5,5]}  >
            <Mymodel />
        </mesh>
      
        
          {blackholes.map((item,i)=>{
              
                  let x = Math.floor(Math.random()*100) -50;
                  let y = Math.floor(Math.random()*100) -50;
                  let z = Math.floor(Math.random()*100) -50;
                  
                  
                  return <BlackHoleMesh key={i} pos={[x,y,z]} />
                })}
      </Suspense>
      
      </Canvas>
        </div>
    )
}

export default Homepage