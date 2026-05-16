import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import Topbar  from './components/Topbar'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import Home    from './pages/Home'
import About   from './pages/About'
import Classes from './pages/Classes'
import Notices from './pages/Notices'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import FloatingBackground from './components/FloatingBackground'

function ScrollToTop() {
  // Scroll to top on route change
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
  return null
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<><ScrollToTop /><Home /></>}    />
        <Route path="/about"   element={<><ScrollToTop /><About /></>}   />
        <Route path="/classes" element={<><ScrollToTop /><Classes /></>} />
        <Route path="/notices" element={<><ScrollToTop /><Notices /></>} />
        <Route path="/gallery" element={<><ScrollToTop /><Gallery /></>} />
        <Route path="/contact" element={<><ScrollToTop /><Contact /></>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen flex flex-col font-[Nunito] relative">
      <FloatingBackground />
      <motion.div
        className="fixed top-0 left-0 right-0 origin-left"
        style={{
          scaleX: scrollYProgress,
          height: '4px',
          backgroundColor: '#FDE047',
          zIndex: 9999
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Topbar />
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
