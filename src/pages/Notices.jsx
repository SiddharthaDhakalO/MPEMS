import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoticeCard from '../components/NoticeCard'

const tags = ['All', 'Admissions', 'Event', 'Holiday', 'General']

export default function Notices() {
  const [active, setActive] = useState('All')
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/notices.json')
      .then(res => res.json())
      .then(data => {
        setNotices(data.filter(n => n.published))
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching notices:', err)
        setLoading(false)
      })
  }, [])

  const filtered = active === 'All'
    ? notices
    : notices.filter(n => n.tag === active)

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#F0FDF4] py-12 px-4 md:px-8 border-b border-[#86EFAC]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Announcements
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">School Notices</h1>
            <p className="text-[#6B7280] leading-relaxed">
              Stay informed with the latest updates, events and holiday announcements.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  active === tag ? 'text-[#1E3A2F]' : 'text-[#6B7280] hover:text-[#1E3A2F] bg-white border border-gray-200 hover:border-[#FDE047]'
                }`}
              >
                {active === tag && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 bg-[#FDE047] rounded-full border border-[#facc15] -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <span className="relative z-10">
                  {tag === 'All' && '📋 '}
                  {tag === 'Admissions' && '📝 '}
                  {tag === 'Event' && '🎉 '}
                  {tag === 'Holiday' && '🏖️ '}
                  {tag === 'General' && '📌 '}
                  {tag}
                </span>
              </button>
            ))}
          </div>

          {/* Notice List */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((n, i) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <NoticeCard notice={n} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {!loading && filtered.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-16 text-[#6B7280]"
              >
                <p className="text-4xl mb-3">📭</p>
                <p className="font-semibold">No notices found for this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
