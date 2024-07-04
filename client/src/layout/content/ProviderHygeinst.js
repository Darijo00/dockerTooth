import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import EnhancedTable from '../../components/PatientList'
import AppHeader1 from '../../components/AppHeader1'

const PatientsDirectory = () => {
  const random = () => Math.round(Math.random() * 100)
  return (
    <div>
      <AppHeader1 />
      <EnhancedTable/>
    </div>
    )
}

export default PatientsDirectory
