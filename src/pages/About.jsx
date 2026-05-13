import EnrollCTA    from '../components/EnrollCTA'
import WhyUs        from '../components/WhyUs'
import Testimonials from '../components/Testimonials'

const team = [
  { name: 'Mrs. Sunita Poudel',   role: 'Principal',             emoji: '👩‍💼', exp: '18 years' },
  { name: 'Mr. Gopal Thapa',      role: 'Vice Principal',        emoji: '👨‍💼', exp: '14 years' },
  { name: 'Ms. Sita Rai',         role: 'Nursery & LKG Teacher', emoji: '👩‍🏫', exp: '8 years'  },
  { name: 'Ms. Anita Sharma',     role: 'UKG Teacher',           emoji: '👩‍🏫', exp: '6 years'  },
  { name: 'Mr. Ram Bahadur',      role: 'Class 1–2 Teacher',     emoji: '👨‍🏫', exp: '10 years' },
  { name: 'Ms. Puja Thapa',       role: 'Class 3–4 Teacher',     emoji: '👩‍🏫', exp: '9 years'  },
]

const milestones = [
  { year: '2005 A.D.',  label: 'School Founded',           desc: 'Modal Pashupati English Meddium School opened its doors with 3 classrooms and 40 students.' },
  { year: '2010 A.D.',  label: 'First Batch Graduated',    desc: 'Our first Class 5 batch completed primary education with distinction.' },
  { year: '2015 A.D.',  label: 'New Block Inaugurated',    desc: 'A new two-storey academic block was added, doubling our capacity.' },
  { year: '2020 A.D.',  label: 'Computer Lab Opened',      desc: 'A fully equipped computer lab was established for students from Class 3.' },
  { year: '2025 A.D.',  label: '20 Years of Excellence',   desc: 'Celebrating two decades of nurturing over 2,000 students across Bardiya.' },
]

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#F0FDF4] py-12 px-4 md:px-8 border-b border-[#86EFAC]/40">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Our Story
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">About Our School</h1>
          <p className="text-[#6B7280] leading-relaxed max-w-xl">
            For 20 years, Modal Pashupati English Meddium School has been a second home for children 
            across Bardiya — a place of learning, laughter and lifelong values.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block bg-[#FEF9C3] border border-[#FDE047] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-4">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F] mb-4">
                A joyful school for Bardiya's youngest learners
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Founded in 2005, Modal Pashupati English Meddium School is a government-registered, English-medium 
                primary school located in Geruwa rural municipality-5 Pashupatinagar, Bardiya. We offer classes from Nursery to 
                Class 5, following the CDC curriculum of Nepal.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                Our philosophy is simple: every child deserves a safe, nurturing space where they 
                are free to explore, make mistakes, and grow. We combine academic rigour with 
                creativity, values, and community spirit.
              </p>
            </div>
            <img src="/images/school3.jpg" alt="Students and building" className="rounded-2xl border-4 border-[#86EFAC] w-full h-64 object-cover shadow-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🎯', title: 'Mission',  text: 'To provide inclusive, quality primary education that prepares children for life, not just examinations.' },
              { emoji: '🌅', title: 'Vision',   text: 'To be the most trusted community school in Bardiya, known for joyful learning and holistic growth.' },
              { emoji: '💛', title: 'Values',   text: 'Respect, kindness, curiosity and perseverance are the four pillars of our school community.' },
              { emoji: '🏫', title: 'Campus',   text: 'Our campus includes spacious classrooms, a library, computer lab, art room and open playground.' },
            ].map(c => (
              <div key={c.title} className="bg-[#FEF9C3] border border-[#FDE047] rounded-2xl p-5 hover:shadow-md transition">
                <div className="text-3xl mb-2">{c.emoji}</div>
                <h3 className="font-bold text-[#1E3A2F] text-sm mb-1">{c.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 px-4 md:px-8 bg-[#E0F2FE]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Our Journey
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F]">
              20 Years of Milestones
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#7DD3FC] -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FDE047] border-2 border-[#1E3A2F] rounded-full z-10 mt-1.5" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="bg-white border border-[#7DD3FC] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                      <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                        {m.year}
                      </span>
                      <h3 className="font-bold text-[#1E3A2F] mb-1">{m.label}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Our Team
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F]">Meet Our Educators</h2>
            <p className="text-[#6B7280] text-sm mt-2">Dedicated professionals who love what they do</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {team.map(t => (
              <div
                key={t.name}
                className="bg-[#F0FDF4] border border-[#86EFAC] rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-16 h-16 bg-[#86EFAC] rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  {t.emoji}
                </div>
                <p className="font-bold text-[#1E3A2F] text-xs leading-snug mb-0.5">{t.name}</p>
                <p className="text-[#6B7280] text-[10px] mb-1">{t.role}</p>
                <span className="text-[10px] bg-[#FDE047] text-[#1E3A2F] font-bold px-2 py-0.5 rounded-full">
                  {t.exp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <EnrollCTA />
    </div>
  )
}
