import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import WhyUs        from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import FadeInSection from '../components/FadeInSection'

const team = [
  { name: 'Mrs. Sunita Poudel',   role: 'Principal',             emoji: '👩‍💼', exp: '18 years' },
  { name: 'Mr. Gopal Thapa',      role: 'Vice Principal',        emoji: '👨‍💼', exp: '14 years' },
  { name: 'Ms. Sita Rai',         role: 'Nursery & LKG Teacher', emoji: '👩‍🏫', exp: '8 years'  },
  { name: 'Ms. Anita Sharma',     role: 'UKG Teacher',           emoji: '👩‍🏫', exp: '6 years'  },
  { name: 'Mr. Ram Bahadur',      role: 'Class 1–2 Teacher',     emoji: '👨‍🏫', exp: '10 years' },
  { name: 'Ms. Puja Thapa',       role: 'Class 3–4 Teacher',     emoji: '👩‍🏫', exp: '9 years'  },
]

const milestones = [
  { year: '2005 A.D.',  label: 'School Founded',           desc: 'Model Pashupati English Medium School opened its doors with 3 classrooms and 40 students.' },
  { year: '2010 A.D.',  label: 'First Batch Graduated',    desc: 'Our first Class 5 batch completed primary education with distinction.' },
  { year: '2015 A.D.',  label: 'New Block Inaugurated',    desc: 'A new two-storey academic block was added, doubling our capacity.' },
  { year: '2020 A.D.',  label: 'Computer Lab Opened',      desc: 'A fully equipped computer lab was established for students from Class 3.' },
  { year: '2025 A.D.',  label: '20 Years of Excellence',   desc: 'Celebrating two decades of nurturing over 2,000 students across Bardiya.' },
]

export default function About() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-200, 200], [10, -10])
  const rotateY = useTransform(x, [-200, 200], [-10, 10])

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#F0FDF4] py-12 px-4 md:px-8 border-b border-[#86EFAC]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Our Story
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">About Our School</h1>
            <p className="text-[#6B7280] leading-relaxed max-w-xl">
              For 20 years, Model Pashupati English Medium School has been a second home for children 
              across Bardiya — a place of learning, laughter and lifelong values.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <FadeInSection className="flex flex-col gap-6">
            <div>
              <span className="inline-block bg-[#FEF9C3] border border-[#FDE047] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-4">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F] mb-4">
                A joyful school for Bardiya's youngest learners
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Founded in 2005, Model Pashupati English Medium School is a government-registered, English-medium 
                primary school located in Geruwa rural municipality-5 Pashupatinagar, Bardiya. We offer classes from Nursery to 
                Class 5, following the CDC curriculum of Nepal.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                Our philosophy is simple: every child deserves a safe, nurturing space where they 
                are free to explore, make mistakes, and grow. We combine academic rigour with 
                creativity, values, and community spirit.
              </p>
            </div>
            
            <div 
              className="relative rounded-2xl border-4 border-[#86EFAC] overflow-hidden shadow-sm"
              style={{ perspective: 1000 }}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-64 relative"
              >
                <img src="/images/school3.jpg" alt="Students and building" className="w-full h-full object-cover" />
                <motion.div 
                  initial={{ width: "100%" }}
                  whileInView={{ width: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                  className="absolute inset-0 bg-[#86EFAC] z-10 origin-right"
                />
              </motion.div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 gap-4" style={{ perspective: 1000 }}>
            {[
              { emoji: '🎯', title: 'Mission',  text: 'To provide inclusive, high-quality primary education that empowers children to discover their potential, fosters critical thinking, and prepares them for real-world challenges.' },
              { emoji: '🌅', title: 'Vision',   text: 'To become the most trusted and innovative community school in Bardiya, renowned for cultivating a joyful learning environment and nurturing holistic child development.' },
              { emoji: '💛', title: 'Values',   text: 'We are guided by respect, kindness, curiosity, and perseverance. These pillars shape our community, encouraging students to support one another and never stop learning.' },
              { emoji: '🏫', title: 'Campus',   text: 'Our safe and vibrant campus features spacious classrooms, a well-stocked library, a modern computer lab, an expressive art room, and an expansive playground for active play.' },
            ].map((c, i) => (
              <FadeInSection key={c.title} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#FEF9C3] border border-[#FDE047] rounded-2xl p-5 hover:shadow-md h-full cursor-pointer relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 p-5 backface-hidden flex flex-col items-center justify-center text-center rounded-2xl bg-[#FEF9C3]" style={{ backfaceVisibility: "hidden" }}>
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <h3 className="font-bold text-[#1E3A2F] text-sm mb-1">{c.title}</h3>
                  </div>
                  <div 
                    className="absolute inset-0 p-5 backface-hidden flex items-center justify-center text-center rounded-2xl bg-[#FDE047]" 
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-[#1E3A2F] text-xs font-semibold leading-relaxed">{c.text}</p>
                  </div>
                  {/* Invisible content to give the card height */}
                  <div className="opacity-0">
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <h3 className="font-bold text-sm mb-1">{c.title}</h3>
                    <p className="text-xs leading-relaxed">{c.text}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 px-4 md:px-8 bg-[#E0F2FE]">
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center mb-10">
            <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Our Journey
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F]">
              20 Years of Milestones
            </h2>
          </FadeInSection>

          <div className="relative">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-[#7DD3FC] -translate-x-1/2" 
            />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeInSection
                  key={m.year}
                  delay={i * 0.2}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FDE047] border-2 border-[#1E3A2F] rounded-full z-10 mt-1.5" 
                  />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-white border border-[#7DD3FC] rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                        {m.year}
                      </span>
                      <h3 className="font-bold text-[#1E3A2F] mb-1">{m.label}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center mb-10">
            <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Our Team
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F]">Meet Our Educators</h2>
            <p className="text-[#6B7280] text-sm mt-2">Dedicated professionals who love what they do</p>
          </FadeInSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {team.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-[#F0FDF4] border border-[#86EFAC] rounded-2xl p-4 text-center hover:shadow-md transition-all duration-200 h-full"
                >
                  <div className="w-16 h-16 bg-[#86EFAC] rounded-full flex items-center justify-center text-3xl mx-auto mb-3 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>{t.emoji}</motion.div>
                  </div>
                  <p className="font-bold text-[#1E3A2F] text-xs leading-snug mb-0.5">{t.name}</p>
                  <p className="text-[#6B7280] text-[10px] mb-1">{t.role}</p>
                  <span className="text-[10px] bg-[#FDE047] text-[#1E3A2F] font-bold px-2 py-0.5 rounded-full">
                    {t.exp}
                  </span>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
    </div>
  )
}
