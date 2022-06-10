import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  let navigate  = useNavigate()

  const handleSelection=(e)=>{
    switch (e.target.value) {
      case '0':
        navigate('/')
        break;
      case '1':
        navigate('/signup')
        break;
      case '2':
        navigate('/gallery')
        break;
      case '3':
        navigate('/upload')
        break;
      default:
        break;
     
    }
  }

  return (
    <div className='main'>
        <Outlet />
      <select onChange={handleSelection} className=' absolute top-0 right-0'>
        <option value={0}>Home</option>
        <option value={1}>Login</option>
        <option value={2}>Gallery</option>
        <option value={3}>Upload</option>
      </select>
    </div>
  )
}

export default Layout