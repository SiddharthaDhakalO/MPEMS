import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const colorMap = {
  yellow: {
    pill:   'bg-[#FDE047] text-[#1E3A2F]',
    border: 'border-[#FDE047]',
    icon:   'bg-[#FEF9C3]',
  },
  blue: {
    pill:   'bg-[#7DD3FC] text-[#1E3A2F]',
    border: 'border-[#7DD3FC]',
    icon:   'bg-[#E0F2FE]',
  },
  green: {
    pill:   'bg-[#86EFAC] text-[#1E3A2F]',
    border: 'border-[#86EFAC]',
    icon:   'bg-[#F0FDF4]',
  },
}

export default function ClassCard({ cls, showLink = false }) {
  const c = colorMap[cls.color] || colorMap.yellow

  return (
    <motion.div 
      whileHover="hover"
      initial="rest"
      variants={{
        rest: { y: 0, scale: 1 },
        hover: { y: -5, scale: 1.02 }
      }}
      transition={{ duration: 0.2 }}
      className={`bg-white border ${c.border} rounded-2xl p-6 shadow-sm flex flex-col`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${c.icon} rounded-xl flex items-center justify-center text-2xl`}>
          {cls.emoji}
        </div>
        <motion.span 
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: [0, -10, 10, -10, 10, 0] }
          }}
          transition={{ duration: 0.5 }}
          className={`text-xs font-bold px-3 py-1 rounded-full ${c.pill}`}
        >
          {cls.level}
        </motion.span>
      </div>

      <h3 className="font-extrabold text-[#1E3A2F] text-lg mb-0.5">{cls.name}</h3>
      <p className="text-xs font-semibold text-[#6B7280] mb-3">Age: {cls.age}</p>
      <p className="text-[#6B7280] text-sm leading-relaxed flex-1">{cls.desc}</p>

      {cls.subjects && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {cls.subjects.map(s => (
            <span key={s} className="bg-gray-50 border border-gray-200 text-[#6B7280] text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}

      {showLink && (
        <Link
          to="/contact"
          className="mt-4 text-center bg-[#FDE047] text-[#1E3A2F] font-bold text-sm px-4 py-2 rounded-full hover:bg-[#facc15] transition"
        >
          Enroll Now →
        </Link>
      )}
    </motion.div>
  )
}
