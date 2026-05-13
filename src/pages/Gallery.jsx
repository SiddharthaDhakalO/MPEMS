import { useState } from 'react'
import { galleryItems } from '../data/gallery'

const categories = ['All', 'Events', 'Classroom', 'Sports']

export default function Gallery() {
  const [active, setActive] = useState('All')

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
          <span className="inline-block bg-[#FDE047] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Photo Gallery
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">School Gallery</h1>
          <p className="text-[#6B7280] leading-relaxed">
            Glimpses of joyful learning, events, sports and daily life at Modal Pashupati English Meddium School.
          </p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div
                key={item.id}
                className={`${item.bg} border-2 ${item.border} rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden relative`}
              >
                {item.image ? (
                  <>
                    <img src={item.image} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors"></div>
                    <p className="relative z-10 text-xs font-bold text-white text-center px-2 leading-snug drop-shadow-md">
                      {item.label}
                    </p>
                    <span className="relative z-10 text-[10px] text-white font-semibold bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl">{item.emoji}</span>
                    <p className="text-xs font-bold text-[#1E3A2F] text-center px-2 leading-snug">
                      {item.label}
                    </p>
                    <span className="text-[10px] text-[#6B7280] font-semibold bg-white/60 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#6B7280]">
              <p className="text-4xl mb-3">🖼️</p>
              <p className="font-semibold">No photos in this category yet.</p>
            </div>
          )}

          {/* Upload notice */}
          <div className="mt-10 bg-[#E0F2FE] border border-[#7DD3FC] rounded-2xl p-6 text-center">
            <p className="text-2xl mb-2">📷</p>
            <h3 className="font-extrabold text-[#1E3A2F] mb-1">More Photos Coming Soon</h3>
            <p className="text-[#6B7280] text-sm">
              Our photo gallery is being updated regularly with new events, activities and classroom moments.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
