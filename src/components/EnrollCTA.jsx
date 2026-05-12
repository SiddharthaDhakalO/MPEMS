import { Link } from 'react-router-dom'

export default function EnrollCTA() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#FEF9C3]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-[#FDE047] rounded-3xl px-8 py-12 shadow-lg relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/20 rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full pointer-events-none" />

          <div className="relative z-10">
            <span className="text-5xl block mb-4">🌅</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-3">
              Start Your Child's Journey Today
            </h2>
            <p className="text-[#1E3A2F]/70 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Admissions are open for the academic year 2082 B.S. Secure your child's 
              seat now — limited spots available across all classes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="bg-[#1E3A2F] text-white font-bold px-8 py-3 rounded-full hover:bg-[#163020] hover:shadow-xl transition-all duration-200 shadow-md"
              >
                ✏️ Apply for Admission
              </Link>
              <Link
                to="/contact"
                className="bg-white text-[#1E3A2F] border-2 border-[#1E3A2F] font-bold px-8 py-3 rounded-full hover:bg-[#1E3A2F] hover:text-white transition-all duration-200"
              >
                📞 Call Us Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
