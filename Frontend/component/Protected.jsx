import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import React from 'react'
import LoadingSpinner from "./LoadingSpinner.jsx";

const Protected = ({children}) => {
  const {loading, user} = useAuth()

  if (loading) {
    return <LoadingSpinner fullPage message="Verifying session…" />
  }

  if (!user) {
    return <Navigate to={'/home'} />
  }

  return children
}

export default Protected
