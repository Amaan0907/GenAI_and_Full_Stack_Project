import React from 'react'
import {RouterProvider} from "react-router-dom"
import { router } from './app.routes.jsx'
import { AuthProvider } from '../services/auth.context.jsx'
import { InterviewProvider } from '../services/interview.context.jsx'

const App = () => {
  return (

    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router} />

      </InterviewProvider>
    </AuthProvider>
    
  )
}

export default App
