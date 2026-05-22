import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem('admin_auth') === 'true'
  
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}
