import Hero          from '../components/Hero'
import QuickLinks    from '../components/QuickLinks'
import EnrollCTA     from '../components/EnrollCTA'
import { notices }   from '../data/notices'
import NoticeCard    from '../components/NoticeCard'
import { Link }      from 'react-router-dom'
import { classes }   from '../data/classes'
import ClassCard     from '../components/ClassCard'

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

      {/* Classes Teaser */}
      <section className="py-16 px-4 md:px-8 bg-[#E0F2FE]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-2">
                Our Classes
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F]">
                Nursery to Class 5
              </h2>
            </div>
            <Link
              to="/classes"
              className="text-sm font-bold text-[#1E3A2F] border-2 border-[#7DD3FC] bg-white px-5 py-2 rounded-full hover:bg-[#7DD3FC] transition"
            >
              See all classes →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classes.filter(c => [1, 3, 5].includes(c.id)).map(cls => (
              <ClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-2">Location</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F] mb-2">Find Us Here</h2>
            <p className="text-[#6B7280] text-sm">Geruwa-5, Pashupatinagar, Bardiya, Nepal</p>
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <iframe 
              title="School Location"
              src="https://www.google.com/maps?q=Geruwa-5,+Pashupatinagar,+Bardiya,+Nepal&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <EnrollCTA />
    </>
  )
}
