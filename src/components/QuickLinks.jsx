import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

const links = [
  { icon: '📋', label: 'Admission Form',   sub: 'Download & apply',     to: '/contact', color: 'border-[#FDE047] hover:shadow-[0_4px_20px_rgba(253,224,71,0.4)]' },
  { icon: '📅', label: 'School Calendar',  sub: '2082 B.S. schedule',   to: '/notices', color: 'border-[#7DD3FC] hover:shadow-[0_4px_20px_rgba(125,211,252,0.4)]' },
  { icon: '📊', label: 'Exam Results',     sub: 'Latest term results',  to: '/notices', color: 'border-[#86EFAC] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)]' },
  { icon: '📞', label: 'Contact Us',       sub: 'Reach our office',     to: '/contact', color: 'border-[#FDE047] hover:shadow-[0_4px_20px_rgba(253,224,71,0.4)]' },
]

export default function QuickLinks() {
  return (
    <section className="py-14 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A2F] mb-2">Quick Access</h2>
          <p className="text-[#6B7280] text-sm">Everything you need, just a click away</p>
        </FadeInSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link, index) => (
            <FadeInSection key={link.label} delay={index * 0.1}>
              <Link to={link.to}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-white border-2 ${link.color} rounded-2xl p-5 flex flex-col items-center text-center gap-2 transition-all duration-200 shadow-sm h-full group`}
                >
                  <motion.span 
                    className="text-4xl inline-block"
                    whileHover={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {link.icon}
                  </motion.span>
                  <p className="font-bold text-[#1E3A2F] text-sm">{link.label}</p>
                  <p className="text-[#6B7280] text-xs">{link.sub}</p>
                </motion.div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
