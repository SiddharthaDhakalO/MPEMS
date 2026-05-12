const features = [
  { icon: '👩‍🏫', title: 'Qualified Teachers',     desc: 'All our teachers are trained in early childhood education with years of classroom experience.' },
  { icon: '🌿', title: 'Safe Environment',        desc: 'A clean, child-safe campus with greenery and open play areas for healthy development.' },
  { icon: '📖', title: 'CDC Curriculum',           desc: 'We follow Nepal\'s national curriculum ensuring your child is fully prepared for the next level.' },
  { icon: '🎨', title: 'Arts & Activities',        desc: 'Dedicated time for music, drawing, drama and sports to nurture every child\'s creativity.' },
  { icon: '🤝', title: 'Parent Partnership',       desc: 'Regular PTMs, digital updates and an open-door policy for parents to stay involved.' },
  { icon: '💰', title: 'Affordable Fees',          desc: 'Quality education at reasonable fees with scholarship opportunities for deserving students.' },
]

export default function WhyUs() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#F0FDF4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-3">
            The Sunrise Difference
          </h2>
          <p className="text-[#6B7280] leading-relaxed max-w-lg mx-auto">
            We believe every child is unique. Here's what makes us the preferred choice 
            for families across Kathmandu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-white border border-[#86EFAC] rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#1E3A2F] text-base mb-2">{f.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
