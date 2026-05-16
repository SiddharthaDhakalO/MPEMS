export default function Topbar() {
  return (
    <div className="w-full bg-[#FDE047] text-[#1E3A2F] text-xs">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 py-1.5">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <a href="tel:+97714443210" className="flex items-center gap-1 font-semibold hover:opacity-70 transition">
            📞 +977-1-4443210
          </a>
          <a href="mailto:info@modelpashupati.edu.np" className="flex items-center gap-1 font-semibold hover:opacity-70 transition">
            ✉️ info@modelpashupati.edu.np
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold">🇳🇵 नेपाली</span>
          <span className="text-[#1E3A2F]/60">|</span>
          <span className="font-semibold">Sun–Fri: 9AM–4PM</span>
        </div>
      </div>
    </div>
  )
}
