import { classes } from '../data/classes'
import ClassCard   from '../components/ClassCard'
import EnrollCTA   from '../components/EnrollCTA'

export default function Classes() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#E0F2FE] py-12 px-4 md:px-8 border-b border-[#7DD3FC]/40">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Our Programme
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">
            Classes & Curriculum
          </h1>
          <p className="text-[#6B7280] leading-relaxed max-w-xl">
            We offer a structured learning programme from Nursery to Class 5, 
            aligned with Nepal's CDC curriculum and enriched with creative activities.
          </p>
        </div>
      </div>

      {/* Classes Grid */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map(cls => (
              <ClassCard key={cls.id} cls={cls} showLink={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Info */}
      <section className="py-14 px-4 md:px-8 bg-[#FEF9C3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F] mb-3">
              Our Curriculum Approach
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto leading-relaxed">
              We follow the National Curriculum Framework (NCF) set by the Government of Nepal, 
              supplemented with hands-on activities and project-based learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: '📖', title: 'CDC Aligned',     desc: 'Full Curriculum Development Centre syllabus for all classes, ensuring national standards.' },
              { emoji: '🎨', title: 'Activity-Based',  desc: 'We go beyond textbooks with art, games, science experiments and community projects.' },
              { emoji: '🌐', title: 'Bilingual Focus',  desc: 'Strong emphasis on both Nepali and English language skills to prepare globally-ready students.' },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl border border-[#FDE047] p-6 text-center shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-3">{c.emoji}</div>
                <h3 className="font-bold text-[#1E3A2F] mb-2">{c.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnrollCTA />
    </div>
  )
}
