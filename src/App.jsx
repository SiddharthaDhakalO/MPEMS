import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
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

// Admin Imports
import AdminLogin from './admin/pages/AdminLogin'
import AdminLayout from './admin/components/AdminLayout'
import ProtectedRoute from './admin/components/ProtectedRoute'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminNotices from './admin/pages/AdminNotices'
import AdminGallery from './admin/pages/AdminGallery'
import AdminEnrollments from './admin/pages/AdminEnrollments'
import AdminContent from './admin/pages/AdminContent'

function ScrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
  return null
}

function PublicLayout() {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

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
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"        element={<><ScrollToTop /><Home /></>}    />
              <Route path="/about"   element={<><ScrollToTop /><About /></>}   />
              <Route path="/classes" element={<><ScrollToTop /><Classes /></>} />
              <Route path="/notices" element={<><ScrollToTop /><Notices /></>} />
              <Route path="/gallery" element={<><ScrollToTop /><Gallery /></>} />
              <Route path="/contact" element={<><ScrollToTop /><Contact /></>} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="content" element={<AdminContent />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
