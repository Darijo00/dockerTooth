import React, { useEffect, useRef } from 'react'
import {
  CContainer,
  CHeader,
  CButton,
} from '@coreui/react'

const AppHeader = () => {
  const headerRef = useRef()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="p-5" style={{ borderBottom:'0px'}} ref={headerRef}>
      <CContainer className="px-4 ps-0 ms-0">
        <h3 className='display-7 p-b-7 '><b>Provider And Hygienist Directory</b></h3>
        <CButton color="primary" className="p-10" style={{borderRadius: "35px", backgroundColor: "#2E5AAB"}}>
          Add Provider
        </CButton>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
