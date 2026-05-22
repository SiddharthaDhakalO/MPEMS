import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import NoticeTicker from './NoticeTicker'
import CountUp from './CountUp'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100])

  const [content, setContent] = useState({
    heroTagline: 'A joyful place where little ones love to learn',
    heroSubtext: 'Nurturing curious minds from Nursery to Class 5. We blend the national CDC curriculum with creative exploration.',
    statsStudents: 200,
    statsTeachers: 18,
    statsYears: 20
  })

  useEffect(() => {
    fetch('/data/siteContent.json')
      .then(r => r.json())
      .then(data => {
        if (data) setContent(prev => ({ ...prev, ...data }))
      })
      .catch(err => console.error('Error fetching site content:', err))
  }, [])

  const [cards, setCards] = useState([
    { id: 1, src: '/images/school1.jpg', rotate: -6 },
    { id: 2, src: '/images/school3.jpg', rotate: 4 },
    { id: 3, src: '/images/school4.jpg', rotate: -3 },
    { id: 4, src: '/images/school5.jpg', rotate: 6 },
    { id: 5, src: '/images/school2.jpg', rotate: 0 },
  ])

  const cycleCards = () => {
    setCards((prev) => {
      const newCards = [...prev]
      const topCard = newCards.pop()
      newCards.unshift(topCard)
      return newCards
    })
  }

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
              {content.heroTagline.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word === 'little' || word === 'ones' ? (
                    <span className="relative inline-block">
                      {word}
                      <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FDE047] -z-10 rounded" />
                    </span>
                  ) : word}{' '}
                </React.Fragment>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[#6B7280] text-lg leading-relaxed mb-8 max-w-xl"
            >
              {content.heroSubtext}
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
                { value: content.statsStudents, suffix: '+', label: 'Students',  emoji: '👦' },
                { value: content.statsTeachers, suffix: '',  label: 'Teachers',  emoji: '👩‍🏫' },
                { value: content.statsYears,    suffix: '',  label: 'Years',     emoji: '🏫' },
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
            className="w-full md:w-1/2 mt-8 md:mt-0 relative h-[400px] md:h-[500px] flex items-center justify-center cursor-pointer"
            onClick={cycleCards}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 bg-gradient-to-tr from-[#FDE047] to-[#86EFAC] rounded-3xl opacity-50 blur-lg -z-10"
            ></motion.div>
            
            <div className="relative w-full h-full perspective-1000">
              <AnimatePresence mode="popLayout">
                {cards.map((card, index) => {
                  const isTop = index === cards.length - 1;
                  return (
                    <motion.img
                      key={card.id}
                      src={card.src}
                      alt="School Building"
                      layout
                      initial={{ scale: 0.8, opacity: 0, rotate: card.rotate - 20 }}
                      animate={{
                        scale: isTop ? 1 : 1 - (cards.length - index) * 0.05,
                        opacity: isTop ? 1 : 0.7 - (cards.length - index) * 0.1,
                        y: isTop ? 0 : (cards.length - index) * 15,
                        rotate: isTop ? 0 : card.rotate,
                        zIndex: index,
                      }}
                      exit={{ scale: 0.5, opacity: 0, y: -50 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      whileHover={isTop ? { scale: 1.05, rotateY: 10, rotateX: 5 } : {}}
                      className="absolute inset-0 m-auto rounded-2xl shadow-2xl border-4 border-white object-cover w-[90%] md:w-full h-[80%] md:h-[90%] origin-center"
                    />
                  );
                })}
              </AnimatePresence>
            </div>
            {/* Click hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute -bottom-6 bg-white text-[#1E3A2F] text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce pointer-events-none"
            >
              👆 Click to see more
            </motion.div>
          </motion.div>
        </div>
      </section>

      <NoticeTicker />
    </>
  )
}
