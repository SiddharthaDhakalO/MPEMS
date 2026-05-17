import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { readDataFile } from '../utils/githubApi'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch unread enrollment count
    const fetchUnread = async () => {
      try {
        const { data } = await readDataFile('enrollments.json')
        setUnreadCount(data.filter(e => !e.read).length)
      } catch (err) {
        console.error('Failed to fetch unread count', err)
      }
    }
    fetchUnread()
    // Poll every 5 minutes
    const interval = setInterval(fetchUnread, 300000)
    return () => clearInterval(interval)
  }, [location])

  const menuItems = [
    { name: 'Dashboard',   path: '/admin',             emoji: '🏠' },
    { name: 'Notices',     path: '/admin/notices',     emoji: '📋' },
    { name: 'Gallery',     path: '/admin/gallery',     emoji: '🖼️' },
    { name: 'Enrollments', path: '/admin/enrollments', emoji: '📬', badge: unreadCount },
    { name: 'Site Content', path: '/admin/content',     emoji: '✏️' },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-[#FDE047] rounded-xl flex items-center justify-center text-xl shadow-sm">
          🏫
        </div>
        <div>
          <h1 className="font-extrabold text-[#1E3A2F] leading-tight">Model Pashupati</h1>
          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold ${
                isActive 
                  ? 'bg-[#FDE047] text-[#1E3A2F] shadow-sm' 
                  : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#1E3A2F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.emoji}</span>
                <span>{item.name}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 font-bold hover:bg-red-50"
      >
        <span className="text-xl">🔒</span>
        <span>Logout</span>
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 border-r border-gray-200">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-[#1E3A2F]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-extrabold text-[#1E3A2F]">
              {menuItems.find(i => i.path === location.pathname)?.name || 'Admin'}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-bold text-[#6B7280] hover:text-[#1E3A2F] transition-colors bg-gray-100 px-3 py-1.5 rounded-full">
              View Public Site ↗
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
