import React from 'react'
import CreateRequestPage from './CreateRequest'
import DashboardHeader from '../../../../components/dashboard/DashboardHeader'

const CreateRequest = () => {
  return (
    <div>
        <DashboardHeader title='Blood Request' ></DashboardHeader>
        <CreateRequestPage></CreateRequestPage>
    </div>
  )
}

export default CreateRequest