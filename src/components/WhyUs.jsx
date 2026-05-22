import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

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
    <motion.section 
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
      style={{ backgroundSize: "200% 200%" }}
      className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#F0FDF4] via-white to-[#DCFCE7]"
    >
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3 shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-3">
            The Model Pashupati Difference
          </h2>
          <p className="text-[#6B7280] leading-relaxed max-w-lg mx-auto">
            We believe every child is unique. Here's what makes us the preferred choice 
            for families across Bardiya.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden pb-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-[#86EFAC] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full group"
              >
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#DCFCE7] transition-colors">
                  <motion.span
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block origin-center"
                  >
                    {f.icon}
                  </motion.span>
                </div>
                <h3 className="font-bold text-[#1E3A2F] text-base mb-2">{f.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
