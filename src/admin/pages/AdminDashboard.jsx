import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { readDataFile } from '../utils/githubApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    notices: 0,
    enrollments: 0,
    gallery: 0,
    admissionsOpen: false
  })
  const [recentEnrollments, setRecentEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [notices, enrollments, gallery, content] = await Promise.all([
          readDataFile('notices.json'),
          readDataFile('enrollments.json'),
          readDataFile('gallery.json'),
          readDataFile('siteContent.json')
        ])

        setStats({
          notices: notices.data.length,
          enrollments: enrollments.data.filter(e => !e.read).length,
          gallery: gallery.data.length,
          admissionsOpen: content.data.admissionsOpen
        })

        setRecentEnrollments(enrollments.data.slice(0, 5))
      } catch (err) {
        console.error('Failed to fetch dashboard data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#FDE047] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const cards = [
    { title: 'Total Notices', value: stats.notices, emoji: '📋', color: 'bg-blue-50 text-blue-600' },
    { title: 'New Enrollments', value: stats.enrollments, emoji: '📬', color: 'bg-yellow-50 text-yellow-600' },
    { title: 'Gallery Photos', value: stats.gallery, emoji: '🖼️', color: 'bg-green-50 text-green-600' },
    { 
      title: 'Admissions', 
      value: stats.admissionsOpen ? 'Open' : 'Closed', 
      emoji: stats.admissionsOpen ? '🟢' : '🔴',
      color: stats.admissionsOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
              {card.emoji}
            </div>
            <p className="text-sm font-bold text-[#6B7280] mb-1">{card.title}</p>
            <h3 className="text-2xl font-extrabold text-[#1E3A2F]">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-extrabold text-[#1E3A2F]">Recent Enrollments</h3>
            <Link to="/admin/enrollments" className="text-xs font-bold text-blue-500 hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-[#6B7280]">
                <tr>
                  <th className="px-6 py-4">Parent</th>
                  <th className="px-6 py-4">Child</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentEnrollments.map((en, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1E3A2F]">{en.parentName}</div>
                      <div className="text-[10px] text-[#6B7280]">{en.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1E3A2F]">{en.childName}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-[#6B7280] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {en.classInterested}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#6B7280]">
                      {new Date(en.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentEnrollments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-[#6B7280] font-medium">
                      No enrollments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-[#1E3A2F] rounded-3xl p-6 text-white shadow-lg">
            <h3 className="font-extrabold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/admin/notices" 
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-colors font-bold"
              >
                <span>➕</span> Add New Notice
              </Link>
              <Link 
                to="/admin/gallery" 
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-colors font-bold"
              >
                <span>📷</span> Upload Photo
              </Link>
              <Link 
                to="/admin/content" 
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-colors font-bold"
              >
                <span>✏️</span> Edit Site Info
              </Link>
            </div>
          </div>

          <div className="bg-[#FEF9C3] rounded-3xl p-6 border-2 border-[#FDE047]/20">
            <div className="text-2xl mb-2">💡</div>
            <h4 className="font-bold text-[#1E3A2F] mb-1">Did you know?</h4>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Every time you save changes, the website automatically rebuilds on Vercel. Your changes will be live in about 30 seconds!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
