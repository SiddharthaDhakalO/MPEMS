import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [content, setContent] = useState({
    address: 'Geruwa rural municipality-5, Pashupatinagar, Bardiya',
    phone: '+977-1-4443210',
    email: 'info@modelpashupati.edu.np',
    facebookUrl: '#'
  })

  useEffect(() => {
    fetch('/data/siteContent.json')
      .then(r => r.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error fetching site content:', err))
  }, [])

  return (
    <motion.footer 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#1a5c3a] text-white"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 – School Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-3xl origin-center inline-block"
            >
              🌸
            </motion.span>
            <div>
              <p className="font-extrabold text-lg leading-tight">Model Pashupati English Medium School</p>
              <p className="text-xs text-green-200">मोडल पशुपति इङलिस मिडियम स्कुल</p>
            </div>
          </div>
          <p className="text-green-100 text-sm leading-relaxed mb-4">
            Nurturing curious young minds in a safe, joyful environment since 2005. 
            Serving Nursery to Class 5 in Geruwa rural municipality-5 Pashupatinagar, Bardiya.
          </p>
          <p className="text-green-200 text-xs font-semibold">
            Academic Year: 2082 B.S. (2025–26 A.D.)
          </p>
          <div className="mt-4 flex gap-3">
            <a href={content.facebookUrl} target="_blank" rel="noreferrer">
              <motion.span whileHover={{ scale: 1.1, rotate: 5 }} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FDE047] hover:text-[#1E3A2F] cursor-pointer transition">📘</motion.span>
            </a>
            <motion.span whileHover={{ scale: 1.1, rotate: -5 }} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FDE047] hover:text-[#1E3A2F] cursor-pointer transition">📸</motion.span>
            <motion.span whileHover={{ scale: 1.1, rotate: 5 }} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FDE047] hover:text-[#1E3A2F] cursor-pointer transition">🐦</motion.span>
          </div>
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4 className="font-bold text-base mb-4 text-[#FDE047]">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: 'Home',           to: '/' },
              { label: 'About School',   to: '/about' },
              { label: 'Classes',        to: '/classes' },
              { label: 'Notices',        to: '/notices' },
              { label: 'Photo Gallery',  to: '/gallery' },
              { label: 'Contact Us',     to: '/contact' },
              { label: 'Enroll Now',     to: '/contact' },
              { label: 'Admin Portal',    to: '/admin' },
            ].map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-green-100 text-sm hover:text-[#FDE047] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-[#86EFAC] transform group-hover:translate-x-1 transition-transform duration-200">›</span> 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 – Contact */}
        <div>
          <h4 className="font-bold text-base mb-4 text-[#FDE047]">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-green-100">
              <span>📍</span>
              <span>{content.address}</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-green-100">
              <span>📞</span>
              <a href={`tel:${content.phone}`} className="hover:text-[#FDE047] transition">{content.phone}</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-green-100">
              <span>📧</span>
              <a href={`mailto:${content.email}`} className="hover:text-[#FDE047] transition">{content.email}</a>
            </li>
            <li className="flex items-start gap-3 text-sm text-green-100">
              <span>🕐</span>
              <span>Sun–Fri: 9:00 AM – 4:00 PM<br />Office: 10:00 AM – 3:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-green-200">
          <p>© 2082 B.S. Model Pashupati English Medium School. All rights reserved.</p>
          <p>🇳🇵 Made with pride in Nepal</p>
        </div>
      </div>
    </motion.footer>
  )
}
