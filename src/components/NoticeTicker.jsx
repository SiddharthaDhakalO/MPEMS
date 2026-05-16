import { motion } from 'framer-motion'

const noticeItems = [
  "📢 Admission open for 2082 B.S. — Forms available at school office 10AM–3PM",
  "📢 Annual Sports Day on Falgun 15, 2081 — All parents cordially invited",
  "📢 School closed on Falgun 12 for Maha Shivaratri — Resumes next working day",
  "📢 First term exam timetable released — Check the notice board for details",
  "📢 Science Exhibition on Chaitra 5 — Class 3–5 students to participate",
]

export default function NoticeTicker() {
  const content = noticeItems.join('   •   ')

  return (
    <div className="w-full bg-[#FDE047] overflow-hidden py-2.5 flex items-center gap-3 border-y border-[#facc15]">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
        className="shrink-0 px-3 ml-2 z-10 bg-[#FDE047]"
      >
        <span className="bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-3 py-1 rounded-full inline-flex items-center">
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 1, repeat: Infinity }} 
            className="w-2 h-2 rounded-full bg-red-500 mr-2" 
          />
          Live Updates
        </span>
      </motion.div>
      <div className="overflow-hidden flex-1 relative flex">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
          className="flex whitespace-nowrap text-[#1E3A2F] text-sm font-semibold"
        >
          <span className="mx-4">{content}</span>
          <span className="mx-4">{content}</span>
          <span className="mx-4">{content}</span>
        </motion.div>
      </div>
    </div>
  )
}
