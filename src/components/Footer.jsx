import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1a5c3a] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 – School Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🌸</span>
            <div>
              <p className="font-extrabold text-lg leading-tight">Sunrise Primary School</p>
              <p className="text-xs text-green-200">सनराइज प्राथमिक विद्यालय</p>
            </div>
          </div>
          <p className="text-green-100 text-sm leading-relaxed mb-4">
            Nurturing curious young minds in a safe, joyful environment since 2005. 
            Serving Nursery to Class 5 in the heart of Kathmandu.
          </p>
          <p className="text-green-200 text-xs font-semibold">
            Academic Year: 2082 B.S. (2025–26 A.D.)
          </p>
          <div className="mt-4 flex gap-3">
            <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FDE047] hover:text-[#1E3A2F] cursor-pointer transition">📘</span>
            <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FDE047] hover:text-[#1E3A2F] cursor-pointer transition">📸</span>
            <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FDE047] hover:text-[#1E3A2F] cursor-pointer transition">🐦</span>
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
            ].map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-green-100 text-sm hover:text-[#FDE047] transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-[#86EFAC]">›</span> {link.label}
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
              <span className="mt-0.5">📍</span>
              <span>Lazimpat, Ward No. 2<br />Kathmandu Metropolitan City<br />Bagmati Province, Nepal</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-green-100">
              <span>📞</span>
              <a href="tel:+97714443210" className="hover:text-[#FDE047] transition">+977-1-4443210</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-green-100">
              <span>📱</span>
              <a href="tel:+9779801234567" className="hover:text-[#FDE047] transition">+977-9801234567</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-green-100">
              <span>📧</span>
              <a href="mailto:info@sunriseschool.edu.np" className="hover:text-[#FDE047] transition">info@sunriseschool.edu.np</a>
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
          <p>© 2082 B.S. Sunrise Primary School. All rights reserved.</p>
          <p>🇳🇵 Made with pride in Nepal</p>
        </div>
      </div>
    </footer>
  )
}
