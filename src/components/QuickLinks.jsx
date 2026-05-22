import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

const links = [
  { 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FDE047]"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
    label: 'Admission Form', sub: 'Download & apply', to: '/contact', color: 'border-[#FDE047] hover:shadow-[0_4px_20px_rgba(253,224,71,0.4)]' 
  },
  { 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7DD3FC]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    label: 'School Calendar', sub: '2082 B.S. schedule', to: '/notices', color: 'border-[#7DD3FC] hover:shadow-[0_4px_20px_rgba(125,211,252,0.4)]' 
  },
  { 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#86EFAC]"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    label: 'Exam Results', sub: 'Latest term results', to: '/notices', color: 'border-[#86EFAC] hover:shadow-[0_4px_20px_rgba(134,239,172,0.4)]' 
  },
  { 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FDE047]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    label: 'Contact Us', sub: 'Reach our office', to: '/contact', color: 'border-[#FDE047] hover:shadow-[0_4px_20px_rgba(253,224,71,0.4)]' 
  },
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
                    className="inline-block flex items-center justify-center bg-gray-50 rounded-full p-3 mb-2"
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
