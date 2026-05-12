import Hero          from '../components/Hero'
import QuickLinks    from '../components/QuickLinks'
import ClassesSection from '../components/ClassesSection'
import WhyUs         from '../components/WhyUs'
import Testimonials  from '../components/Testimonials'
import EnrollCTA     from '../components/EnrollCTA'
import { notices }   from '../data/notices'
import NoticeCard    from '../components/NoticeCard'
import { Link }      from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />

      {/* Notices Preview */}
      <section className="py-16 px-4 md:px-8 bg-[#FEF9C3]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <span className="inline-block bg-[#FDE047] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-2">
                Latest Notices
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F]">
                School Announcements
              </h2>
            </div>
            <Link
              to="/notices"
              className="text-sm font-bold text-[#1E3A2F] border-2 border-[#FDE047] bg-white px-5 py-2 rounded-full hover:bg-[#FDE047] transition"
            >
              View All Notices →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.slice(0, 4).map(n => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        </div>
      </section>

      <ClassesSection />
      <WhyUs />
      <Testimonials />
      <EnrollCTA />
    </>
  )
}
