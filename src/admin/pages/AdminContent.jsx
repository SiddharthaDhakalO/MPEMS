import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { readDataFile, writeDataFile } from '../utils/githubApi'

export default function AdminContent() {
  const [content, setContent] = useState(null)
  const [sha, setSha] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      setLoading(true)
      const { data, sha } = await readDataFile('siteContent.json')
      setContent(data)
      setSha(sha)
      setHasChanges(false)
    } catch (err) {
      console.error('Failed to fetch content', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await writeDataFile('siteContent.json', content, sha)
      await fetchContent()
      alert('Settings saved successfully! Website will update in ~30s.')
    } catch (err) {
      alert('Failed to save settings: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#FDE047] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!content) return (
    <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center">
      <span className="text-4xl block mb-4">⚠️</span>
      <h3 className="text-lg font-extrabold text-red-800 mb-2">Failed to load content</h3>
      <p className="text-red-600 mb-6">Could not connect to GitHub to retrieve site settings. Please check your VITE_GITHUB_TOKEN.</p>
      <button 
        onClick={fetchContent}
        className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className="max-w-4xl">
      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1E3A2F]">Site Content Settings</h2>
            <p className="text-[#6B7280] text-sm">Update text, contact info, and global settings.</p>
          </div>
          <button 
            type="submit"
            disabled={saving || !hasChanges}
            className="bg-[#1E3A2F] text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {/* Section 1: Hero */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h3 className="font-extrabold text-[#1E3A2F] flex items-center gap-2">
              <span>🚀</span> Hero Section
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Hero Tagline</label>
              <input 
                type="text" 
                value={content.heroTagline}
                onChange={e => handleChange('heroTagline', e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold text-[#1E3A2F]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Hero Subtext</label>
              <textarea 
                rows="3"
                value={content.heroSubtext}
                onChange={e => handleChange('heroSubtext', e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-medium text-[#6B7280]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Students Count</label>
                <input 
                  type="number" 
                  value={content.statsStudents}
                  onChange={e => handleChange('statsStudents', parseInt(e.target.value))}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Teachers Count</label>
                <input 
                  type="number" 
                  value={content.statsTeachers}
                  onChange={e => handleChange('statsTeachers', parseInt(e.target.value))}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Years Experience</label>
                <input 
                  type="number" 
                  value={content.statsYears}
                  onChange={e => handleChange('statsYears', parseInt(e.target.value))}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Admissions Toggle */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#1E3A2F]">Admissions Open</h3>
            <p className="text-xs text-[#6B7280]">Toggle the "Admission Open" banner across the site.</p>
          </div>
          <button 
            type="button"
            onClick={() => handleChange('admissionsOpen', !content.admissionsOpen)}
            className={`w-14 h-8 rounded-full relative transition-colors ${content.admissionsOpen ? 'bg-emerald-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all ${content.admissionsOpen ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Section 3: About Page */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h3 className="font-extrabold text-[#1E3A2F] flex items-center gap-2">
              <span>📖</span> About Section
            </h3>
          </div>
          <div className="p-6">
            <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Main About Text</label>
            <textarea 
              rows="6"
              value={content.aboutText}
              onChange={e => handleChange('aboutText', e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-medium text-[#6B7280] leading-relaxed"
            />
          </div>
        </div>

        {/* Section 4: Contact Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h3 className="font-extrabold text-[#1E3A2F] flex items-center gap-2">
              <span>📞</span> Contact Information
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Phone Number</label>
              <input 
                type="text" 
                value={content.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                value={content.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">School Address</label>
              <input 
                type="text" 
                value={content.address}
                onChange={e => handleChange('address', e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Facebook Page URL</label>
              <input 
                type="url" 
                value={content.facebookUrl}
                onChange={e => handleChange('facebookUrl', e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-[#FDE047] outline-none font-medium text-blue-600"
              />
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="sticky bottom-8 left-0 right-0 bg-white border-4 border-[#FDE047] p-4 rounded-3xl shadow-2xl flex items-center justify-between z-40">
            <div className="flex items-center gap-3 px-2">
              <span className="text-2xl">⚠️</span>
              <span className="font-extrabold text-[#1E3A2F]">You have unsaved changes!</span>
            </div>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={fetchContent}
                className="bg-gray-100 text-[#6B7280] px-6 py-2 rounded-xl font-bold"
              >
                Discard
              </button>
              <button 
                type="submit"
                className="bg-[#1E3A2F] text-white px-8 py-2 rounded-xl font-bold"
              >
                Save Now
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
