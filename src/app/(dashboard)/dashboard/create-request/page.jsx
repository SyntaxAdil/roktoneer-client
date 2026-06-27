import React from 'react'
import CreateRequestPage from './CreateRequest'
import DashboardHeader from '../../../../components/dashboard/DashboardHeader'
export const metadata = {
  title: 'Create Request | Roktoneer',
}
const CreateRequest = () => {
  return (
    <div>
        <DashboardHeader title='Blood Request' ></DashboardHeader>
        <CreateRequestPage></CreateRequestPage>
    </div>
  )
}

export default CreateRequest