import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/',        label: 'Home'    },
  { to: '/about',   label: 'About'   },
  { to: '/classes', label: 'Classes' },
  { to: '/notices', label: 'Notices' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [hidden, setHidden]       = useState(false)
  const [hoveredPath, setHoveredPath] = useState(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 10)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-100'}`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-3xl"
          >
            🌸
          </motion.span>
          <div>
            <p className="font-extrabold text-base leading-tight text-[#1E3A2F] group-hover:text-[#FDE047] transition-colors duration-200">
              Model Pashupati English Medium School
            </p>
            <p className="text-[10px] text-[#6B7280] leading-none font-medium">Nurturing young minds since 2005</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onMouseEnter={() => setHoveredPath(link.to)}
              onMouseLeave={() => setHoveredPath(null)}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative group ${
                  isActive
                    ? 'text-[#1E3A2F]'
                    : 'text-[#6B7280] hover:text-[#1E3A2F]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {link.to === hoveredPath && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#FDE047]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  {isActive && link.to !== hoveredPath && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#FDE047] opacity-100 transition-all duration-200" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-1 bg-[#FDE047] text-[#1E3A2F] font-semibold text-sm px-5 py-2 rounded-full hover:bg-[#facc15] transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => setMenuOpen(false)}
          >
            ✏️ Enroll Now
          </Link>
        </motion.div>

        {/* Hamburger */}
        <button
          id="hamburger-btn"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#1E3A2F] rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1E3A2F] rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1E3A2F] rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <nav className="px-4 pb-4 pt-2 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FEF9C3] text-[#1E3A2F] border-l-4 border-[#FDE047]'
                        : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#1E3A2F]'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-2 text-center bg-[#FDE047] text-[#1E3A2F] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#facc15] transition"
                onClick={() => setMenuOpen(false)}
              >
                ✏️ Enroll Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
