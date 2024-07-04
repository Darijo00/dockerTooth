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
import AppHeader from '../../components/AppHeader'

const PatientsDirectory = () => {
  const random = () => Math.round(Math.random() * 100)
  return (
    <div>
      <AppHeader />
      <EnhancedTable/>
    </div>
    )
}

export default PatientsDirectory
