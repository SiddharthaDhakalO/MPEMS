import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import Topbar  from './components/Topbar'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import Home    from './pages/Home'
import About   from './pages/About'
import Classes from './pages/Classes'
import Notices from './pages/Notices'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function ScrollToTop() {
  // Scroll to top on route change
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-[Nunito]">
        <Topbar />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<><ScrollToTop /><Home /></>}    />
            <Route path="/about"   element={<><ScrollToTop /><About /></>}   />
            <Route path="/classes" element={<><ScrollToTop /><Classes /></>} />
            <Route path="/notices" element={<><ScrollToTop /><Notices /></>} />
            <Route path="/gallery" element={<><ScrollToTop /><Gallery /></>} />
            <Route path="/contact" element={<><ScrollToTop /><Contact /></>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
