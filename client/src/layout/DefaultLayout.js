import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className='row'>
      <div className='col-md-2'>
        <AppSidebar  />
      </div>
      <div className='col-md-9'>
        <Outlet/>
      </div>
    </div>
  )
}

export default DefaultLayout
