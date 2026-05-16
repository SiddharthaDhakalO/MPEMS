import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import NoticeTicker from './NoticeTicker'
import CountUp from './CountUp'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100])

  const handleConfetti = (e) => {
    const rect = e.target.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#FDE047', '#86EFAC', '#7DD3FC']
    })
  }

  return (
    <>
      <section className="bg-[#E0F2FE] relative overflow-hidden py-16 px-4 md:px-8">
        {/* Decorative floating shapes */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 -right-8 w-40 h-40 bg-[#FDE047] rounded-full opacity-30 blur-xl pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-32 h-32 bg-[#86EFAC] rounded-full opacity-30 blur-xl pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/3 w-16 h-16 bg-[#7DD3FC] rounded-full opacity-40 blur-lg pointer-events-none" 
        />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-[#FDE047] rounded-full px-4 py-1.5 text-xs font-bold text-[#1E3A2F] mb-6 shadow-sm"
            >
              🌸 Welcome to Model Pashupati English Medium School
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1E3A2F] leading-tight mb-5"
            >
              A joyful place where{' '}
              <span className="relative inline-block">
                little ones
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FDE047] -z-10 rounded" />
              </span>{' '}
              love to learn
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[#6B7280] text-lg leading-relaxed mb-8 max-w-xl"
            >
              Model Pashupati English Medium School provides a nurturing, child-friendly environment 
              for Nursery to Class 5 students in Geruwa rural municipality-5 Pashupatinagar, Bardiya. We blend the national CDC 
              curriculum with creative exploration.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                onClick={handleConfetti}
                className="inline-flex items-center gap-2 bg-[#FDE047] text-[#1E3A2F] font-bold px-7 py-3 rounded-full hover:bg-[#facc15] hover:shadow-lg transition-all duration-200 shadow-md"
              >
                ✏️ Apply for Admission
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white border-2 border-[#1E3A2F] text-[#1E3A2F] font-bold px-7 py-3 rounded-full hover:bg-[#1E3A2F] hover:text-white transition-all duration-200"
              >
                Learn More →
              </Link>
            </motion.div>

            {/* Stat Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
            >
              {[
                { value: 200, suffix: '+', label: 'Students',  emoji: '👦' },
                { value: 18,  suffix: '',  label: 'Teachers',  emoji: '👩‍🏫' },
                { value: 20,  suffix: '',  label: 'Years',     emoji: '🏫' },
              ].map(stat => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm border border-white/80 hover:shadow-md transition"
                >
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <p className="text-2xl font-extrabold text-[#1E3A2F]">
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-[#6B7280] font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ y: yParallax }}
            className="w-full md:w-1/2 mt-8 md:mt-0 relative"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 bg-gradient-to-tr from-[#FDE047] to-[#86EFAC] rounded-3xl opacity-50 blur-lg -z-10"
            ></motion.div>
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/images/school2.jpg" 
              alt="Model Pashupati English Medium School Building" 
              className="rounded-2xl shadow-xl border-4 border-white object-cover w-full h-[400px] md:h-[500px]" 
            />
          </motion.div>
        </div>
      </section>

      <NoticeTicker />
    </>
  )
}
