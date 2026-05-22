import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      navigate('/admin')
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF9C3] to-[#FDE047] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: error ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-4 border-white"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#FEF9C3] rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner">
            🏫
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E3A2F]">Admin Portal</h1>
          <p className="text-[#6B7280] font-medium">Model Pashupati English Medium School</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#1E3A2F] mb-2 px-1">
              Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-[#FDE047] focus:outline-none transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-bold text-center animate-pulse">
              ❌ Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1E3A2F] text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#2c5243] transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            Login to Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-bold text-[#6B7280] hover:text-[#1E3A2F] transition-colors"
          >
            ← Back to Public Site
          </button>
        </div>
      </motion.div>
    </div>
  )
}
