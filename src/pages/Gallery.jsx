import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Events', 'Classroom', 'Sports']

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/gallery.json')
      .then(res => res.json())
      .then(data => {
        setGalleryItems(data.map(g => ({
          ...g,
          image: g.image || g.imageUrl,
          label: g.label || g.title,
        })))
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching gallery:', err)
        setLoading(false)
      })
  }, [])

  const filtered = active === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === active)

  const catBtnClass = (cat) =>
    active === cat
      ? 'bg-[#1E3A2F] text-white shadow'
      : 'bg-white text-[#6B7280] border border-gray-200 hover:border-[#FDE047] hover:text-[#1E3A2F]'

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#FEF9C3] py-12 px-4 md:px-8 border-b border-[#FDE047]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-[#FDE047] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Photo Gallery
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">School Gallery</h1>
            <p className="text-[#6B7280] leading-relaxed">
              Glimpses of joyful learning, events, sports and daily life at Model Pashupati English Medium School.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${catBtnClass(cat)}`}
              >
                {cat === 'All'       && '🖼️ '}
                {cat === 'Events'    && '🎉 '}
                {cat === 'Classroom' && '📚 '}
                {cat === 'Sports'    && '⚽ '}
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => item.image && setSelectedImage(item)}
                  className={`${item.bg || 'bg-[#FEF9C3]'} border-2 ${item.border || 'border-[#FDE047]/40'} rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden relative group`}
                >
                  <motion.div 
                    initial={{ width: "100%" }}
                    whileInView={{ width: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.05 + 0.2 }}
                    className="absolute inset-0 bg-[#FDE047] z-20 origin-right"
                  />
                  {item.image ? (
                    <>
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={item.image} 
                        alt={item.label} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 pointer-events-none"
                      >
                        <p className="text-xs font-bold text-white text-center px-2 leading-snug drop-shadow-md">
                          {item.label}
                        </p>
                        <span className="text-[10px] text-white font-semibold bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {item.category}
                        </span>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center justify-center gap-2 w-full h-full">
                      <span className="text-4xl">{item.emoji || '🖼️'}</span>
                      <p className="text-xs font-bold text-[#1E3A2F] text-center px-2 leading-snug">
                        {item.label}
                      </p>
                      <span className="text-[10px] text-[#6B7280] font-semibold bg-white/60 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-16 text-[#6B7280]"
              >
                <p className="text-4xl mb-3">🖼️</p>
                <p className="font-semibold">No photos in this category yet.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-[#E0F2FE] border border-[#7DD3FC] rounded-2xl p-6 text-center"
          >
            <p className="text-2xl mb-2">📷</p>
            <h3 className="font-extrabold text-[#1E3A2F] mb-1">More Photos Coming Soon</h3>
            <p className="text-[#6B7280] text-sm">
              Our photo gallery is being updated regularly with new events, activities and classroom moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.image} 
                alt={selectedImage.label} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute top-4 right-4 flex items-center gap-4">
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="bg-black/50 absolute bottom-0 left-0 right-0 p-4 rounded-b-lg backdrop-blur-md">
                <p className="text-white font-bold text-lg">{selectedImage.label}</p>
                <p className="text-white/70 text-sm">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
