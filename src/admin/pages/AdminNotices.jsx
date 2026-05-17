import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { readDataFile, writeDataFile } from '../utils/githubApi'

export default function AdminNotices() {
  const [notices, setNotices] = useState([])
  const [sha, setSha] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_bs: '',
    date_en: new Date().toISOString().split('T')[0],
    tag: 'General',
    published: true
  })

  useEffect(() => {
    fetchNotices()
  }, [])

  async function fetchNotices() {
    try {
      setLoading(true)
      const { data, sha } = await readDataFile('notices.json')
      setNotices(data)
      setSha(sha)
    } catch (err) {
      console.error('Failed to fetch notices', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (notice = null) => {
    if (notice) {
      setEditingNotice(notice)
      setFormData(notice)
    } else {
      setEditingNotice(null)
      setFormData({
        title: '',
        description: '',
        date_bs: '',
        date_en: new Date().toISOString().split('T')[0],
        tag: 'General',
        published: true
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      let updatedNotices
      if (editingNotice) {
        updatedNotices = notices.map(n => n.id === editingNotice.id ? formData : n)
      } else {
        const newNotice = {
          ...formData,
          id: Date.now().toString()
        }
        updatedNotices = [newNotice, ...notices]
      }

      await writeDataFile('notices.json', updatedNotices, sha)
      await fetchNotices()
      setIsModalOpen(false)
      alert('Notice saved successfully! Site will update in ~30s.')
    } catch (err) {
      alert('Failed to save: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return
    setSaving(true)
    try {
      const updatedNotices = notices.filter(n => n.id !== id)
      await writeDataFile('notices.json', updatedNotices, sha)
      await fetchNotices()
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const togglePublished = async (notice) => {
    setSaving(true)
    try {
      const updatedNotices = notices.map(n => 
        n.id === notice.id ? { ...n, published: !n.published } : n
      )
      await writeDataFile('notices.json', updatedNotices, sha)
      await fetchNotices()
    } catch (err) {
      alert('Failed to update status: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#FDE047] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!notices) return (
    <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center">
      <span className="text-4xl block mb-4">⚠️</span>
      <h3 className="text-lg font-extrabold text-red-800 mb-2">Failed to load notices</h3>
      <p className="text-red-600 mb-6">Could not connect to GitHub. Please check your VITE_GITHUB_TOKEN in .env.local.</p>
      <button 
        onClick={fetchNotices}
        className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E3A2F]">Manage Notices</h2>
          <p className="text-[#6B7280] text-sm">Create and edit announcements for the school.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#1E3A2F] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <span>➕</span> Add New Notice
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-[#6B7280]">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Title & Description</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Tag</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {notices.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <button 
                    onClick={() => togglePublished(n)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${n.published ? 'bg-[#86EFAC]' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${n.published ? 'left-7' : 'left-1'}`} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-[#1E3A2F]">{n.title}</div>
                  <div className="text-xs text-[#6B7280] line-clamp-1">{n.description}</div>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-[#1E3A2F]">
                  <div>{n.date_bs}</div>
                  <div className="text-[10px] text-[#6B7280]">{n.date_en}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    n.tag === 'Admissions' ? 'bg-blue-100 text-blue-600' :
                    n.tag === 'Holiday' ? 'bg-red-100 text-red-600' :
                    n.tag === 'Event' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {n.tag}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenModal(n)}
                      className="p-2 hover:bg-blue-50 text-blue-500 rounded-xl transition-colors"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(n.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-extrabold text-[#1E3A2F] mb-6">
                  {editingNotice ? 'Edit Notice' : 'Add New Notice'}
                </h3>
                
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-medium"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Description</label>
                    <textarea 
                      required
                      rows="3"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Date (B.S.)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Falgun 10, 2081"
                        value={formData.date_bs}
                        onChange={e => setFormData({...formData, date_bs: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Tag</label>
                      <select 
                        value={formData.tag}
                        onChange={e => setFormData({...formData, tag: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-bold text-[#1E3A2F]"
                      >
                        <option>General</option>
                        <option>Admissions</option>
                        <option>Holiday</option>
                        <option>Event</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="published"
                      checked={formData.published}
                      onChange={e => setFormData({...formData, published: e.target.checked})}
                      className="w-4 h-4 accent-[#1E3A2F]"
                    />
                    <label htmlFor="published" className="text-sm font-bold text-[#1E3A2F]">Published (Visible on site)</label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-gray-100 text-[#6B7280] font-bold py-3 rounded-2xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-[#FDE047] text-[#1E3A2F] font-extrabold py-3 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Notice'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {saving && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <div className="bg-[#1E3A2F] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-bold tracking-wide">Syncing with GitHub...</span>
          </div>
        </div>
      )}
    </div>
  )
}
