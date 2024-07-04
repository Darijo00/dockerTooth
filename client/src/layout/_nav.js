import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import solarUserbroken from '../assets/images/solar_user-broken.png'
import doctorMan from '../assets/images/doctor-man.png'

const _nav = [
  {
    component: CNavItem,
    name: 'Patient Directory',
    to: '/dashboard/patients',
    icon: <img src={solarUserbroken} className="pe-3" alt="slide 1"/>,
  },
  {
    component: CNavItem,
    name: 'Provider And Hygienist Directory',
    to: '/dashboard/providers',
    icon: <img src={doctorMan} className="pe-3" alt="slide 1" />,
  },
]

export default _nav
