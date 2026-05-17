import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { readDataFile, writeDataFile } from '../utils/githubApi'
import { uploadImage } from '../utils/cloudinaryUpload'

export default function AdminGallery() {
  const [gallery, setGallery] = useState([])
  const [sha, setSha] = useState('')
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
    file: null,
    preview: null
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  async function fetchGallery() {
    try {
      setLoading(true)
      const { data, sha } = await readDataFile('gallery.json')
      setGallery(data)
      setSha(sha)
    } catch (err) {
      console.error('Failed to fetch gallery', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        file: file,
        preview: URL.createObjectURL(file)
      })
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!formData.file && !formData.imageUrl) return
    
    setSyncing(true)
    try {
      let imageUrl = formData.imageUrl
      
      if (formData.file) {
        imageUrl = await uploadImage(formData.file)
      }

      const newItem = {
        id: Date.now().toString(),
        title: formData.title,
        category: formData.category,
        date: formData.date,
        imageUrl: imageUrl
      }

      const updatedGallery = [newItem, ...gallery]
      await writeDataFile('gallery.json', updatedGallery, sha)
      await fetchGallery()
      setIsModalOpen(false)
      setFormData({ title: '', category: 'General', date: new Date().toISOString().split('T')[0], file: null, preview: null })
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setSyncing(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo from the gallery?')) return
    setSyncing(true)
    try {
      const updatedGallery = gallery.filter(item => item.id !== id)
      await writeDataFile('gallery.json', updatedGallery, sha)
      await fetchGallery()
    } catch (err) {
      alert('Delete failed: ' + err.message)
    } finally {
      setSyncing(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#FDE047] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!gallery) return (
    <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center">
      <span className="text-4xl block mb-4">⚠️</span>
      <h3 className="text-lg font-extrabold text-red-800 mb-2">Failed to load gallery</h3>
      <p className="text-red-600 mb-6">Could not connect to GitHub. Please check your VITE_GITHUB_TOKEN in .env.local.</p>
      <button 
        onClick={fetchGallery}
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
          <h2 className="text-2xl font-extrabold text-[#1E3A2F]">School Gallery</h2>
          <p className="text-[#6B7280] text-sm">Upload and manage photos of school life.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1E3A2F] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <span>📷</span> Upload New Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative"
          >
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#1E3A2F] text-sm truncate">{item.title}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{item.category}</span>
                <span className="text-[10px] text-[#9CA3AF]">{item.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
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
                <h3 className="text-xl font-extrabold text-[#1E3A2F] mb-6">Upload Photo</h3>
                
                <form onSubmit={handleUpload} className="space-y-4">
                  {/* Preview Area */}
                  <div className="aspect-video w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
                    {formData.preview ? (
                      <>
                        <img src={formData.preview} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <label className="bg-white text-[#1E3A2F] px-4 py-2 rounded-full font-bold text-sm cursor-pointer shadow-lg">Change Photo</label>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl block mb-2">📸</span>
                        <p className="text-xs font-bold text-[#6B7280]">Click or Drag to Upload</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Students in Science Lab"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Category</label>
                      <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-bold text-[#1E3A2F]"
                      >
                        <option>General</option>
                        <option>Events</option>
                        <option>Classroom</option>
                        <option>Sports</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#6B7280] uppercase mb-1">Date</label>
                      <input 
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-2.5 focus:border-[#FDE047] outline-none font-medium text-sm"
                      />
                    </div>
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
                      disabled={syncing || !formData.file}
                      className="flex-1 bg-[#FDE047] text-[#1E3A2F] font-extrabold py-3 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {syncing ? 'Uploading...' : 'Upload Photo'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {syncing && (
        <div className="fixed bottom-8 right-8 z-[100]">
          <div className="bg-[#1E3A2F] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-bold tracking-wide">Uploading to Cloudinary & GitHub...</span>
          </div>
        </div>
      )}
    </div>
  )
}
