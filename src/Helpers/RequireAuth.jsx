import React, { useRef } from 'react'
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'


const RequireAuth =() => {
  const token = localStorage.getItem('3dlibAccessToken')
  
  const user = useAuth()
  let logged = useRef()
  const dispatch = useDispatch()

  if(!token){
    logged = false
  }
  
  
  if(!user.email){
    //token is present but user is not due to refresh. in this case hit the token api to verify the token
    let verifyUrl = window.location.origin +'/api/token/verify'
    const res = fetch(verifyUrl,{headers:{"Content-type":"application/json",token:token}}).then(res=> res.json()).then(res=>{
      if(res.success){
        dispatch({type:"ADD_USER",payload:res.user})
        logged=true
      }else{
        alert(res.error)
        logged=false
        localStorage.removeItem('3dlibAccessToken')
      }
    })
  }

    const location = useLocation()

  return logged ? <Outlet /> : <Navigate to='/login' state={{from:location}} replace />
}

export default RequireAuth