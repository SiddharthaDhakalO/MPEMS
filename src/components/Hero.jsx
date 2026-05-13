import { Link } from 'react-router-dom'
import NoticeTicker from './NoticeTicker'

export default function Hero() {
  return (
    <>
      <section className="bg-[#E0F2FE] relative overflow-hidden py-16 px-4 md:px-8">
        {/* Decorative floating shapes */}
        <div className="float-shape absolute -top-8 -right-8 w-40 h-40 bg-[#FDE047] rounded-full opacity-30 blur-xl pointer-events-none" />
        <div className="float-shape-2 absolute bottom-0 left-0 w-32 h-32 bg-[#86EFAC] rounded-full opacity-30 blur-xl pointer-events-none" />
        <div className="float-shape absolute top-20 left-1/3 w-16 h-16 bg-[#7DD3FC] rounded-full opacity-40 blur-lg pointer-events-none" />
        <div className="float-shape-2 absolute top-8 right-1/4 w-10 h-10 bg-[#FDE047] rounded-full opacity-50 pointer-events-none" />
        <div className="float-shape absolute bottom-8 right-1/3 w-8 h-8 bg-[#86EFAC] rounded-full opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#FDE047] rounded-full px-4 py-1.5 text-xs font-bold text-[#1E3A2F] mb-6 shadow-sm">
              🌸 Welcome to Modal Pashupati English Meddium School
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1E3A2F] leading-tight mb-5">
              A joyful place where{' '}
              <span className="relative inline-block">
                little ones
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FDE047] -z-10 rounded" />
              </span>{' '}
              love to learn
            </h1>

            <p className="text-[#6B7280] text-lg leading-relaxed mb-8 max-w-xl">
              Modal Pashupati English Meddium School provides a nurturing, child-friendly environment 
              for Nursery to Class 5 students in Geruwa rural municipality-5 Pashupatinagar, Bardiya. We blend the national CDC 
              curriculum with creative exploration.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#FDE047] text-[#1E3A2F] font-bold px-7 py-3 rounded-full hover:bg-[#facc15] hover:shadow-lg transition-all duration-200 shadow-md"
              >
                ✏️ Apply for Admission
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white border-2 border-[#1E3A2F] text-[#1E3A2F] font-bold px-7 py-3 rounded-full hover:bg-[#1E3A2F] hover:text-white transition-all duration-200"
              >
                Learn More →
              </Link>
            </div>

            {/* Stat Cards */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { value: '200+', label: 'Students',  emoji: '👦' },
                { value: '18',   label: 'Teachers',  emoji: '👩‍🏫' },
                { value: '20',   label: 'Years',     emoji: '🏫' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm border border-white/80 hover:shadow-md transition"
                >
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <p className="text-2xl font-extrabold text-[#1E3A2F]">{stat.value}</p>
                  <p className="text-xs text-[#6B7280] font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 fade-in-up mt-8 md:mt-0 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FDE047] to-[#86EFAC] rounded-3xl opacity-50 blur-lg -z-10"></div>
            <img src="/images/school2.jpg" alt="Modal Pashupati English Meddium School Building" className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-[400px] md:h-[500px]" />
          </div>
        </div>
      </section>

      <NoticeTicker />
    </>
  )
}
