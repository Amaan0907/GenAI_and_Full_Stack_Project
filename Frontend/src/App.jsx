import React from 'react'
import {RouterProvider} from "react-router-dom"
import { router } from './app.routes.jsx'
import { AuthProvider } from '../services/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>

      <RouterProvider router={router} />
    </AuthProvider>
    
  )
}

export default App
