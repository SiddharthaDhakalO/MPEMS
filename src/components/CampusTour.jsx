import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CampusTour() {
  const targetRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // We have 5 images. As we scroll down 1 viewport height, 
  // we translate the images horizontally to the left.
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"])

  const images = [
    { src: '/images/school1.jpg', title: 'Main Entrance', color: 'bg-[#FDE047]' },
    { src: '/images/school2.jpg', title: 'Classroom Block', color: 'bg-[#86EFAC]' },
    { src: '/images/school3.jpg', title: 'Play Area', color: 'bg-[#7DD3FC]' },
    { src: '/images/school4.jpg', title: 'Assembly Ground', color: 'bg-[#FCA5A5]' },
    { src: '/images/school5.jpg', title: 'Library & Offices', color: 'bg-[#C4B5FD]' },
  ]

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FEF9C3]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Title container that fades out as you scroll */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute left-4 md:left-12 top-1/4 z-10 pointer-events-none"
        >
          <span className="inline-block bg-white text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3 shadow-sm border border-[#FDE047]">
            Virtual Tour
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#1E3A2F]">
            Explore Our <br/> Beautiful Campus
          </h2>
          <p className="mt-4 text-[#6B7280] max-w-sm font-semibold">
            Scroll down to take a virtual walk through the school building and facilities.
          </p>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-12 mt-20">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="group relative w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] h-[50vh] md:h-[60vh] flex-shrink-0"
            >
              <div className={`absolute inset-0 ${img.color} rounded-3xl translate-x-4 translate-y-4 opacity-50 transition-transform group-hover:translate-x-2 group-hover:translate-y-2`} />
              <img 
                src={img.src} 
                alt={img.title} 
                className="relative w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                className="absolute -bottom-6 left-8 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-[#1E3A2F] z-20 flex items-center gap-3"
              >
                <span className="text-xl">✨</span>
                <span className="font-bold text-[#1E3A2F]">{img.title}</span>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
