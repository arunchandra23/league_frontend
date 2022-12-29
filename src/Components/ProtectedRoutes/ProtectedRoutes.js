import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn)
    console.log('isLoggedIn>>',isLoggedIn)
  return (
    isLoggedIn ? <Outlet/>:<Navigate to='/login' />
  )
}

export default ProtectedRoutes