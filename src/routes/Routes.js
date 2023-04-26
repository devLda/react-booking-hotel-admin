import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import User from '../pages/User'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/dashboard'/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user' element={<User />} />
    </Routes>
  )
}

export default Routers