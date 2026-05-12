import { Link } from 'react-router-dom'
import { classes } from '../data/classes'
import ClassCard from './ClassCard'

export default function ClassesSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#E0F2FE]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Our Classes
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-3">
            Nursery to Class 5
          </h2>
          <p className="text-[#6B7280] leading-relaxed max-w-xl mx-auto">
            Each class is thoughtfully designed with age-appropriate curriculum, 
            trained teachers, and a warm learning atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(cls => (
            <ClassCard key={cls.id} cls={cls} />
          ))}

          {/* CTA Card */}
          <div className="bg-[#FDE047] border-2 border-[#facc15] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <span className="text-5xl mb-4">🎉</span>
            <h3 className="font-extrabold text-[#1E3A2F] text-xl mb-2">Ready to Join?</h3>
            <p className="text-[#1E3A2F]/70 text-sm mb-5 leading-relaxed">
              Enroll your child today and give them the bright future they deserve.
            </p>
            <Link
              to="/contact"
              className="bg-[#1E3A2F] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#163020] transition"
            >
              Apply Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
