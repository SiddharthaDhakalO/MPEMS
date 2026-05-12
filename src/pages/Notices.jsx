import { useState } from 'react'
import { notices } from '../data/notices'
import NoticeCard from '../components/NoticeCard'

const tags = ['All', 'Admissions', 'Event', 'Holiday']

export default function Notices() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? notices
    : notices.filter(n => n.tag === active)

  const tagBg = {
    All:        active === 'All'        ? 'bg-[#1E3A2F] text-white'   : 'bg-white text-[#6B7280] border border-gray-200 hover:border-[#FDE047]',
    Admissions: active === 'Admissions' ? 'bg-[#86EFAC] text-[#1E3A2F]' : 'bg-white text-[#6B7280] border border-gray-200 hover:border-[#86EFAC]',
    Event:      active === 'Event'      ? 'bg-[#FDE047] text-[#1E3A2F]' : 'bg-white text-[#6B7280] border border-gray-200 hover:border-[#FDE047]',
    Holiday:    active === 'Holiday'    ? 'bg-[#7DD3FC] text-[#1E3A2F]' : 'bg-white text-[#6B7280] border border-gray-200 hover:border-[#7DD3FC]',
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#F0FDF4] py-12 px-4 md:px-8 border-b border-[#86EFAC]/40">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Announcements
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">School Notices</h1>
          <p className="text-[#6B7280] leading-relaxed">
            Stay informed with the latest updates, events and holiday announcements.
          </p>
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
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${tagBg[tag]}`}
              >
                {tag === 'All' && '📋 '}
                {tag === 'Admissions' && '📝 '}
                {tag === 'Event' && '🎉 '}
                {tag === 'Holiday' && '🏖️ '}
                {tag}
              </button>
            ))}
          </div>

          {/* Notice List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(n => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#6B7280]">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-semibold">No notices found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
