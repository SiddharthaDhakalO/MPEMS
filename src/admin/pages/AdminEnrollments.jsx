import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { readDataFile, writeDataFile } from '../utils/githubApi'

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [sha, setSha] = useState('')
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [filter, setFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    fetchEnrollments()
  }, [])

  async function fetchEnrollments() {
    try {
      setLoading(true)
      const { data, sha } = await readDataFile('enrollments.json')
      setEnrollments(data)
      setSha(sha)
    } catch (err) {
      console.error('Failed to fetch enrollments', err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    setSyncing(true)
    try {
      const updated = enrollments.map(e => e.id === id ? { ...e, read: true } : e)
      await writeDataFile('enrollments.json', updated, sha)
      await fetchEnrollments()
    } catch (err) {
      alert('Failed to mark as read: ' + err.message)
    } finally {
      setSyncing(false)
    }
  }

  const markAllAsRead = async () => {
    if (!window.confirm('Mark all submissions as read?')) return
    setSyncing(true)
    try {
      const updated = enrollments.map(e => ({ ...e, read: true }))
      await writeDataFile('enrollments.json', updated, sha)
      await fetchEnrollments()
    } catch (err) {
      alert('Failed to mark all as read: ' + err.message)
    } finally {
      setSyncing(false)
    }
  }

  const exportCSV = () => {
    const headers = ['Parent Name', 'Phone', 'Child Name', 'Class Interested', 'Message', 'Submitted At']
    const rows = enrollments.map(e => [
      `"${e.parentName}"`,
      `"${e.phone}"`,
      `"${e.childName}"`,
      `"${e.classInterested}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      new Date(e.submittedAt).toLocaleString()
    ])
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `enrollments_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filtered = enrollments.filter(e => {
    if (filter === 'Unread') return !e.read
    if (filter === 'Read') return e.read
    return true
  })

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#FDE047] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!enrollments) return (
    <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center">
      <span className="text-4xl block mb-4">⚠️</span>
      <h3 className="text-lg font-extrabold text-red-800 mb-2">Failed to load enrollments</h3>
      <p className="text-red-600 mb-6">Could not connect to GitHub. Please check your VITE_GITHUB_TOKEN in .env.local.</p>
      <button 
        onClick={fetchEnrollments}
        className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E3A2F]">Enrollment Inquiries</h2>
          <p className="text-[#6B7280] text-sm">Review admission inquiries submitted via the website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV}
            className="bg-white border-2 border-gray-200 text-[#1E3A2F] px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all"
          >
            <span>📥</span> Export CSV
          </button>
          <button 
            onClick={markAllAsRead}
            className="bg-[#1E3A2F] text-white px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            Mark All Read
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {['All', 'Unread', 'Read'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f ? 'bg-white text-[#1E3A2F] shadow-sm' : 'text-[#6B7280] hover:text-[#1E3A2F]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-[#6B7280]">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Parent Info</th>
                <th className="px-6 py-4">Child / Class</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((en) => (
                <React.Fragment key={en.id}>
                  <tr 
                    className={`group transition-colors cursor-pointer ${en.read ? 'bg-white' : 'bg-yellow-50/30'}`}
                    onClick={() => setExpandedId(expandedId === en.id ? null : en.id)}
                  >
                    <td className="px-6 py-4">
                      {!en.read ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                          New
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold text-[#6B7280] bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Read
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1E3A2F]">{en.parentName}</div>
                      <div className="text-xs text-[#6B7280]">{en.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-[#1E3A2F]">{en.childName}</div>
                      <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">{en.classInterested}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#6B7280]">
                      {new Date(en.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3" onClick={e => e.stopPropagation()}>
                        {!en.read && (
                          <button 
                            onClick={() => markAsRead(en.id)}
                            className="text-[10px] font-bold text-blue-500 hover:underline"
                          >
                            Mark Read
                          </button>
                        )}
                        <span className={`text-sm transition-transform duration-300 ${expandedId === en.id ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedId === en.id && (
                      <tr>
                        <td colSpan="5" className="px-6 py-0 border-none">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="py-6 px-10 bg-gray-50/50 rounded-2xl mb-4 border border-gray-100">
                              <h5 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-3">Message Details</h5>
                              <p className="text-[#1E3A2F] leading-relaxed italic whitespace-pre-wrap">
                                "{en.message || 'No message provided.'}"
                              </p>
                              <div className="mt-4 flex items-center gap-4 text-xs">
                                <span className="font-bold text-[#6B7280]">Full Date:</span>
                                <span className="text-[#1E3A2F]">{new Date(en.submittedAt).toLocaleString()}</span>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <span className="text-4xl block mb-2">📬</span>
                    <p className="font-bold text-[#6B7280]">No inquiries found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {syncing && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <div className="bg-[#1E3A2F] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-bold tracking-wide">Updating...</span>
          </div>
        </div>
      )}
    </div>
  )
}
