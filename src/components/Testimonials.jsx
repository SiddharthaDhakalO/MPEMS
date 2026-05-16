import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInSection from './FadeInSection'

const testimonials = [
  {
    quote: "My daughter joined Nursery here and now she is in Class 3. The teachers are so caring and patient. She wakes up every morning excited to go to school — that says everything!",
    name: "Kamala Shrestha",
    child: "Parent of Aarti, Class 3",
    initials: "KS",
    bg: "bg-[#FDE047]",
  },
  {
    quote: "The school's focus on both academics and overall personality development is remarkable. My son has become much more confident and is learning both English and Nepali beautifully.",
    name: "Ramesh Adhikari",
    child: "Parent of Rohan, Class 2",
    initials: "RA",
    bg: "bg-[#86EFAC]",
  },
  {
    quote: "We were worried about online classes during the transition, but the school handled it perfectly. The interactive sessions kept our kids engaged throughout the year.",
    name: "Sita Sharma",
    child: "Parent of Bimal, Class 5",
    initials: "SS",
    bg: "bg-[#7DD3FC]",
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section className="py-16 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <FadeInSection className="text-center mb-10">
          <span className="inline-block bg-[#FEF9C3] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3 border border-[#FDE047]">
            Parent Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">
            What Parents Say
          </h2>
          <p className="text-[#6B7280] text-sm">Words from our wonderful school community</p>
        </FadeInSection>

        <div 
          className="relative min-h-[250px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white border-2 border-[#FDE047] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-2xl w-full mx-4">
                <p className="text-5xl text-[#FDE047] font-serif leading-none mb-4 absolute -top-4 -left-2 opacity-50">"</p>
                <p className="italic text-[#1E3A2F] text-lg leading-relaxed mb-8 relative z-10 text-center px-4">
                  {testimonials[currentIndex].quote}
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 ${testimonials[currentIndex].bg} rounded-full flex items-center justify-center font-extrabold text-[#1E3A2F] text-lg shrink-0 shadow-sm`}>
                    {testimonials[currentIndex].initials}
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#1E3A2F] text-base">{testimonials[currentIndex].name}</p>
                    <p className="text-[#6B7280] text-sm font-medium">{testimonials[currentIndex].child}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              animate={{
                width: currentIndex === idx ? 32 : 12,
                backgroundColor: currentIndex === idx ? "#FDE047" : "#E5E7EB"
              }}
              transition={{ duration: 0.3 }}
              className="h-3 rounded-full cursor-pointer hover:bg-[#FEF9C3] transition-colors"
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
