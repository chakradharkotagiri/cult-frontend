import React from 'react'
import {Outlet} from 'react-router-dom'
import Navlinks from './Navlinks'

const Layout = () => {
  return (
    <div>
        <Navlinks/>
        <div>
        <Outlet/>
       
        </div>
      
    </div>
  )
}

export default Layout
