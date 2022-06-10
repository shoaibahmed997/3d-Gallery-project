import { Html, OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import {useDispatch} from 'react-redux'

// const baseUrl= window.location.origin

const LoginMenu = ({nav,dispatch,location})=>{
  const [info,setinfo] = useState({})

  let myform = useRef()

  const handleSubmission= async(e)=>{
    e.preventDefault()
    let loginUrl = window.location.origin + "/api/login"
    const res = await fetch(loginUrl,{
      method:"POST",
      body:JSON.stringify(info),
      headers:{"Content-type":"application/json"}
    })

    const result = await res.json()

    if(result.success){
      console.log(result)
      dispatch({type:"ADD_USER",payload:result.user})
      localStorage.setItem('3dlibAccessToken',result.token)
      nav(location?.state?.from?.pathname || '/')
    }else{
      alert(result.error)
    }
    
  }

  useEffect(()=>{
    gsap.fromTo(myform.current,{opacity:0},{opacity:1})
  },[])

  return(
    <form ref={myform} className='flex flex-col gap-4 w-80 p-4 bg-opacity-30 bg-white rounded-xl' onSubmit={handleSubmission} >
            <input className='rounded-lg p-2' value={info.email} onChange={(e)=>{setinfo({...info,email:e.target.value})}} type="email" placeholder='Email' required />
            <input className='rounded-lg p-2' value={info.password} onChange={(e)=>{setinfo({...info,password:e.target.value})}} type="password" placeholder='Password' required />
            <button className='p-2 bg-green-500 text-white rounded-md' type='submit'>Login</button>
            <small className='text-white'>Use "test@gmail.com" in Email and "1234" as password</small>

          </form>
  )
}

const SignupMenu = ({nav,dispatch,location})=>{
  const [info, setinfo] = useState({})
  let myform = useRef()

  const handleSubmission = async(e)=>{
    e.preventDefault()
    let signupUrl = window.location.origin + "/api/signup"
    const res = await fetch(signupUrl,{
      method:"POST",
      body:JSON.stringify(info),
      headers:{"Content-type":"application/json"}
    })

    const result = await res.json()

    if(result.success){
      console.log(result)
      dispatch({type:"ADD_USER",payload:result.user})
      localStorage.setItem('3dlibAccessToken',result.token)
      nav(location?.state?.from?.pathname || '/')
    }else{
      alert(result.error)
    }

}

useEffect(()=>{
  gsap.fromTo(myform.current,{opacity:0},{opacity:1})
},[])
  return (
    <form ref={myform} className='flex flex-col gap-4 w-80 p-4 bg-opacity-30 bg-white rounded-xl' onSubmit={handleSubmission} >
    <input className='rounded-lg p-2' value={info.nickname} onChange={(e)=>{setinfo({...info,nickname:e.target.value})}} type="text" placeholder='Nickname' required  />
    <input className='rounded-lg p-2' value={info.email} onChange={(e)=>{setinfo({...info,email:e.target.value})}} type="email" placeholder='Email' required />
    <input className='rounded-lg p-2' value={info.password} onChange={(e)=>{setinfo({...info,password:e.target.value})}} type="password" placeholder='Password' required />
    <button className='p-2 bg-green-500 text-white rounded-md' type='submit'>Sign Up </button>
    <small className='text-white'>if you don't want to signup use test@gmail.com in login</small>
  </form>
  )
}

const Signup = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let location = useLocation()
  const [menu,setmenu] = useState(true)
 
  return (
    <div className='h-screen'>
        <Canvas>
          <OrbitControls />
          <Stars />
          {/* <Text fontSize={1} maxWidth={8}>Welcome to a New Way of Web Development</Text> */}

          <Html className="p-4 bg-opacity-30 bg-white rounded-xl" position={[-2,1,0]}>
            {/* <button>&laquo; Home</button> */}
          <div className='flex text-white w-80 justify-around'>
            <button className={`${menu ? "bg-green-500" :""} rounded-md p-2`} onClick={()=>setmenu(true)}>Login Menu</button>
            <button className={`${!menu ? "bg-green-500" :""} rounded-md p-2`} onClick={()=>setmenu(false)}>Signup Menu</button>
          </div>
            {menu ? <LoginMenu location={location} nav={navigate} dispatch={dispatch} /> :<SignupMenu location={location} nav={navigate} dispatch={dispatch} /> }
          </Html>
        </Canvas>
      </div>

  
  )
}

export default Signup